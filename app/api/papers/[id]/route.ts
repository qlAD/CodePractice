import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { name, description, sort_order, status, papers_id } = body

    const updateData: Record<string, unknown> = {}
    if (name !== undefined) updateData.name = name
    if (description !== undefined) updateData.description = description
    if (sort_order !== undefined) updateData.sort_order = sort_order
    if (status !== undefined) updateData.status = status
    if (papers_id !== undefined) {
      const code = typeof papers_id === 'string' ? papers_id.trim() : ''
      if (!code) {
        return NextResponse.json(
          { success: false, error: '试卷编号不能为空' },
          { status: 400 }
        )
      }
      const dup = await db.queryOne<{ id: number }>(
        'SELECT id FROM papers WHERE papers_id = ? AND id != ?',
        [code, id]
      )
      if (dup) {
        return NextResponse.json(
          { success: false, error: '试卷编号已存在' },
          { status: 400 }
        )
      }
      updateData.papers_id = code
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { success: false, error: '没有要更新的数据' },
        { status: 400 }
      )
    }

    await db.update('papers', updateData, 'id = ?', [id])

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: '更新试卷失败' },
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

    const questions = await db.queryOne<{ count: number }>(
      'SELECT COUNT(*) as count FROM questions WHERE paper_id = ?',
      [id]
    )

    if (questions && questions.count > 0) {
      return NextResponse.json(
        { success: false, error: `该试卷下有 ${questions.count} 道题目，请先删除或移动这些题目` },
        { status: 400 }
      )
    }

    await db.delete('papers', 'id = ?', [id])
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: '删除试卷失败' },
      { status: 500 }
    )
  }
}
