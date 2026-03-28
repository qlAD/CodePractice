import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    await db.query(
      `UPDATE students s
       LEFT JOIN (
         SELECT DISTINCT student_id FROM practice_records
         WHERE started_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
       ) a ON s.id = a.student_id
       SET s.status = CASE
         WHEN s.status = 'locked' THEN s.status
         WHEN a.student_id IS NOT NULL THEN 'active'
         ELSE 'inactive'
       END`
    )
    await db.query(
      `UPDATE teachers SET status = CASE
         WHEN last_login IS NOT NULL AND last_login >= DATE_SUB(NOW(), INTERVAL 7 DAY) THEN 'active'
         ELSE 'inactive'
       END`
    )

    // 获取学生总数
    const studentCount = await db.queryOne<{ count: number }>(
      'SELECT COUNT(*) as count FROM students'
    )

    // 获取活跃学生数
    const activeStudentCount = await db.queryOne<{ count: number }>(
      'SELECT COUNT(*) as count FROM students WHERE status = \'active\''
    )

    // 获取教师总数
    const teacherCount = await db.queryOne<{ count: number }>(
      'SELECT COUNT(*) as count FROM teachers'
    )

    // 获取题目总数
    const questionCount = await db.queryOne<{ count: number }>(
      'SELECT COUNT(*) as count FROM questions'
    )

    const paperCount = await db.queryOne<{ count: number }>(
      'SELECT COUNT(*) as count FROM papers'
    )

    const practiceCountModes = 'practice_mode IN ("by_exam", "by_paper")'

    const todayPractice = await db.queryOne<{ count: number }>(
      `SELECT COUNT(*) as count FROM practice_records WHERE DATE(started_at) = CURDATE() AND ${practiceCountModes}`
    )

    const weekPractice = await db.queryOne<{ count: number }>(
      `SELECT COUNT(*) as count FROM practice_records WHERE YEARWEEK(started_at, 1) = YEARWEEK(CURDATE(), 1) AND ${practiceCountModes}`
    )

    // 按语言统计题目数量
    const questionsByLanguage = await db.query<{ language: string; count: number }>(
      'SELECT language, COUNT(*) as count FROM questions GROUP BY language'
    )

    // 按题型统计题目数量
    const questionsByType = await db.query<{ type: string; count: number }>(
      'SELECT type, COUNT(*) as count FROM questions GROUP BY type'
    )

    const practicesTrend = await db.query<{ date: string; count: number }>(
      `SELECT DATE(started_at) as date, COUNT(*) as count 
       FROM practice_records 
       WHERE started_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND ${practiceCountModes}
       GROUP BY DATE(started_at)
       ORDER BY date`
    )

    const recentStudents = await db.query<{ id: number; name: string; student_id: string; practice_count: number; last_practice_at: string | null }>(
      `SELECT s.id, s.name, s.student_id, COUNT(p.id) as practice_count, MAX(p.started_at) as last_practice_at
       FROM students s
       LEFT JOIN practice_records p ON s.id = p.student_id AND p.started_at >= DATE_SUB(NOW(), INTERVAL 7 DAY) AND ${practiceCountModes}
       GROUP BY s.id
       ORDER BY practice_count DESC
       LIMIT 10`
    )

    return NextResponse.json({
      success: true,
      data: {
        overview: {
          students: studentCount?.count || 0,
          activeStudents: activeStudentCount?.count || 0,
          teachers: teacherCount?.count || 0,
          questions: questionCount?.count || 0,
          papers: paperCount?.count || 0,
          todayPractices: todayPractice?.count || 0,
          weekPractices: weekPractice?.count || 0,
        },
        questionsByLanguage,
        questionsByType,
        practicesTrend,
        recentStudents,
      },
    })
  } catch (error) {
    console.error('Get stats error:', error)
    return NextResponse.json(
      { success: false, error: '获取统计数据失败' },
      { status: 500 }
    )
  }
}
