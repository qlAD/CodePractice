import { NextResponse } from 'next/server'
import { db, type DBQuestion } from '@/lib/db'

// Levenshtein distance function to calculate string similarity
function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];
  
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }
  
  return matrix[b.length][a.length];
}

// Helper to parse answers from DB format
function parseStoredAnswers(answerStr: string): string[][] {
  // Format 1: =======(答案1)=======\nAnswer1\n=======(答案2)=======\nAnswer2
  if (answerStr.includes('=======(答案')) {
    const parts = answerStr.split(/=======\(答案\d+\)=======/);
    // Filter empty parts
    const blanks = parts.map(p => p.trim()).filter(p => p.length > 0);
    
    return blanks.map(blank => {
        // Split by alternative separator
        if (blank.includes('=========或=========')) {
            return blank.split('=========或=========').map(alt => alt.trim());
        }
        return [blank];
    });
  }

  // Format 2: 1. Answer1 \n 2. Answer2 ...
  // Check if it looks like a numbered list
  const numberedListPattern = /(?:^|\n)\d+\.\s/;
  if (numberedListPattern.test(answerStr)) {
      // Split by the pattern
      const parts = answerStr.split(/(?:^|\n)\d+\.\s/);
      // Filter empty parts (the first split is often empty if string starts with "1. ")
      const blanks = parts.map(p => p.trim()).filter(p => p.length > 0);
      
      return blanks.map(blank => {
          if (blank.includes('=========或=========')) {
              return blank.split('=========或=========').map(alt => alt.trim());
          }
          return [blank];
      });
  }
  
  // Fallback: Single answer or just alternatives
  if (answerStr.includes('=========或=========')) {
      return [answerStr.split('=========或=========').map(p => p.trim())];
  }
  return [[answerStr]];
}

// Helper to extract user answers for fill_blank
function extractFillBlankAnswers(userCode: string, template: string): string[] {
  const markerRegex = /\/\*+SPACE\*+\//g;
  
  const templateMatches = Array.from(template.matchAll(markerRegex));
  const userMatches = Array.from(userCode.matchAll(markerRegex));
  
  if (templateMatches.length === 0) return [];
  
  const answers: string[] = [];

  for (let i = 0; i < templateMatches.length; i++) {
    if (i >= userMatches.length) break;

    const templateStart = templateMatches[i].index! + templateMatches[i][0].length;
    const templateEnd = i + 1 < templateMatches.length ? templateMatches[i + 1].index! : template.length;
    const templateLine = template.substring(templateStart, templateEnd).trim().split('\n')[0];

    const userStart = userMatches[i].index! + userMatches[i][0].length;
    const userEnd = i + 1 < userMatches.length ? userMatches[i + 1].index! : userCode.length;
    const userLine = userCode.substring(userStart, userEnd).trim().split('\n')[0];

    const parts = templateLine.split('【?】');
    if (parts.length !== 2) continue;

    const [prefix, suffix] = parts;
    const prefixIdx = userLine.indexOf(prefix);
    const suffixIdx = userLine.lastIndexOf(suffix);

    if (prefixIdx !== -1 && suffixIdx !== -1 && suffixIdx >= prefixIdx + prefix.length) {
      const extracted = userLine.substring(prefixIdx + prefix.length, suffixIdx).trim();
      answers.push(extracted === '【?】' ? '' : extracted);
    } else {
      answers.push(userLine);
    }
  }
  return answers;
}

// Helper to extract user answers for error_fix
function extractErrorFixAnswers(userCode: string): string[] {
  const markerRegex = /\/\*+FOUND\*+\//g;
  const matches = Array.from(userCode.matchAll(markerRegex));
  
  if (matches.length === 0) return [];

  const answers: string[] = [];

  for (let i = 0; i < matches.length; i++) {
    const start = matches[i].index! + matches[i][0].length;
    const end = i + 1 < matches.length ? matches[i + 1].index! : userCode.length;
    const line = userCode.substring(start, end).trim().split('\n')[0];
    answers.push(line);
  }
  return answers;
}

