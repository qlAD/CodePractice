import { codeCompareTokens, normalizeCodeCompareSnippet } from '@/lib/code-compare'
import type { QuestionType } from '@/lib/types'

export type GradeStatus = 'correct' | 'partial' | 'wrong'

export type PracticeGradeResult = {
  isCorrect: boolean
  status: GradeStatus
  earnedScore: number
  formattedCorrectAnswer: string
  matchPercentage?: number
}

function levenshteinSeq(a: string[], b: string[]): number {
  const m = a.length
  const n = b.length
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array<number>(n + 1).fill(0))
  for (let i = 0; i <= m; i++) dp[i]![0] = i
  for (let j = 0; j <= n; j++) dp[0]![j] = j
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      dp[i]![j] = Math.min(
        dp[i - 1]![j - 1]! + cost,
        dp[i - 1]![j]! + 1,
        dp[i]![j - 1]! + 1
      )
    }
  }
  return dp[m]![n]!
}

function tokenSimilarity(userSrc: string, refSrc: string): number {
  const ut = codeCompareTokens(userSrc)
  const rt = codeCompareTokens(refSrc)
  if (ut.length === 0 && rt.length === 0) return 100
  if (ut.length === 0 || rt.length === 0) return 0
  const dist = levenshteinSeq(ut, rt)
  const denom = Math.max(ut.length, rt.length)
  return Math.max(0, Math.round((1 - dist / denom) * 100))
}

function bestAlternativeSimilarity(userSrc: string, alternatives: string[]): number {
  let best = 0
  for (const alt of alternatives) {
    const sim = tokenSimilarity(userSrc, alt)
    if (sim > best) best = sim
    if (best === 100) break
  }
  return best
}

function normalizeChoiceAnswer(str: string): string {
  return str
    .normalize('NFKC')
    .trim()
    .replace(/\r\n/g, '\n')
    .replace(/\s+$/gm, '')
    .replace(/\s+/g, ' ')
}

function choiceMatches(user: string, correct: string): boolean {
  const u = normalizeChoiceAnswer(user)
  const c = normalizeChoiceAnswer(correct)
  if (u === c && u !== '') return true
  if (
    u.length === 1 &&
    c.length === 1 &&
    /[A-Za-z]/.test(u) &&
    /[A-Za-z]/.test(c) &&
    u.toLowerCase() === c.toLowerCase()
  ) {
    return true
  }
  return false
}

function parseStoredAnswers(answerStr: string): string[][] {
  if (answerStr.includes('=======(答案')) {
    const parts = answerStr.split(/=======\(答案\d+\)=======/)
    const blanks = parts.map((p) => p.trim()).filter((p) => p.length > 0)
    return blanks.map((blank) => {
      if (blank.includes('=========或=========')) {
        return blank.split('=========或=========').map((alt) => alt.trim())
      }
      return [blank]
    })
  }

  const numberedListPattern = /(?:^|\n)\d+\.\s/
  if (numberedListPattern.test(answerStr)) {
    const parts = answerStr.split(/(?:^|\n)\d+\.\s/)
    const blanks = parts.map((p) => p.trim()).filter((p) => p.length > 0)
    return blanks.map((blank) => {
      if (blank.includes('=========或=========')) {
        return blank.split('=========或=========').map((alt) => alt.trim())
      }
      return [blank]
    })
  }

  if (answerStr.includes('=========或=========')) {
    return [answerStr.split('=========或=========').map((p) => p.trim())]
  }
  return [[answerStr]]
}

const FILL_HINT_SPLIT = /【\s*[?\uFF1F]\s*】/

function collapseFillWhitespace(s: string): string {
  return s.replace(/\s+/g, ' ').trim()
}

function looksLikeUnfilledHint(s: string): boolean {
  return /^【\s*[?\uFF1F]\s*】$/.test(s.trim())
}

function extractFillBlankAnswers(userCode: string, template: string): string[] {
  const markerRegex = /\/\*+SPACE\*+\//g
  const templateMatches = Array.from(template.matchAll(markerRegex))
  const userMatches = Array.from(userCode.matchAll(markerRegex))
  if (templateMatches.length === 0) return []

  const answers: string[] = []
  for (let i = 0; i < templateMatches.length; i++) {
    if (i >= userMatches.length) break

    const templateStart = templateMatches[i].index! + templateMatches[i][0].length
    const templateEnd =
      i + 1 < templateMatches.length ? templateMatches[i + 1].index! : template.length
    const templateLine = template.substring(templateStart, templateEnd).trim().split('\n')[0]!

    const userStart = userMatches[i].index! + userMatches[i][0].length
    const userEnd = i + 1 < userMatches.length ? userMatches[i + 1].index! : userCode.length
    const userLine = userCode.substring(userStart, userEnd).trim().split('\n')[0]!

    const parts = templateLine.split(FILL_HINT_SPLIT)
    if (parts.length !== 2) continue

    const [prefix, suffix] = parts
    const u = collapseFillWhitespace(userLine)
    const pref = collapseFillWhitespace(prefix)
    const suff = collapseFillWhitespace(suffix)

    let extracted: string | null = null

    if (pref === '' && suff === '') {
      extracted = u
    } else if (pref === '') {
      const si = u.lastIndexOf(suff)
      if (si !== -1) extracted = u.slice(0, si).trim()
    } else {
      const pi = u.indexOf(pref)
      if (pi === -1) {
        extracted = null
      } else if (suff === '') {
        extracted = u.slice(pi + pref.length).trim()
      } else {
        const afterPref = pi + pref.length
        const si = u.lastIndexOf(suff)
        if (si !== -1 && si >= afterPref) {
          extracted = u.slice(afterPref, si).trim()
        }
      }
    }

    if (extracted !== null) {
      answers.push(looksLikeUnfilledHint(extracted) ? '' : extracted)
    } else {
      answers.push(userLine)
    }
  }
  return answers
}

