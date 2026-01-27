import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { db, type DBTeacher } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { teacher_id, old_password, new_password } = body

    if (!teacher_id || !old_password || !new_password) {
      return NextResponse.json({ success: false, error: '缺少必要参数' }, { status: 400 })
    }

    if (!process.env.MYSQL_HOST || !process.env.MYSQL_DATABASE) {
      return NextResponse.json({ success: false, error: '数据库未配置，请联系管理员' }, { status: 500 })
    }

    const teacher = await db.queryOne<DBTeacher>('SELECT * FROM teachers WHERE id = ?', [teacher_id])
    if (!teacher) {
      return NextResponse.json({ success: false, error: '用户不存在' }, { status: 404 })
    }

    const isBcryptHash = typeof teacher.password === 'string' && teacher.password.startsWith('$2')
    let isPasswordValid = false
    if (isBcryptHash) {
      isPasswordValid = await bcrypt.compare(old_password, teacher.password)
    } else {
      isPasswordValid = old_password === teacher.password
    }

    if (!isPasswordValid) {
      return NextResponse.json({ success: false, error: '原密码错误' }, { status: 401 })
    }

    const hashedPassword = await bcrypt.hash(new_password, 10)
    await db.update('teachers', { password: hashedPassword, updated_at: new Date() }, 'id = ?', [teacher.id])

    try {
      await db.insert('system_logs', {
        user_type: 'teacher',
        user_id: teacher.id,
        user_name: teacher.name,
        module: 'auth',
        action: '修改密码',
        detail: `教师 ${teacher.teacher_id || teacher.name} 修改密码成功`,
        status: 'success',
      })
    } catch {
      // ignore
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Teacher password update error:', error)
    return NextResponse.json({ success: false, error: '密码更新失败' }, { status: 500 })
  }
}

