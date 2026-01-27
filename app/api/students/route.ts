import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { db, type DBStudent } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const class_name = searchParams.get('class_name')
    const status = searchParams.get('status')
    const major = searchParams.get('major')
    const hasPractice = searchParams.get('hasPractice')
    const limitParam = searchParams.get('limit')
    const limit = limitParam !== null ? Number(limitParam) : 100
    const offset = Number(searchParams.get('offset')) || 0
    const sort = searchParams.get('sort') || 'id'

    let sql = 'SELECT id, student_id, name, class_name, major, status, last_login, created_at FROM students WHERE 1=1'
    const params: unknown[] = []

    if (search) {
      sql += ' AND (student_id LIKE ? OR name LIKE ?)'
      params.push(`%${search}%`, `%${search}%`)
    }
    if (class_name && class_name !== 'all') {
      sql += ' AND class_name = ?'
      params.push(class_name)
    }
    if (status && status !== 'all') {
      sql += ' AND status = ?'
      params.push(status)
    }
    if (major && major !== 'all') {
      sql += ' AND major = ?'
      params.push(major)
    }
    if (hasPractice && hasPractice !== 'all') {
      if (hasPractice === 'true') {
        sql += ' AND id IN (SELECT DISTINCT student_id FROM practice_records)'
      } else {
        sql += ' AND id NOT IN (SELECT DISTINCT student_id FROM practice_records)'
      }
    }

    const countSql = sql.replace('SELECT id, student_id, name, class_name, major, status, last_login, created_at', 'SELECT COUNT(*) as total')
    const countResult = await db.queryOne<{ total: number }>(countSql, params)
    const total = countResult?.total || 0

    if (sort === 'student_id') {
      sql += ' ORDER BY student_id ASC'
    } else {
      sql += ' ORDER BY id DESC'
    }
    
    if (limit > 0) {
      sql += ' LIMIT ? OFFSET ?'
      params.push(limit, offset)
    }

    const students = await db.query<Omit<DBStudent, 'password'>>(sql, params)

    return NextResponse.json({
      success: true,
      data: students,
      total,
      limit,
      offset,
    })
  } catch (error) {
    console.error('Get students error:', error)
    return NextResponse.json(
      { success: false, error: '获取学生列表失败' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { student_id, name, class_name, major, password = '123456' } = body

    const existing = await db.queryOne<DBStudent>(
      'SELECT id FROM students WHERE student_id = ?',
      [student_id]
    )

    if (existing) {
      return NextResponse.json(
        { success: false, error: '学号已存在' },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const result = await db.insert('students', {
      student_id,
      password: hashedPassword,
      name,
      class_name,
      major,
      status: 'inactive',
    })

    return NextResponse.json({
      success: true,
      data: { id: result.insertId },
    })
  } catch (error) {
    console.error('Create student error:', error)
    return NextResponse.json(
      { success: false, error: '创建学生失败' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { students } = body

    if (!Array.isArray(students) || students.length === 0) {
      return NextResponse.json(
        { success: false, error: '无效的学生数据' },
        { status: 400 }
      )
    }

    const results = {
      success: 0,
      failed: 0,
      duplicate: 0,
      errors: [] as string[],
    }

    for (const student of students) {
      try {
        const existing = await db.queryOne<DBStudent>(
          'SELECT id FROM students WHERE student_id = ?',
          [student.student_id]
        )

        if (existing) {
          results.duplicate++
          results.errors.push(`学号 ${student.student_id} 已存在`)
          continue
        }

        const hashedPassword = await bcrypt.hash(student.password || '123456', 10)

        await db.insert('students', {
          student_id: student.student_id,
          password: hashedPassword,
          name: student.name,
          class_name: student.class_name,
          major: student.major,
          status: 'inactive',
        })

        results.success++
      } catch {
        results.failed++
        results.errors.push(`学号 ${student.student_id} 导入失败`)
      }
    }

    return NextResponse.json({
      success: true,
      data: results,
    })
  } catch (error) {
    console.error('Batch import students error:', error)
    return NextResponse.json(
      { success: false, error: '批量导入失败' },
      { status: 500 }
    )
  }
}
