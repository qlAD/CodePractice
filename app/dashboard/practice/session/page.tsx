'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import { QuestionDisplay } from '@/components/practice/question-display'
import type { Question, Language, QuestionType } from '@/lib/types'
import { cn } from '@/lib/utils'
import { useAuth } from '@/lib/auth-context'
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Flag,
  AlertCircle,
  X,
  Loader2,
} from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

// 提交结果类型
interface SubmitResult {
  question_id: number
  is_correct: boolean
  correct_answer: string
  score: number
  status?: string
  match_percentage?: number
}

export default function PracticeSessionPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useAuth()

  const mode = searchParams.get('mode') || 'language'
  const language = searchParams.get('language') as Language | null
  const chapters = React.useMemo(() => {
    return searchParams.getAll('chapter')
  }, [searchParams])
  const chapter = chapters.length > 0 ? chapters[0] : null
  const fromWrongAnswers = searchParams.get('from') === 'wrong-answers'
  const questionId = searchParams.get('question_id')
  const filterStatus = searchParams.get('status')
  const types = React.useMemo(() => {
    return searchParams.getAll('type') as QuestionType[]
  }, [searchParams])
  const filterType = types.length > 0 ? types[0] : null

  const [practiceQuestions, setPracticeQuestions] = useState<Question[]>([])
  const [optionOrderMap, setOptionOrderMap] = useState<Record<number, number[]>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [practiceId, setPracticeId] = useState<number | null>(null)
  const [submitResults, setSubmitResults] = useState<Record<number, SubmitResult>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 重做错题后刷新统计数据
  const refreshWrongAnswersStats = async () => {
    try {
      const response = await fetch(`/api/mistakes?student_id=${user?.student_id}`)
      const data = await response.json()
      if (data.success) {
        // 发送自定义事件通知错题本页面刷新统计数据
        window.dispatchEvent(new CustomEvent('wrongAnswersStatsUpdated', {
          detail: data.counts || { pending: 0, reviewing: 0, mastered: 0 }
        }))
      }
    } catch (error) {
      console.error('Failed to refresh wrong answers stats:', error)
    }
  }

  // Fetch questions from API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const questionId = searchParams.get('question_id')
        
          const buildOptionOrderMap = (questions: Question[]) => {
            const baseIndices = [0, 1, 2, 3]
            const map: Record<number, number[]> = {}
            questions.forEach((q) => {
              if (q.type === 'single_choice' && q.options && q.options.length > 1) {
                const indices = baseIndices.slice(0, q.options.length)
                for (let i = indices.length - 1; i > 0; i--) {
                  const j = Math.floor(Math.random() * (i + 1))
                  ;[indices[i], indices[j]] = [indices[j], indices[i]]
                }
                map[q.id] = indices
              }
            })
            setOptionOrderMap(map)
          }

          if (mode === 'single' && questionId) {
          // 单个题目练习
          const response = await fetch(`/api/questions/${questionId}`)
          const data = await response.json()
          
          if (data.success && data.data) {
            const questions = [data.data as Question]
            setPracticeQuestions(questions)
            buildOptionOrderMap(questions)
          } else {
            setError('题目不存在')
          }
        } else if (mode === 'wrong_answers') {
          // 错题练习 - 根据筛选条件获取错题
          const params = new URLSearchParams()
          params.set('student_id', user?.student_id || '')
          
          // 如果有筛选状态，使用筛选的状态；否则默认获取待复习和复习中的
          if (filterStatus && filterStatus !== 'all') {
            params.set('status', filterStatus)
          } else {
            params.set('status', 'pending,reviewing')
          }
          
          if (language) {
            params.set('language', language)
          }
          if (filterType) {
            params.set('type', filterType)
          }
          
          const response = await fetch(`/api/mistakes?${params.toString()}`)
          const data = await response.json()
          
          if (data.success && data.data && data.data.length > 0) {
            const questions = data.data.map((wa: any) => wa.question as Question)
            setPracticeQuestions(questions)
            buildOptionOrderMap(questions)
          } else {
            setError('没有错题需要练习')
          }
        } else {
          // 常规练习模式
          const params = new URLSearchParams()
          params.set('mode', mode)
          params.set('count', mode === 'exam' ? '40' : '10')

          if (language) {
            params.set('language', language)
          }
          if (types && types.length > 0) {
            types.forEach(type => {
              params.append('type', type)
            })
          }
          if (chapters.length > 0) {
            chapters.forEach(chapter => {
              params.append('chapter_id', chapter)
            })
          }

          const response = await fetch(`/api/practice?${params.toString()}`)
          const data = await response.json()

          if (data.success && data.data && data.data.length > 0) {
            const questions = data.data as Question[]
            setPracticeQuestions(questions)
            buildOptionOrderMap(questions)
          } else {
            setError('没有找到符合条件的题目')
          }
        }
      } catch (err) {
        console.error('Failed to fetch questions:', err)
        setError('获取题目失败，请稍后重试')
      } finally {
        setIsLoading(false)
      }
    }

    fetchQuestions()
  }, [mode, language, types, chapters, searchParams, filterStatus, filterType])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [markedQuestions, setMarkedQuestions] = useState<Set<number>>(new Set())
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showSubmitDialog, setShowSubmitDialog] = useState(false)
  const [showExitDialog, setShowExitDialog] = useState(false)
  const [timeLeft, setTimeLeft] = useState(mode === 'exam' ? 60 * 60 : 0) // 60 minutes for exam

  const currentQuestion = practiceQuestions[currentIndex]
  const answeredCount = Object.keys(answers).length
  const progress = (answeredCount / practiceQuestions.length) * 100

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  const handleAnswerChange = useCallback((answer: string) => {
    if (!currentQuestion || isSubmitted) return
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: answer }))
  }, [currentQuestion, isSubmitted])

  const handleToggleMark = useCallback(() => {
    if (!currentQuestion) return
    setMarkedQuestions((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(currentQuestion.id)) {
        newSet.delete(currentQuestion.id)
      } else {
        newSet.add(currentQuestion.id)
      }
      return newSet
    })
  }, [currentQuestion])

  const handleSubmit = async () => {
    setShowSubmitDialog(false)
    setIsSubmitting(true)

    try {
      // 提交所有答案到服务器进行批量验证
      const response = await fetch('/api/practice/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_id: user?.student_id,
          mode,
          language,
          question_type: types?.join(','),
          question_types: types,
          chapter_id: chapters.join(','),
          answers: Object.entries(answers).map(([questionId, answer]) => ({
            question_id: Number(questionId),
            answer,
          })),
          question_ids: practiceQuestions.map(q => q.id),
        }),
      })

      const data = await response.json()
      if (data.success) {
        // 保存服务器返回的验证结果
        const resultsMap: Record<number, SubmitResult> = {}
        data.data.results.forEach((r: SubmitResult) => {
          resultsMap[r.question_id] = r
        })
        setSubmitResults(resultsMap)
        setPracticeId(data.data.practice_id)

        // 如果是从错题本重做，刷新统计数据
        if (fromWrongAnswers) {
          await refreshWrongAnswersStats()
        }
      }
    } catch (err) {
      console.error('Failed to submit practice:', err)
    } finally {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }
  }

  // 自动提交的ref，避免timer中的闭包问题
  const autoSubmitRef = React.useRef<(() => void) | undefined>(undefined)
  autoSubmitRef.current = handleSubmit

  // Timer for exam mode
  useEffect(() => {
    if (mode !== 'exam' || isSubmitted || isSubmitting) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          autoSubmitRef.current?.()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [mode, isSubmitted, isSubmitting])

  const handleExit = () => {
    router.push('/dashboard/practice')
  }

  const calculateScore = () => {
    // 使用服务器返回的验证结果
    let score = 0
    let correct = 0
    Object.values(submitResults).forEach((result) => {
      score += result.score
      if (result.is_correct) {
        correct++
      }
    })
    return { score, correct, total: practiceQuestions.length }
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary mx-auto mb-4 animate-spin" />
          <p className="text-muted-foreground">正在加载题目...</p>
        </div>
      </div>
    )
  }

  // Error or no questions state
  if (error || !currentQuestion) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">{error || '没有找到符合条件的题目'}</p>
          <Button
            variant="outline"
            onClick={() => router.push('/dashboard/practice')}
            className="mt-4"
          >
            返回选择
          </Button>
        </div>
      </div>
    )
  }

  const { score, correct, total } = calculateScore()

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 bg-background py-4 z-10">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowExitDialog(true)}
          >
            <X className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-foreground">
              {mode === 'exam' ? '模拟考试' : mode === 'wrong_answers' ? '错题练习' : '练习模式'}
            </h1>
            <p className="text-sm text-muted-foreground">
              {mode === 'wrong_answers' ? `复习错题，巩固薄弱环节${language ? ` - ${language.toUpperCase()}` : ''}${filterType ? ` - ${filterType}` : ''}` : 
                mode === 'exam' && language ? `${language.toUpperCase()} 模拟考试` :
                mode === 'chapter' && language && chapters.length > 0 ? `${language.toUpperCase()} 共 ${chapters.length} 章节` :
                chapters.length > 0 && language ? `${language.toUpperCase()} 共 ${chapters.length} 章节` :
                types.length > 0 && language ? `${language.toUpperCase()} 共 ${types.length} 种题型` :
                language ? `${language.toUpperCase()}` : ''
              }
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {mode === 'exam' && !isSubmitted && (
            <div className="flex items-center gap-2 text-foreground">
              <Clock className="w-5 h-5 text-primary" />
              <span className={cn(
                'font-mono text-lg font-semibold',
                timeLeft < 300 && 'text-destructive'
              )}>
                {formatTime(timeLeft)}
              </span>
            </div>
          )}
          
          {!isSubmitted ? (
            <Button
              onClick={() => setShowSubmitDialog(true)}
              className="bg-primary text-primary-foreground"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  提交中...
                </>
              ) : (
                '提交答案'
              )}
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={handleExit}
            >
              完成练习
            </Button>
          )}
        </div>
      </div>

      {/* Progress */}
      <Card className="bg-card border-border">
        <CardContent className="py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              已答 {answeredCount}/{practiceQuestions.length} 题
            </span>
            {isSubmitted && (
              <span className="text-sm font-semibold text-primary">
                得分：{score} 分 ({correct}/{total} 正确)
              </span>
            )}
          </div>
          <Progress value={progress} className="h-2" />
          
          {/* Question navigation dots */}
          <div className="flex flex-wrap gap-2 mt-4">
            {practiceQuestions.map((q, index) => {
              const isAnswered = !!answers[q.id]
              const isMarked = markedQuestions.has(q.id)
              const isCurrent = index === currentIndex
              const result = isSubmitted ? submitResults[q.id] : undefined
              const isCorrect = result?.is_correct
              const status = result?.status

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    'w-8 h-8 rounded-md text-xs font-medium transition-all relative',
                    isCurrent
                      ? 'bg-primary text-primary-foreground'
                      : isSubmitted
                        ? status === 'partial'
                          ? 'bg-warning/20 text-warning'
                          : status === 'correct'
                            ? 'bg-success/20 text-success'
                            : isAnswered || status === 'wrong'
                              ? 'bg-destructive/20 text-destructive'
                              : 'bg-secondary text-muted-foreground'
                        : isAnswered
                          ? 'bg-primary/20 text-primary'
                          : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                  )}
                >
                  {index + 1}
                  {isMarked && (
                    <Flag className="w-3 h-3 absolute -top-1 -right-1 text-warning fill-warning" />
                  )}
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Question display */}
      <QuestionDisplay
        question={{
          ...currentQuestion,
          answer: submitResults[currentQuestion.id]?.correct_answer || '',
        }}
        questionNumber={currentIndex + 1}
        totalQuestions={practiceQuestions.length}
        userAnswer={answers[currentQuestion.id] || ''}
        onAnswerChange={handleAnswerChange}
        showAnswer={isSubmitted}
        isSubmitted={isSubmitted}
        isMarked={markedQuestions.has(currentQuestion.id)}
        onToggleMark={handleToggleMark}
        isCorrect={submitResults[currentQuestion.id]?.is_correct}
        status={submitResults[currentQuestion.id]?.status}
        score={submitResults[currentQuestion.id]?.score}
        matchPercentage={submitResults[currentQuestion.id]?.match_percentage}
        optionOrder={optionOrderMap[currentQuestion.id]}
      />

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          上一题
        </Button>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {currentIndex + 1} / {practiceQuestions.length}
          </span>
        </div>

        <Button
          variant="outline"
          onClick={() =>
            setCurrentIndex((prev) =>
              Math.min(practiceQuestions.length - 1, prev + 1)
            )
          }
          disabled={currentIndex === practiceQuestions.length - 1}
        >
          下一题
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>

      {/* Submit dialog */}
      <AlertDialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">确认提交？</AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              你已完成 {answeredCount}/{practiceQuestions.length} 题。
              {answeredCount < practiceQuestions.length && (
                <span className="text-warning">
                  {' '}还有 {practiceQuestions.length - answeredCount} 题未作答。
                </span>
              )}
              {markedQuestions.size > 0 && (
                <span className="text-warning">
                  {' '}有 {markedQuestions.size} 题已标记待检查。
                </span>
              )}
              <br />
              提交后将无法修改答案。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-secondary text-secondary-foreground">
              继续作答
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleSubmit}
              className="bg-primary text-primary-foreground"
            >
              确认提交
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Exit dialog */}
      <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">确认退出？</AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              {isSubmitted
                ? '退出将返回练习选择页面。'
                : '退出将丢失当前答题进度，确定要退出吗？'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-secondary text-secondary-foreground">
              取消
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleExit}
              className="bg-destructive text-destructive-foreground"
            >
              确认退出
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
