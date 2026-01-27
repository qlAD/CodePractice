import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

// 获取学生个人统计数据
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const student_id = searchParams.get('student_id')

    if (!student_id) {
      return NextResponse.json(
        { success: false, error: '缺少学生ID' },
        { status: 400 }
      )
    }

    // 获取学生信息
    const student = await db.queryOne<{ id: number }>(
      'SELECT id FROM students WHERE student_id = ?',
      [student_id]
    )

    if (!student) {
      return NextResponse.json(
        { success: false, error: '学生不存在' },
        { status: 404 }
      )
    }

    const studentDbId = student.id

    // 获取总答题数和正确数
    const totalStats = await db.queryOne<{ 
      total_questions: number
      correct_count: number 
    }>(
      `SELECT 
        COUNT(*) as total_questions,
        SUM(CASE WHEN ar.is_correct = 1 THEN 1 ELSE 0 END) as correct_count
      FROM answer_records ar
      JOIN practice_records pr ON ar.practice_record_id = pr.id
      WHERE pr.student_id = ?`,
      [studentDbId]
    )

    const total_questions = totalStats?.total_questions || 0
    const correct_count = totalStats?.correct_count || 0
    const accuracy_rate = total_questions > 0 
      ? Math.round((correct_count / total_questions) * 100) 
      : 0

    // 按语言统计
    const languageStats = await db.query<{
      language: string
      total: number
      correct: number
    }>(
      `SELECT 
        q.language,
        COUNT(*) as total,
        SUM(CASE WHEN ar.is_correct = 1 THEN 1 ELSE 0 END) as correct
      FROM answer_records ar
      JOIN practice_records pr ON ar.practice_record_id = pr.id
      JOIN questions q ON ar.question_id = q.id
      WHERE pr.student_id = ? AND q.language IS NOT NULL
      GROUP BY q.language`,
      [studentDbId]
    )

    const by_language: Record<string, { total: number; correct: number; rate: number }> = {
      java: { total: 0, correct: 0, rate: 0 },
      cpp: { total: 0, correct: 0, rate: 0 },
      python: { total: 0, correct: 0, rate: 0 },
    }

    languageStats.forEach(stat => {
      if (stat.language && by_language[stat.language]) {
        by_language[stat.language] = {
          total: stat.total,
          correct: stat.correct,
          rate: stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0,
        }
      }
    })

    // 按题型统计 - 从答题记录中获取
    const typeStats = await db.query<{
      type: string
      total: number
      correct: number
    }>(
      `SELECT 
        q.type,
        COUNT(*) as total,
        SUM(CASE WHEN ar.is_correct = 1 THEN 1 ELSE 0 END) as correct
      FROM answer_records ar
      JOIN practice_records pr ON ar.practice_record_id = pr.id
      JOIN questions q ON ar.question_id = q.id
      WHERE pr.student_id = ?
      GROUP BY q.type`,
      [studentDbId]
    )

    const by_type: Record<string, { total: number; correct: number; rate: number }> = {
      single_choice: { total: 0, correct: 0, rate: 0 },
      fill_blank: { total: 0, correct: 0, rate: 0 },
      error_fix: { total: 0, correct: 0, rate: 0 },
      programming: { total: 0, correct: 0, rate: 0 },
    }

    typeStats.forEach(stat => {
      if (stat.type && by_type[stat.type]) {
        by_type[stat.type] = {
          total: stat.total,
          correct: stat.correct,
          rate: stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0,
        }
      }
    })

    // 按章节统计
    const chapterStats = await db.query<{
      language: string
      chapter_id: string
      chapter_name: string
      total: number
      correct: number
    }>(
      `SELECT 
        q.language,
        c.id as chapter_id,
        c.name as chapter_name,
        COUNT(*) as total,
        SUM(CASE WHEN ar.is_correct = 1 THEN 1 ELSE 0 END) as correct
      FROM answer_records ar
      JOIN practice_records pr ON ar.practice_record_id = pr.id
      JOIN questions q ON ar.question_id = q.id
      JOIN chapters c ON q.chapter_id = c.id
      WHERE pr.student_id = ? AND q.chapter_id IS NOT NULL AND q.language IS NOT NULL
      GROUP BY q.language, c.id, c.name`,
      [studentDbId]
    )

    const by_chapter: Record<string, Record<string, { total: number; correct: number; rate: number }>> = {}

    chapterStats.forEach(stat => {
      if (stat.language && stat.chapter_name) {
        if (!by_chapter[stat.language]) {
          by_chapter[stat.language] = {}
        }
        by_chapter[stat.language][stat.chapter_name] = {
          total: stat.total,
          correct: stat.correct,
          rate: stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0,
        }
      }
    })

    // 最近练习记录
    const recentSessions = await db.query<{
      id: number
      mode: string
      language: string | null
      question_type: string | null
      total_questions: number
      correct_count: number
      score: number
      started_at: string
    }>(
      `SELECT 
        id,
        practice_mode as mode,
        language,
        question_type,
        total_questions,
        correct_count,
        score,
        started_at
      FROM practice_records 
      WHERE student_id = ?
      ORDER BY started_at DESC
      LIMIT 5`,
      [studentDbId]
    )

    const recent_sessions = recentSessions.map(session => ({
      id: session.id,
      mode: session.mode || 'language',
      language: session.language,
      type: session.question_type,
      total_questions: session.total_questions,
      correct_count: session.correct_count,
      score: session.score,
      started_at: session.started_at,
    }))

    return NextResponse.json({
      success: true,
      data: {
        total_questions,
        correct_count,
        accuracy_rate,
        by_language,
        by_type,
        by_chapter,
        recent_sessions,
      },
    })
  } catch (error) {
    console.error('Get student stats error:', error)
    return NextResponse.json(
      { success: false, error: '获取学生统计数据失败' },
      { status: 500 }
    )
  }
}
