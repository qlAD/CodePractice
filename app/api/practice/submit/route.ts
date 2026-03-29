import { NextResponse } from 'next/server'
import { db, type DBQuestion } from '@/lib/db'
import { evaluatePracticeAnswer } from '@/lib/grading'
import { normalizePracticeModeForDb } from '@/lib/practice-mode'
import type { QuestionType } from '@/lib/types'

// 批量提交练习答案
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { student_id, mode, language, question_type, paper_id, answers, question_ids } = body

    if (!student_id || !answers || !question_ids) {
      return NextResponse.json(
        { success: false, error: '缺少必要参数' },
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

    // 获取所有题目的答案
    const placeholders = question_ids.map(() => '?').join(',')
    const questions = await db.query<DBQuestion & { type: string; code_template: string }>(
      `SELECT id, answer, score, type, code_template FROM questions WHERE id IN (${placeholders})`,
      question_ids
    )

    // 创建答案映射
    const questionMap = new Map<number, { answer: string; score: number; type: string; code_template: string }>()
    questions.forEach(q => {
      questionMap.set(q.id, { 
        answer: q.answer, 
        score: q.score,
        type: q.type,
        code_template: q.code_template
      })
    })

    const questionTypeStr = Array.isArray(question_type) ? question_type.join(',') : question_type;

    const firstPaperId =
      paper_id != null && paper_id !== ''
        ? Number(String(paper_id).split(',')[0]?.trim())
        : NaN
    const resolvedPaperId = Number.isFinite(firstPaperId) ? firstPaperId : null

    const practiceResult = await db.insert('practice_records', {
      student_id: studentDbId,
      practice_mode: normalizePracticeModeForDb(mode),
      language: language || null,
      question_type: questionTypeStr || null,
      paper_id: resolvedPaperId,
      total_questions: question_ids.length,
      status: 'completed',
    })

    const practiceId = practiceResult.insertId

    // 验证每个答案并记录
    const results: Array<{
      question_id: number
      is_correct: boolean
      status: string
      correct_answer: string
      score: number
      match_percentage?: number
    }> = []

    let totalScore = 0
    let correctCount = 0

    for (const questionId of question_ids) {
      const questionInfo = questionMap.get(questionId)
      if (!questionInfo) continue

      // 查找用户的答案
      const userAnswerObj = answers.find((a: { question_id: number; answer: string }) => a.question_id === questionId)
      const userAnswer = userAnswerObj?.answer || ''

      const graded = evaluatePracticeAnswer({
        type: questionInfo.type as QuestionType,
        userAnswer,
        storedAnswer: questionInfo.answer,
        codeTemplate: questionInfo.code_template,
        maxScore: questionInfo.score,
      })

      const { isCorrect, status, earnedScore, formattedCorrectAnswer, matchPercentage } = graded

      if (isCorrect) {
        correctCount++
      }
      totalScore += earnedScore

      // 保存答题记录
      await db.insert('answer_records', {
        practice_record_id: practiceId,
        question_id: questionId,
        student_answer: userAnswer,
        is_correct: isCorrect,
        score: earnedScore,
        time_spent: 0,
        is_marked: 0
      })

      // 检查该题目是否在错题本中
      const wrongAnswerRecord = await db.queryOne<{ id: number; review_count: number; wrong_count: number; status: string }>(
        'SELECT id, review_count, wrong_count, status FROM wrong_answers WHERE student_id = ? AND question_id = ?',
        [studentDbId, questionId]
      )

      // 如果在错题本中，根据答题结果更新
      if (wrongAnswerRecord) {
        if (isCorrect) {
          // 答对了，增加复习次数，更新状态
          const newReviewCount = wrongAnswerRecord.review_count + 1
          // 简化状态判断逻辑
          let newStatus = 'pending'
          if (newReviewCount > wrongAnswerRecord.wrong_count) {
            newStatus = 'mastered' // 复习次数 > 错误次数
          } else if (newReviewCount > 0) {
            newStatus = 'reviewing' // 复习次数 <= 错误次数但大于0
          }
          
          await db.query(
            'UPDATE wrong_answers SET review_count = ?, status = ?, last_review_at = NOW() WHERE id = ?',
            [newReviewCount, newStatus, wrongAnswerRecord.id]
          )
        } else {
          // 答错了
          if (wrongAnswerRecord.status === 'mastered') {
            // 如果是已掌握的题目又答错了，重置状态
            await db.query(
              'UPDATE wrong_answers SET wrong_count = 1, review_count = 0, wrong_answer = ?, last_wrong_at = NOW(), status = "pending", last_review_at = NULL WHERE id = ?',
              [userAnswer || '', wrongAnswerRecord.id]
            )
          } else {
            // 其他状态正常增加错误次数
            await db.query(
              'UPDATE wrong_answers SET wrong_count = wrong_count + 1, wrong_answer = ?, last_wrong_at = NOW(), status = "pending" WHERE id = ?',
              [userAnswer || '', wrongAnswerRecord.id]
            )
          }
        }
      } else if (!isCorrect) {
        await db.insert('wrong_answers', {
          student_id: studentDbId,
          question_id: questionId,
          wrong_answer: userAnswer || '',
          status: 'pending',
        })
      }

      const resultItem: {
        question_id: number
        is_correct: boolean
        status: string
        correct_answer: string
        score: number
        match_percentage?: number
      } = {
        question_id: questionId,
        is_correct: isCorrect,
        status: status,
        correct_answer: formattedCorrectAnswer,
        score: earnedScore,
      }
      
      if (matchPercentage !== undefined) {
        resultItem.match_percentage = matchPercentage
      }
      
      results.push(resultItem)
    }

    // 更新练习记录的统计
    await db.query(
      'UPDATE practice_records SET correct_count = ?, wrong_count = ?, score = ?, status = "completed" WHERE id = ?',
      [correctCount, question_ids.length - correctCount, Math.round(totalScore * 10) / 10, practiceId]
    )

    return NextResponse.json({
      success: true,
      data: {
        practice_id: practiceId,
        total_score: Math.round(totalScore * 10) / 10,
        correct_count: correctCount,
        total_questions: question_ids.length,
        results,
      },
    })
  } catch (error) {
    console.error('Submit practice error:', error)
    return NextResponse.json(
      { success: false, error: '提交练习失败' },
      { status: 500 }
    )
  }
}
