import { NextResponse } from 'next/server'
import { db, type DBQuestion } from '@/lib/db'
import { resolveQuestionPaperId } from '@/lib/paper-resolve'
import { safeJsonParse } from '@/lib/utils'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const language = searchParams.get('language')
    const type = searchParams.get('type')
    const paper_id = searchParams.get('paper_id')
    const limitParam = searchParams.get('limit')
    const limit = limitParam !== null ? Number(limitParam) : 100
    const offset = Number(searchParams.get('offset')) || 0

    let sql =
      'SELECT q.*, p.name as paper_name, p.papers_id as papers_id FROM questions q LEFT JOIN papers p ON q.paper_id = p.id WHERE 1=1'
    const params: unknown[] = []

    if (language && language !== 'all') {
      sql += ' AND q.language = ?'
      params.push(language)
    }
    if (type && type !== 'all') {
      sql += ' AND q.type = ?'
      params.push(type)
    }
    if (paper_id && paper_id !== 'all') {
      sql += ' AND q.paper_id = ?'
      params.push(paper_id)
    }

    const countSql = sql.replace(
      'SELECT q.*, p.name as paper_name, p.papers_id as papers_id',
      'SELECT COUNT(*) as total'
    )
    const countResult = await db.queryOne<{ total: number }>(countSql, params)
    const total = countResult?.total || 0

    sql += ' ORDER BY q.id DESC'
    
    if (limit > 0) {
      sql += ' LIMIT ? OFFSET ?'
      params.push(limit, offset)
    }

    const questions = await db.query<DBQuestion & { paper_name: string }>(sql, params)

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

    const rawPaper =
      body.paper_id !== undefined && body.paper_id !== null && body.paper_id !== ''
        ? body.paper_id
        : body.papers_id !== undefined && body.papers_id !== null && body.papers_id !== ''
          ? body.papers_id
          : undefined

    let resolvedPaperId: number | null = null
    if (rawPaper !== undefined && rawPaper !== null && rawPaper !== '') {
      const r = await resolveQuestionPaperId(rawPaper, body.language)
      if (r.error) {
        return NextResponse.json({ success: false, error: r.error }, { status: 400 })
      }
      resolvedPaperId = r.id
    }

    const result = await db.insert('questions', {
      language: body.language,
      type: body.type,
      paper_id: resolvedPaperId,
      content: body.content,
      options: body.options ? JSON.stringify(body.options) : null,
      code_template: body.code_template || null,
      answer: body.answer,
      score: body.score || 10,
    })

    const questionPaperId = resolvedPaperId
    if (questionPaperId) {
      await db.query(
        'UPDATE papers SET question_count = question_count + 1 WHERE id = ?',
        [questionPaperId]
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
        const rawPaper =
          q.paper_id !== undefined && q.paper_id !== null && q.paper_id !== ''
            ? q.paper_id
            : q.papers_id !== undefined && q.papers_id !== null && q.papers_id !== ''
              ? q.papers_id
              : undefined

        let resolvedPaperId: number | null = null
        if (rawPaper !== undefined && rawPaper !== null && rawPaper !== '') {
          const r = await resolveQuestionPaperId(rawPaper, q.language)
          if (r.error) {
            results.failed++
            results.errors.push(`${r.error}: ${q.content?.substring(0, 20)}...`)
            continue
          }
          resolvedPaperId = r.id
        }

        await db.insert('questions', {
          language: q.language,
          type: q.type,
          paper_id: resolvedPaperId,
          content: q.content,
          options: q.options ? JSON.stringify(q.options) : null,
          code_template: q.code_template || null,
          answer: q.answer,
          score: q.score || 10,
        })

        if (resolvedPaperId) {
          await db.query(
            'UPDATE papers SET question_count = question_count + 1 WHERE id = ?',
            [resolvedPaperId]
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
