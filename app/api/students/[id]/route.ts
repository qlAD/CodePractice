import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { db, type DBStudent } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const student = await db.queryOne<Omit<DBStudent, 'password'>>(
      'SELECT id, student_id, name, class_name, major, status, last_login, created_at FROM students WHERE id = ?',
      [id]
    )

    if (!student) {
      return NextResponse.json(
        { success: false, error: '学生不存在' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: student })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: '获取学生信息失败' },
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
    const { name, class_name, major, status, password } = body

    const updateData: Record<string, unknown> = {}
    if (name !== undefined) updateData.name = name
    if (class_name !== undefined) updateData.class_name = class_name
    if (major !== undefined) updateData.major = major
    if (status !== undefined) updateData.status = status
    if (password) {
      updateData.password = await bcrypt.hash(password, 10)
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { success: false, error: '没有要更新的数据' },
        { status: 400 }
      )
    }

    await db.update('students', updateData, 'id = ?', [id])

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: '更新学生失败' },
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
    await db.delete('students', 'id = ?', [id])
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: '删除学生失败' },
      { status: 500 }
    )
  }
}