// 批量提交练习答案
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { student_id, mode, language, question_type, chapter_id, answers, question_ids } = body

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

    // 创建练习记录（所有模式都保存）
    const practiceModeMap: Record<string, string> = {
      language: 'by_language',
      type: 'by_type',
      chapter: 'by_chapter',
      exam: 'exam'
    }
    
    // Ensure question_type is string (handle array if needed)
    const questionTypeStr = Array.isArray(question_type) ? question_type.join(',') : question_type;

    const practiceResult = await db.insert('practice_records', {
      student_id: studentDbId,
      practice_mode: practiceModeMap[mode] || 'by_language',
      language: language || null,
      question_type: questionTypeStr || null,
      chapter_id: chapter_id ? Number(chapter_id) : null,
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

      // 标准化答案比较（去除首尾空白、统一换行符、去除行尾空白，保留必要的空白字符用于代码比较）
      const normalizeAnswer = (str: string) => {
        return str.trim()
          .replace(/\r\n/g, '\n')
          .replace(/\s+$/gm, '')
          .replace(/\/\*[\s\S]*?\*\//g, '')
          .replace(/\/\/.*$/gm, '')
          .replace(/\s+/g, ' ')
          .trim()
      }
      
      let isCorrect = false
      let status = 'wrong'
      let earnedScore = 0
      let formattedCorrectAnswer = questionInfo.answer
      let matchPercentage: number | undefined = undefined

      // Determine if we need special extraction logic
      if (questionInfo.type === 'fill_blank' || questionInfo.type === 'error_fix') {
          // parseStoredAnswers now returns string[][]
          const storedAnswers = parseStoredAnswers(questionInfo.answer);
          
          // Set formatted correct answer for display
          if (storedAnswers.length > 0) {
              formattedCorrectAnswer = storedAnswers.map((alternatives, i) => {
                  const altText = alternatives.join(' 或 ');
                  return `${i + 1}. ${altText}`;
              }).join('\n');
          }

          let extractedUserAnswers: string[] = [];
          if (questionInfo.type === 'fill_blank') {
              extractedUserAnswers = extractFillBlankAnswers(userAnswer, questionInfo.code_template || '');
          } else {
              extractedUserAnswers = extractErrorFixAnswers(userAnswer);
          }

          if (storedAnswers.length > 0) {
              let correctParts = 0;
              // Check each part
              storedAnswers.forEach((alternatives, index) => {
                  if (index < extractedUserAnswers.length) {
                      const userAns = normalizeAnswer(extractedUserAnswers[index]);
                      // Check if user answer matches ANY of the alternatives
                      const match = alternatives.some(alt => normalizeAnswer(alt) === userAns);
                      if (match) {
                          correctParts++;
                      }
                  }
              });

              if (correctParts === storedAnswers.length) {
                  status = 'correct';
                  isCorrect = true;
                  earnedScore = questionInfo.score;
              } else if (correctParts > 0) {
                  status = 'partial';
                  // Calculate partial score
                  const partScore = questionInfo.score / storedAnswers.length;
                  earnedScore = Math.round(correctParts * partScore * 10) / 10;
                  // If score >= 60%, mark as correct
                  if (earnedScore >= questionInfo.score * 0.6) {
                      isCorrect = true;
                  } else {
                      isCorrect = false;
                  }
              } else {
                  status = 'wrong';
                  isCorrect = false;
                  earnedScore = 0;
              }
          } else {
             // No answers stored? Fallback
             status = 'correct'; 
             isCorrect = true;
             earnedScore = questionInfo.score;
          }
      } else {
          let normalizedUserAnswer: string;
          let normalizedCorrectAnswer: string;
          
          if (questionInfo.type === 'programming') {
              // Extract code between Program markers
              const programRegex = /\/\*+Program\*+\/\s*([\s\S]*?)\s*\/\*+\s*End\s*\*+\//;
              const match = userAnswer.match(programRegex);
              const extractedUserCode = match ? match[1] : userAnswer;
              normalizedUserAnswer = normalizeAnswer(extractedUserCode);
              normalizedCorrectAnswer = normalizeAnswer(questionInfo.answer);
          } else {
              // Standard comparison for other types (e.g., choice)
              normalizedUserAnswer = normalizeAnswer(userAnswer);
              normalizedCorrectAnswer = normalizeAnswer(questionInfo.answer);
          }
          
          if (questionInfo.type === 'programming') {
              // Calculate character match percentage for program design
              matchPercentage = 0;
              
              if (normalizedCorrectAnswer === '') {
                  status = 'correct';
                  isCorrect = true;
                  earnedScore = questionInfo.score;
                  matchPercentage = 100;
              } else if (normalizedUserAnswer === '') {
                  status = 'wrong';
                  isCorrect = false;
                  earnedScore = 0;
                  matchPercentage = 0;
              } else {
                  // Calculate Levenshtein distance for similarity
                  const distance = levenshteinDistance(normalizedUserAnswer, normalizedCorrectAnswer);
                  const maxLength = Math.max(normalizedUserAnswer.length, normalizedCorrectAnswer.length);
                  matchPercentage = maxLength > 0 ? Math.max(0, Math.round((1 - distance / maxLength) * 100)) : 0;
                  
                  // Calculate score based on percentage
                  earnedScore = Math.round((matchPercentage / 100 * questionInfo.score) * 10) / 10;
                  
                  // Determine status - 降低阈值，更宽松的判断
                  if (matchPercentage >= 90) {
                      status = 'correct';
                      isCorrect = true;
                  } else if (matchPercentage >= 50) {
                      status = 'partial';
                      isCorrect = false;
                  } else {
                      status = 'wrong';
                      isCorrect = false;
                  }
              }
              
              // 不在这里 push results，统一在最后处理
          } else {
              // Standard comparison for other types (e.g., choice)
              if (normalizedUserAnswer === normalizedCorrectAnswer && normalizedUserAnswer !== '') {
                  status = 'correct';
                  isCorrect = true;
                  earnedScore = questionInfo.score;
              } else {
                  status = 'wrong';
                  isCorrect = false;
                  earnedScore = 0;
              }
          }
      }

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
        status: status // Add status field
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
