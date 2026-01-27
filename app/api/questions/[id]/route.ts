import { NextResponse } from 'next/server'
import { db, type DBQuestion } from '@/lib/db'
import { safeJsonParse } from '@/lib/utils'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const question = await db.queryOne<DBQuestion>(
      'SELECT q.*, c.name as chapter_name FROM questions q LEFT JOIN chapters c ON q.chapter_id = c.id WHERE q.id = ?',
      [id]
    )

    if (!question) {
      return NextResponse.json(
        { success: false, error: '题目不存在' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        ...question,
        options: safeJsonParse<string[]>(question.options),
      },
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: '获取题目失败' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    // 获取原题目信息以更新章节计数
    const originalQuestion = await db.queryOne<DBQuestion>(
      'SELECT chapter_id FROM questions WHERE id = ?',
      [id]
    )

    const updateData: Record<string, unknown> = {}
    if (body.language !== undefined) updateData.language = body.language
    if (body.type !== undefined) updateData.type = body.type
    if (body.chapter_id !== undefined) updateData.chapter_id = body.chapter_id
    if (body.difficulty !== undefined) updateData.difficulty = body.difficulty
    if (body.content !== undefined) updateData.content = body.content
    if (body.options !== undefined) updateData.options = JSON.stringify(body.options)
    if (body.code_template !== undefined) updateData.code_template = body.code_template
    if (body.answer !== undefined) updateData.answer = body.answer
    if (body.score !== undefined) updateData.score = body.score
    if (body.status !== undefined) updateData.status = body.status

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { success: false, error: '没有要更新的数据' },
        { status: 400 }
      )
    }

    await db.update('questions', updateData, 'id = ?', [id])

    // 如果章节变更，更新章节计数
    if (body.chapter_id !== undefined && originalQuestion?.chapter_id !== body.chapter_id) {
      // 减少旧章节的题目数
      if (originalQuestion?.chapter_id) {
        await db.query(
          'UPDATE chapters SET question_count = question_count - 1 WHERE id = ? AND question_count > 0',
          [originalQuestion.chapter_id]
        )
      }
      // 增加新章节的题目数
      if (body.chapter_id) {
        await db.query(
          'UPDATE chapters SET question_count = question_count + 1 WHERE id = ?',
          [body.chapter_id]
        )
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: '更新题目失败' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    // 获取题目信息以更新章节计数
    const question = await db.queryOne<DBQuestion>(
      'SELECT chapter_id FROM questions WHERE id = ?',
      [id]
    )
    
    await db.delete('questions', 'id = ?', [id])
    
    // 更新章节题目计数
    if (question?.chapter_id) {
      await db.query(
        'UPDATE chapters SET question_count = question_count - 1 WHERE id = ? AND question_count > 0',
        [question.chapter_id]
      )
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: '删除题目失败' },
      { status: 500 }
    )
  }
}
