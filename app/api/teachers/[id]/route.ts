import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { db, type DBTeacher } from '@/lib/db'
import { safeJsonParse } from '@/lib/utils'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const teacher = await db.queryOne<Omit<DBTeacher, 'password'>>(
      'SELECT id, teacher_id, name, department, role, permissions, status, last_login, created_at FROM teachers WHERE id = ?',
      [id]
    )

    if (!teacher) {
      return NextResponse.json(
        { success: false, error: '教师不存在' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        ...teacher,
        permissions: safeJsonParse<string[]>(teacher.permissions, []),
      },
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: '获取教师信息失败' },
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
    const { name, department, role, permissions, status, password } = body

    const updateData: Record<string, unknown> = {}
    if (name !== undefined) updateData.name = name
    if (department !== undefined) updateData.department = department
    if (role !== undefined) updateData.role = role
    if (permissions !== undefined) updateData.permissions = JSON.stringify(permissions)
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

    await db.update('teachers', updateData, 'id = ?', [id])

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: '更新教师失败' },
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
    await db.delete('teachers', 'id = ?', [id])
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: '删除教师失败' },
      { status: 500 }
    )
  }
}
