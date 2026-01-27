import { NextResponse } from 'next/server'
import { db, type DBQuestion } from '@/lib/db'
import { safeJsonParse } from '@/lib/utils'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const language = searchParams.get('language')
    const type = searchParams.get('type')
    const chapter_id = searchParams.get('chapter_id')
    const difficulty = searchParams.get('difficulty')
    const limitParam = searchParams.get('limit')
    const limit = limitParam !== null ? Number(limitParam) : 100
    const offset = Number(searchParams.get('offset')) || 0

    let sql = 'SELECT q.*, c.name as chapter_name FROM questions q LEFT JOIN chapters c ON q.chapter_id = c.id WHERE 1=1'
    const params: unknown[] = []

    if (language && language !== 'all') {
      sql += ' AND q.language = ?'
      params.push(language)
    }
    if (type && type !== 'all') {
      sql += ' AND q.type = ?'
      params.push(type)
    }
    if (chapter_id && chapter_id !== 'all') {
      sql += ' AND q.chapter_id = ?'
      params.push(chapter_id)
    }
    if (difficulty && difficulty !== 'all') {
      sql += ' AND q.difficulty = ?'
      params.push(difficulty)
    }

    const countSql = sql.replace('SELECT q.*, c.name as chapter_name', 'SELECT COUNT(*) as total')
    const countResult = await db.queryOne<{ total: number }>(countSql, params)
    const total = countResult?.total || 0

    sql += ' ORDER BY q.id DESC'
    
    if (limit > 0) {
      sql += ' LIMIT ? OFFSET ?'
      params.push(limit, offset)
    }

    const questions = await db.query<DBQuestion & { chapter_name: string }>(sql, params)

    const formattedQuestions = questions.map(q => ({
      ...q,
      options: safeJsonParse<string[]>(q.options),
    }))

    return NextResponse.json({
      success: true,
      data: formattedQuestions,
      total,
      limit,
      offset,
    })
  } catch (error) {
    console.error('Get questions error:', error)
    return NextResponse.json(
      { success: false, error: '获取题目失败' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const result = await db.insert('questions', {
      language: body.language,
      type: body.type,
      chapter_id: body.chapter_id || null,
      difficulty: body.difficulty || 'medium',
      content: body.content,
      options: body.options ? JSON.stringify(body.options) : null,
      code_template: body.code_template || null,
      answer: body.answer,
      score: body.score || 10,
    })

    if (body.chapter_id) {
      await db.query(
        'UPDATE chapters SET question_count = question_count + 1 WHERE id = ?',
        [body.chapter_id]
      )
    }

    return NextResponse.json({
      success: true,
      data: { id: result.insertId },
    })
  } catch (error) {
    console.error('Create question error:', error)
    return NextResponse.json(
      { success: false, error: '创建题目失败' },
      { status: 500 }
    )
  }
}

// 批量导入题目
export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { questions } = body

    if (!Array.isArray(questions) || questions.length === 0) {
      return NextResponse.json(
        { success: false, error: '无效的题目数据' },
        { status: 400 }
      )
    }

    const results = {
      success: 0,
      failed: 0,
      errors: [] as string[],
    }

    for (const q of questions) {
      try {
        await db.insert('questions', {
          language: q.language,
          type: q.type,
          chapter_id: q.chapter_id || null,
          difficulty: q.difficulty || 'medium',
          content: q.content,
          options: q.options ? JSON.stringify(q.options) : null,
          code_template: q.code_template || null,
          answer: q.answer,
          score: q.score || 10,
        })

        if (q.chapter_id) {
          await db.query(
            'UPDATE chapters SET question_count = question_count + 1 WHERE id = ?',
            [q.chapter_id]
          )
        }

        results.success++
      } catch {
        results.failed++
        results.errors.push(`题目导入失败: ${q.content?.substring(0, 20)}...`)
      }
    }

    return NextResponse.json({
      success: true,
      data: results,
    })
  } catch (error) {
    console.error('Batch import questions error:', error)
    return NextResponse.json(
      { success: false, error: '批量导入失败' },
      { status: 500 }
    )
  }
}
