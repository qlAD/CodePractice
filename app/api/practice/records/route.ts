import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const student_id = searchParams.get('student_id')
    const language = searchParams.get('language')
    const limit = Number(searchParams.get('limit')) || 50
    const offset = Number(searchParams.get('offset')) || 0

    let sql = `
      SELECT 
        pr.id, pr.practice_mode as mode, pr.language, pr.question_type, pr.chapter_id, c.name as chapter_name, pr.score, pr.total_score, 
        pr.correct_count, pr.total_questions as total_count, pr.time_spent as duration, pr.started_at as created_at,
        s.name as student_name, s.student_id, s.class_name
      FROM practice_records pr
      JOIN students s ON pr.student_id = s.id
      LEFT JOIN chapters c ON pr.chapter_id = c.id
      WHERE 1=1
    `
    const params: unknown[] = []

    if (student_id) {
      sql += ' AND s.student_id = ?'
      params.push(student_id)
    }
    if (language && language !== 'all') {
      sql += ' AND pr.language = ?'
      params.push(language)
    }

    const countSql = sql.replace(/SELECT[\s\S]*?FROM/, 'SELECT COUNT(*) as total FROM')
    const countResult = await db.queryOne<{ total: number }>(countSql, params)
    const total = countResult?.total || 0

    sql += ' ORDER BY pr.started_at DESC LIMIT ? OFFSET ?'
    params.push(limit, offset)

    const records = await db.query(sql, params)

    return NextResponse.json({
      success: true,
      data: records,
      total,
    })
  } catch (error) {
    console.error('Get practice records error:', error)
    return NextResponse.json(
      { success: false, error: '获取练习记录失败' },
      { status: 500 }
    )
  }
}