function extractErrorFixAnswers(userCode: string): string[] {
  const markerRegex = /\/\*+FOUND\*+\//g
  const matches = Array.from(userCode.matchAll(markerRegex))
  if (matches.length === 0) return []

  const answers: string[] = []
  for (let i = 0; i < matches.length; i++) {
    const start = matches[i].index! + matches[i][0].length
    const end = i + 1 < matches.length ? matches[i + 1].index! : userCode.length
    const line = userCode.substring(start, end).trim().split('\n')[0]!
    answers.push(line)
  }
  return answers
}

const PROGRAM_REGION =
  /\/\*+Program\*+\/\s*([\s\S]*?)\s*\/\*+\s*End\s*\*+\//

function formatStoredAnswersDisplay(stored: string[][]): string {
  return stored
    .map((alternatives, i) => `${i + 1}. ${alternatives.join(' 或 ')}`)
    .join('\n')
}

export function evaluatePracticeAnswer(input: {
  type: QuestionType
  userAnswer: string
  storedAnswer: string
  codeTemplate: string | null
  maxScore: number
}): PracticeGradeResult {
  const { type, userAnswer, storedAnswer, codeTemplate, maxScore } = input
  let formattedCorrectAnswer = storedAnswer
  let isCorrect = false
  let status: GradeStatus = 'wrong'
  let earnedScore = 0
  let matchPercentage: number | undefined

  if (type === 'fill_blank' || type === 'error_fix') {
    const stored = parseStoredAnswers(storedAnswer)
    if (stored.length > 0) {
      formattedCorrectAnswer = formatStoredAnswersDisplay(stored)
    }

    const extracted =
      type === 'fill_blank'
        ? extractFillBlankAnswers(userAnswer, codeTemplate || '')
        : extractErrorFixAnswers(userAnswer)

    if (stored.length > 0) {
      const CLOSE_ENOUGH = 85

      let correctParts = 0
      stored.forEach((alternatives, index) => {
        if (index < extracted.length) {
          const userNorm = normalizeCodeCompareSnippet(extracted[index]!)
          const exact = alternatives.some(
            (alt) => normalizeCodeCompareSnippet(alt) === userNorm
          )
          if (exact) {
            correctParts++
          } else {
            const sim = bestAlternativeSimilarity(extracted[index]!, alternatives)
            if (sim >= CLOSE_ENOUGH) correctParts++
          }
        }
      })

      const partScore = maxScore / stored.length
      earnedScore = Math.round(correctParts * partScore * 10) / 10
      matchPercentage = Math.round((correctParts / stored.length) * 100)

      if (correctParts === stored.length) {
        status = 'correct'
        isCorrect = true
        earnedScore = maxScore
      } else if (correctParts > 0) {
        status = 'partial'
        isCorrect = false
      }
    } else {
      status = 'correct'
      isCorrect = true
      earnedScore = maxScore
    }
  } else if (type === 'programming') {
    const m = userAnswer.match(PROGRAM_REGION)
    const userCode = m ? m[1]! : userAnswer
    const userTok = codeCompareTokens(userCode)
    const refTok = codeCompareTokens(storedAnswer)

    formattedCorrectAnswer = storedAnswer

    if (refTok.length === 0) {
      status = 'correct'
      isCorrect = true
      earnedScore = maxScore
      matchPercentage = 100
    } else if (userTok.length === 0) {
      status = 'wrong'
      earnedScore = 0
      matchPercentage = 0
    } else {
      const dist = levenshteinSeq(userTok, refTok)
      const denom = Math.max(userTok.length, refTok.length)
      matchPercentage = Math.max(0, Math.round((1 - dist / denom) * 100))
      earnedScore = Math.round((matchPercentage / 100) * maxScore * 10) / 10

      if (dist === 0) {
        status = 'correct'
        isCorrect = true
      } else if (matchPercentage >= 90) {
        status = 'correct'
        isCorrect = true
      } else if (matchPercentage >= 50) {
        status = 'partial'
      }
    }
  } else {
    formattedCorrectAnswer = storedAnswer
    if (choiceMatches(userAnswer, storedAnswer)) {
      status = 'correct'
      isCorrect = true
      earnedScore = maxScore
    }
  }

  const out: PracticeGradeResult = {
    isCorrect,
    status,
    earnedScore,
    formattedCorrectAnswer,
  }
  if (matchPercentage !== undefined) out.matchPercentage = matchPercentage
  return out
}
