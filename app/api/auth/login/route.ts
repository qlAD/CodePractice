import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { db, type DBStudent } from '@/lib/db'

// 检查是否使用真实数据库
const USE_REAL_DB = process.env.MYSQL_HOST && process.env.MYSQL_DATABASE

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { student_id, password } = body

    // 如果配置了数据库，使用真实数据库查询
    if (USE_REAL_DB) {
      // 查询学生
      const student = await db.queryOne<DBStudent>(
        'SELECT * FROM students WHERE student_id = ?',
        [student_id]
      )

      if (!student) {
        return NextResponse.json(
          { success: false, error: '学号不存在' },
          { status: 401 }
        )
      }

      // 验证密码
      const isPasswordValid = await bcrypt.compare(password, student.password)
      if (!isPasswordValid) {
        return NextResponse.json(
          { success: false, error: '密码错误' },
          { status: 401 }
        )
      }

      // 更新最后登录时间
      await db.update(
        'students',
        { last_login: new Date() },
        'id = ?',
        [student.id]
      )

      // 记录登录日志
      await db.insert('system_logs', {
        user_type: 'student',
        user_id: student.id,
        user_name: student.name,
        module: 'auth',
        action: '学生登录',
        detail: `学号 ${student_id} 登录成功`,
        status: 'success',
      })

      // 返回用户数据（不包含密码）
      return NextResponse.json({
        success: true,
        user: {
          id: student.id,
          student_id: student.student_id,
          name: student.name,
          class_name: student.class_name,
          major: student.major,
        },
        token: `student_${student.id}_${Date.now()}`,
      })
    }

    return NextResponse.json(
      { success: false, error: '系统未配置数据库，请联系管理员' },
      { status: 500 }
    )
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, error: '登录失败，请稍后重试' },
      { status: 500 }
    )
  }
}
