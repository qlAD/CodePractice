import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { db, type DBTeacher } from '@/lib/db'
import { safeJsonParse } from '@/lib/utils'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const role = searchParams.get('role')
    const status = searchParams.get('status')
    const limit = Number(searchParams.get('limit')) || 20
    const offset = Number(searchParams.get('offset')) || 0

    let sql = 'SELECT id, teacher_id, name, department, role, permissions, status, last_login, created_at FROM teachers WHERE 1=1'
    const params: unknown[] = []

    if (search) {
      sql += ' AND (teacher_id LIKE ? OR name LIKE ?)'
      params.push(`%${search}%`, `%${search}%`)
    }
    if (role && role !== 'all') {
      sql += ' AND role = ?'
      params.push(role)
    }
    if (status && status !== 'all') {
      sql += ' AND status = ?'
      params.push(status)
    }

    const countSql = sql.replace('SELECT id, teacher_id, name, department, role, permissions, status, last_login, created_at', 'SELECT COUNT(*) as total')
    const countResult = await db.queryOne<{ total: number }>(countSql, params)
    const total = countResult?.total || 0

    sql += ' ORDER BY id DESC LIMIT ? OFFSET ?'
    params.push(limit, offset)

    const teachers = await db.query<Omit<DBTeacher, 'password'>>(sql, params)

    const formattedTeachers = teachers.map(t => {
      const permissions = safeJsonParse<string[]>(t.permissions, [])
      return {
        ...t,
        permissions: permissions || [],
      }
    })

    return NextResponse.json({
      success: true,
      data: formattedTeachers,
      total,
      limit,
      offset,
    })
  } catch (error) {
    console.error('Get teachers error:', error)
    return NextResponse.json(
      { success: false, error: '获取教师列表失败' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { teacher_id, name, department, role = 'teacher', permissions = [], password = '123456' } = body

    const existing = await db.queryOne<DBTeacher>(
      'SELECT id FROM teachers WHERE teacher_id = ?',
      [teacher_id]
    )

    if (existing) {
      return NextResponse.json(
        { success: false, error: '工号已存在' },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const result = await db.insert('teachers', {
      teacher_id,
      password: hashedPassword,
      name,
      department,
      role,
      permissions: JSON.stringify(permissions),
      status: 'inactive',
    })

    return NextResponse.json({
      success: true,
      data: { id: result.insertId },
    })
  } catch (error) {
    console.error('Create teacher error:', error)
    return NextResponse.json(
      { success: false, error: '创建教师失败' },
      { status: 500 }
    )
  }
}
