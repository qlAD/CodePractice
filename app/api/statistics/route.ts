import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    // 先更新学生的活跃状态
    // 1. 获取所有学生ID
    const allStudents = await db.query<{ id: number }>(
      'SELECT id FROM students'
    )
    
    // 2. 获取最近7天有练习记录的学生ID
    const activeStudentIds = await db.query<{ student_id: number }>(
      'SELECT DISTINCT student_id FROM practice_records WHERE started_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)'
    )
    
    const activeIdsSet = new Set(activeStudentIds.map(record => record.student_id))
    
    // 3. 逐个更新学生状态
    for (const student of allStudents) {
      const newStatus = activeIdsSet.has(student.id) ? 'active' : 'inactive'
      await db.update('students', { status: newStatus }, 'id = ?', [student.id])
    }
    
    // 更新教师的活跃状态
    // 1. 获取所有教师ID
    const allTeachers = await db.query<{ id: number; last_login: string | null }>(
      'SELECT id, last_login FROM teachers'
    )
    
    // 2. 逐个更新教师状态
    for (const teacher of allTeachers) {
      let newStatus = 'inactive'
      if (teacher.last_login) {
        const lastLoginDate = new Date(teacher.last_login)
        const sevenDaysAgo = new Date()
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
        if (lastLoginDate >= sevenDaysAgo) {
          newStatus = 'active'
        }
      }
      await db.update('teachers', { status: newStatus }, 'id = ?', [teacher.id])
    }

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

    // 获取章节总数
    const chapterCount = await db.queryOne<{ count: number }>(
      'SELECT COUNT(*) as count FROM chapters'
    )

    // 今日练习次数（只统计模拟考试）
    const todayPractice = await db.queryOne<{ count: number }>(
      'SELECT COUNT(*) as count FROM practice_records WHERE DATE(started_at) = CURDATE() AND practice_mode = "exam"'
    )

    // 本周练习次数（只统计模拟考试）
    const weekPractice = await db.queryOne<{ count: number }>(
      'SELECT COUNT(*) as count FROM practice_records WHERE YEARWEEK(started_at, 1) = YEARWEEK(CURDATE(), 1) AND practice_mode = "exam"'
    )

    // 按语言统计题目数量
    const questionsByLanguage = await db.query<{ language: string; count: number }>(
      'SELECT language, COUNT(*) as count FROM questions GROUP BY language'
    )

    // 按题型统计题目数量
    const questionsByType = await db.query<{ type: string; count: number }>(
      'SELECT type, COUNT(*) as count FROM questions GROUP BY type'
    )

    // 最近7天的练习趋势（只统计模拟考试）
    const practicesTrend = await db.query<{ date: string; count: number }>(
      `SELECT DATE(started_at) as date, COUNT(*) as count 
       FROM practice_records 
       WHERE started_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND practice_mode = "exam"
       GROUP BY DATE(started_at)
       ORDER BY date`
    )

    // 最近活跃的学生（只统计模拟考试）
    const recentStudents = await db.query<{ id: number; name: string; student_id: string; practice_count: number }>(
      `SELECT s.id, s.name, s.student_id, COUNT(p.id) as practice_count
       FROM students s
       LEFT JOIN practice_records p ON s.id = p.student_id AND p.started_at >= DATE_SUB(NOW(), INTERVAL 7 DAY) AND p.practice_mode = "exam"
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
          chapters: chapterCount?.count || 0,
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
