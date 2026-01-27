import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

interface WrongAnswerWithQuestion {
  id: number
  student_id: number
  question_id: number
  wrong_answer: string
  wrong_count: number
  review_count: number
  status: 'pending' | 'reviewing' | 'mastered'
  last_wrong_at: string
  last_review_at: string | null
  question: {
    id: number
    language: string
    type: string
    difficulty: string
    content: string
    options: string | null
    answer: string
    analysis: string | null
    chapter_id: number | null
    score: number
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const student_id = searchParams.get('student_id')
    const language = searchParams.get('language')
    const type = searchParams.get('type')
    const status = searchParams.get('status')

    if (!student_id) {
      return NextResponse.json(
        { success: false, error: '缺少学生ID' },
        { status: 400 }
      )
    }

    // 获取学生信息
    const student = await db.queryOne<{ id: number }>(
      'SELECT id FROM students WHERE student_id = ?',
      [student_id]
    )

    if (!student) {
      return NextResponse.json(
        { success: false, error: '学生不存在' },
        { status: 404 }
      )
    }

    let sql = `
      SELECT 
        wa.id, wa.student_id, wa.question_id, wa.wrong_answer, 
        wa.wrong_count, wa.review_count, wa.status, 
        wa.last_wrong_at, wa.last_review_at,
        q.id as q_id, q.language, q.type, q.difficulty, q.content, 
        q.options, q.answer, q.chapter_id, q.score,
        q.code_template
      FROM wrong_answers wa
      JOIN questions q ON wa.question_id = q.id
      WHERE wa.student_id = ?
    `
    const params: unknown[] = [student.id]

    if (language && language !== 'all') {
      sql += ' AND q.language = ?'
      params.push(language)
    }
    if (type && type !== 'all') {
      sql += ' AND q.type = ?'
      params.push(type)
    }
    if (status && status !== 'all') {
      // 支持多个状态，用逗号分隔
      if (status.includes(',')) {
        const statuses = status.split(',')
        sql += ` AND wa.status IN (${statuses.map(() => '?').join(',')})`
        params.push(...statuses)
      } else {
        sql += ' AND wa.status = ?'
        params.push(status)
      }
    }

    sql += ' ORDER BY wa.last_wrong_at DESC'

    const results = await db.query<{
      id: number
      student_id: number
      question_id: number
      wrong_answer: string
      wrong_count: number
      review_count: number
      status: 'pending' | 'reviewing' | 'mastered'
      last_wrong_at: string
      last_review_at: string | null
      q_id: number
      language: string
      type: string
      difficulty: string
      content: string
      options: string | null
      answer: string
      chapter_id: number | null
      score: number
      code_template: string | null
    }>(sql, params)

    // 格式化数据
    const wrongAnswers = results.map(row => {
      let parsedOptions = null
      if (row.options) {
        try {
          parsedOptions = JSON.parse(row.options)
        } catch {
          parsedOptions = row.options
        }
      }
      
      return {
        id: row.id,
        student_id: row.student_id,
        question_id: row.question_id,
        wrong_answer: row.wrong_answer,
        wrong_count: row.wrong_count,
        review_count: row.review_count,
        status: row.status,
        last_wrong_at: row.last_wrong_at,
        last_review_at: row.last_review_at,
        question: {
          id: row.q_id,
          language: row.language,
          type: row.type,
          difficulty: row.difficulty,
          content: row.content,
          options: parsedOptions,
          answer: row.answer,
          chapter_id: row.chapter_id,
          score: row.score,
          code_template: row.code_template,
        },
      }
    })

    // 统计数量
    const countResult = await db.query<{ status: string; count: number }>(
      `SELECT status, COUNT(*) as count FROM wrong_answers WHERE student_id = ? GROUP BY status`,
      [student.id]
    )

    const counts = {
      pending: 0,
      reviewing: 0,
      mastered: 0,
    }

    countResult.forEach(row => {
      if (row.status in counts) {
        counts[row.status as keyof typeof counts] = row.count
      }
    })

    return NextResponse.json({
      success: true,
      data: wrongAnswers,
      counts,
    })
  } catch (error) {
    console.error('Get wrong answers error:', error)
    const errorMessage = error instanceof Error ? error.message : String(error)
    return NextResponse.json(
      { success: false, error: '获取错题本失败', details: errorMessage },
      { status: 500 }
    )
  }
}

// 更新错题状态
export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, status } = body

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: '缺少必要参数' },
        { status: 400 }
      )
    }

    await db.query(
      `UPDATE wrong_answers SET status = ?, last_review_at = NOW(), review_count = review_count + 1 WHERE id = ?`,
      [status, id]
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Update wrong answer error:', error)
    return NextResponse.json(
      { success: false, error: '更新错题状态失败' },
      { status: 500 }
    )
  }
}

// 删除错题
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { success: false, error: '缺少错题ID' },
        { status: 400 }
      )
    }

    await db.query('DELETE FROM wrong_answers WHERE id = ?', [id])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete wrong answer error:', error)
    return NextResponse.json(
      { success: false, error: '删除错题失败' },
      { status: 500 }
    )
  }
}
