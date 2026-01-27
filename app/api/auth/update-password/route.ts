import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { db, type DBStudent } from '@/lib/db'

// 检查是否使用真实数据库
const USE_REAL_DB = process.env.MYSQL_HOST && process.env.MYSQL_DATABASE

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { student_id, old_password, new_password } = body

    // 验证参数
    if (!student_id || !old_password || !new_password) {
      return NextResponse.json(
        { success: false, error: '缺少必要参数' },
        { status: 400 }
      )
    }

    // 如果配置了数据库，使用真实数据库查询
    if (USE_REAL_DB) {
      // 查询学生
      const student = await db.queryOne<DBStudent>(
        'SELECT * FROM students WHERE student_id = ?',
        [student_id]
      )

      if (!student) {
        return NextResponse.json(
          { success: false, error: '用户不存在' },
          { status: 404 }
        )
      }

      // 验证旧密码
      const isPasswordValid = await bcrypt.compare(old_password, student.password)
      if (!isPasswordValid) {
        return NextResponse.json(
          { success: false, error: '原密码错误' },
          { status: 401 }
        )
      }

      // 加密新密码
      const hashedPassword = await bcrypt.hash(new_password, 10)

      // 更新密码
      await db.update(
        'students',
        { password: hashedPassword, updated_at: new Date() },
        'id = ?',
        [student.id]
      )

      // 记录操作日志
      await db.insert('system_logs', {
        user_type: 'student',
        user_id: student.id,
        user_name: student.name,
        module: 'auth',
        action: '修改密码',
        detail: `学号 ${student_id} 修改密码成功`,
        status: 'success',
      })

      return NextResponse.json({ success: true })
    }

    // 使用 Mock 数据进行演示
    // 假设旧密码正确
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Password update error:', error)
    return NextResponse.json(
      { success: false, error: '密码更新失败' },
      { status: 500 }
    )
  }
}
