import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { db, type DBTeacher } from '@/lib/db'
import { safeJsonParse } from '@/lib/utils'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    // 支持 username 或 teacher_id 字段
    const username = body.username || body.teacher_id
    const { password } = body

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: '请输入用户名和密码' },
        { status: 400 }
      )
    }

    // 检查数据库配置
    if (!process.env.MYSQL_HOST || !process.env.MYSQL_DATABASE) {
      return NextResponse.json(
        { success: false, error: '数据库未配置，请联系管理员' },
        { status: 500 }
      )
    }

    // 查询教师 - 支持用 teacher_id 或 name 登录
    const teacher = await db.queryOne<DBTeacher>(
      'SELECT * FROM teachers WHERE (teacher_id = ? OR name = ?)',
      [username, username]
    )

    if (!teacher) {
      return NextResponse.json(
        { success: false, error: '用户名不存在' },
        { status: 401 }
      )
    }

    // 验证密码 - 支持明文和哈希两种方式
    let isPasswordValid = false
    
    // 检查密码是否是 bcrypt 哈希格式 (以 $2a$, $2b$, $2y$ 开头)
    const isBcryptHash = teacher.password.startsWith('$2')
    
    if (isBcryptHash) {
      // bcrypt 哈希密码比较
      isPasswordValid = await bcrypt.compare(password, teacher.password)
    } else {
      // 明文密码比较（用于初始密码）
      isPasswordValid = password === teacher.password
    }

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: '密码错误' },
        { status: 401 }
      )
    }

    // 更新最后登录时间
    try {
      await db.update(
        'teachers',
        { last_login: new Date() },
        'id = ?',
        [teacher.id]
      )
    } catch {
      // Ignore update failure
    }

    // 记录登录日志
    try {
      await db.insert('system_logs', {
        user_type: 'teacher',
        user_id: teacher.id,
        user_name: teacher.name,
        module: 'auth',
        action: '教师登录',
        detail: `用户 ${username} 登录成功`,
        status: 'success',
      })
    } catch {
      // Ignore log failure
    }

    // 返回用户数据（不包含密码）
    return NextResponse.json({
      success: true,
      user: {
        id: teacher.id,
        teacher_id: teacher.teacher_id,
        username: teacher.teacher_id,
        name: teacher.name,
        department: teacher.department,
        role: teacher.role,
        permissions: safeJsonParse<string[]>(teacher.permissions, ['all']),
      },
      token: `teacher_${teacher.id}_${Date.now()}`,
    })
  } catch {
    return NextResponse.json(
      { success: false, error: '登录失败，请稍后重试' },
      { status: 500 }
    )
  }
}
