import { NextResponse } from 'next/server'
import { db, type DBQuestion, type DBPracticeRecord, type DBAnswerRecord } from '@/lib/db'
import { safeJsonParse } from '@/lib/utils'

const USE_REAL_DB = process.env.MYSQL_HOST && process.env.MYSQL_DATABASE

// 获取练习题目
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const mode = searchParams.get('mode') // by_language, by_type, by_chapter, exam
    const language = searchParams.get('language')
    const types = searchParams.getAll('type')
    const chapter_id = searchParams.get('chapter_id')
    const count = Number(searchParams.get('count')) || 10

    if (USE_REAL_DB) {
      let questions: DBQuestion[] = []

      // 考试模式：按题型分配题目数量
      if (mode === 'exam') {
        const examConfig = [
          { type: 'single_choice', count: 30 },
          { type: 'fill_blank', count: 3 },
          { type: 'error_fix', count: 3 },
          { type: 'programming', count: 4 }
        ]

        for (const { type, count } of examConfig) {
          let sql = 'SELECT * FROM questions'
          const params: unknown[] = []

          if (language) {
            sql += ' WHERE language = ?'
            params.push(language)
          } else {
            sql += ' WHERE 1=1'
          }
          sql += ' AND type = ?'
          params.push(type)
          if (chapter_id) {
            sql += ' AND chapter_id = ?'
            params.push(chapter_id)
          }

          sql += ' ORDER BY RAND() LIMIT ?'
          params.push(count)

          const typeQuestions = await db.query<DBQuestion>(sql, params)
          questions = [...questions, ...typeQuestions]
        }
      } else {
        // 常规练习模式
        let sql = 'SELECT * FROM questions'
        const params: unknown[] = []

        let hasWhere = false
        if (language) {
          sql += ' WHERE language = ?'
          params.push(language)
          hasWhere = true
        }
        if (types && types.length > 0) {
          sql += (hasWhere ? ' AND ' : ' WHERE ') + 'type IN (' + types.map(() => '?').join(',') + ')'
          params.push(...types)
          hasWhere = true
        }
        if (chapter_id) {
          sql += (hasWhere ? ' AND ' : ' WHERE ') + 'chapter_id = ?'
          params.push(chapter_id)
          hasWhere = true
        }

        if (!hasWhere) {
          sql += ' WHERE 1=1'
        }

        sql += ' ORDER BY RAND() LIMIT ?'
        params.push(count)

        questions = await db.query<DBQuestion>(sql, params)
      }

      // 格式化返回数据（隐藏答案）
      const formattedQuestions = questions.map(q => ({
        id: q.id,
        language: q.language,
        type: q.type,
        chapter_id: q.chapter_id,
        difficulty: q.difficulty,
        content: q.content,
        options: safeJsonParse<string[]>(q.options),
        code_template: q.code_template,
        score: q.score,
        // 不返回答案和解析
      }))

      return NextResponse.json({
        success: true,
        data: formattedQuestions,
      })
    }

    return NextResponse.json(
      { success: false, error: '系统未配置数据库，请联系管理员' },
      { status: 500 }
    )
  } catch (error) {
    console.error('Get practice questions error:', error)
    return NextResponse.json(
      { success: false, error: '获取练习题目失败' },
      { status: 500 }
    )
  }
}

// 开始练习
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { student_id, mode, language, question_type, chapter_id, question_count } = body

    if (USE_REAL_DB) {
      const result = await db.insert('practice_records', {
        student_id,
        practice_mode: mode,
        language: language || null,
        question_type: question_type || null,
        chapter_id: chapter_id || null,
        total_questions: question_count,
        status: 'in_progress',
      })

      return NextResponse.json({
        success: true,
        data: { practice_id: result.insertId },
      })
    }

    return NextResponse.json({
      success: true,
      data: { practice_id: Date.now() },
    })
  } catch (error) {
    console.error('Start practice error:', error)
    return NextResponse.json(
      { success: false, error: '开始练习失败' },
      { status: 500 }
    )
  }
}

// 提交答案
export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { practice_id, question_id, answer, time_spent } = body

    if (USE_REAL_DB) {
      // 获取题目答案
      const question = await db.queryOne<DBQuestion>(
        'SELECT answer, score FROM questions WHERE id = ?',
        [question_id]
      )

      if (!question) {
        return NextResponse.json(
          { success: false, error: '题目不存在' },
          { status: 404 }
        )
      }

      const isCorrect = answer.trim() === question.answer.trim()
      const score = isCorrect ? question.score : 0

      // 保存答题记录
      await db.insert('answer_records', {
        practice_record_id: practice_id,
        question_id,
        student_answer: answer,
        is_correct: isCorrect,
        score,
        time_spent: time_spent || 0,
        is_marked: 0
      })

      // 更新练习记录
      if (isCorrect) {
        await db.query(
          'UPDATE practice_records SET correct_count = correct_count + 1, score = score + ? WHERE id = ?',
          [score, practice_id]
        )
      } else {
        await db.query(
          'UPDATE practice_records SET wrong_count = wrong_count + 1 WHERE id = ?',
          [practice_id]
        )

        // 添加到错题本
        const record = await db.queryOne<DBPracticeRecord>(
          'SELECT student_id FROM practice_records WHERE id = ?',
          [practice_id]
        )

        if (record) {
          // 检查是否已在错题本
          const existing = await db.queryOne(
            'SELECT id FROM wrong_answers WHERE student_id = ? AND question_id = ?',
            [record.student_id, question_id]
          )

          if (existing) {
            await db.query(
              'UPDATE wrong_answers SET wrong_count = wrong_count + 1, wrong_answer = ?, last_wrong_at = NOW(), status = "pending" WHERE student_id = ? AND question_id = ?',
              [answer, record.student_id, question_id]
            )
          } else {
            await db.insert('wrong_answers', {
              student_id: record.student_id,
              question_id,
              wrong_answer: answer,
              status: 'pending',
            })
          }
        }
      }

      return NextResponse.json({
        success: true,
        data: {
          is_correct: isCorrect,
          correct_answer: question.answer,
          score,
        },
      })
    }

    return NextResponse.json(
      { success: false, error: '系统未配置数据库，请联系管理员' },
      { status: 500 }
    )
  } catch (error) {
    console.error('Submit answer error:', error)
    return NextResponse.json(
      { success: false, error: '提交答案失败' },
      { status: 500 }
    )
  }
}
