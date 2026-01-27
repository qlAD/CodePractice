import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { name, description, sort_order, status } = body

    const updateData: Record<string, unknown> = {}
    if (name !== undefined) updateData.name = name
    if (description !== undefined) updateData.description = description
    if (sort_order !== undefined) updateData.sort_order = sort_order
    if (status !== undefined) updateData.status = status

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { success: false, error: '没有要更新的数据' },
        { status: 400 }
      )
    }

    await db.update('chapters', updateData, 'id = ?', [id])

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: '更新章节失败' },
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
    
    // 检查是否有关联的题目
    const questions = await db.queryOne<{ count: number }>(
      'SELECT COUNT(*) as count FROM questions WHERE chapter_id = ?',
      [id]
    )
    
    if (questions && questions.count > 0) {
      return NextResponse.json(
        { success: false, error: `该章节下有 ${questions.count} 道题目，请先删除或移动这些题目` },
        { status: 400 }
      )
    }

    await db.delete('chapters', 'id = ?', [id])
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: '删除章节失败' },
      { status: 500 }
    )
  }
}
