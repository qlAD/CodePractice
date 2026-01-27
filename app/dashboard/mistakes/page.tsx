'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import type { Language, QuestionType, WrongAnswer, Question } from '@/lib/types'
import { cn } from '@/lib/utils'
import {
  BookX,
  RefreshCw,
  CheckCircle2,
  Eye,
  Trash2,
  Filter,
  Code2,
  Target,
  FileCode,
  BookOpen,
  ChevronDown,
  ChevronUp,
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

const languageConfig = {
  java: { name: 'Java', color: 'bg-java' },
  cpp: { name: 'C/C++', color: 'bg-cpp' },
  python: { name: 'Python', color: 'bg-python' },
}

const statusConfig = {
  pending: { label: '待复习', color: 'bg-destructive/20 text-destructive' },
  reviewing: { label: '复习中', color: 'bg-warning/20 text-warning' },
  mastered: { label: '已掌握', color: 'bg-success/20 text-success' },
}

const typeLabels = {
  single_choice: '单选题',
  fill_blank: '程序填空',
  error_fix: '程序改错',
  programming: '程序设计',
}

const difficultyConfig = {
  easy: { label: '简单', color: 'bg-success/20 text-success' },
  medium: { label: '中等', color: 'bg-warning/20 text-warning' },
  hard: { label: '困难', color: 'bg-destructive/20 text-destructive' },
}

interface WrongAnswerWithQuestion extends WrongAnswer {
  question: Question
}

export default function WrongAnswersPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [wrongAnswers, setWrongAnswers] = useState<WrongAnswerWithQuestion[]>([])
  const [counts, setCounts] = useState({ pending: 0, reviewing: 0, mastered: 0 })
  const [isLoading, setIsLoading] = useState(true)
  const [filterLanguage, setFilterLanguage] = useState<string>('all')
  const [filterType, setFilterType] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('pending')
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [showPracticeConfirm, setShowPracticeConfirm] = useState(false)
  const [filteredCount, setFilteredCount] = useState(0)

  const handleStartWrongAnswerPractice = () => {
    // 根据当前筛选条件统计需要练习的错题数量
    const practiceCount = wrongAnswers.filter(wa => {
      // 如果用户筛选了状态，使用筛选的状态；否则默认只包含待复习和复习中
      if (filterStatus !== 'all') {
        return wa.status === filterStatus
      } else {
        return wa.status === 'pending' || wa.status === 'reviewing'
      }
    }).length
    setFilteredCount(practiceCount)
    setShowPracticeConfirm(true)
  }

  const handleConfirmPractice = () => {
    setShowPracticeConfirm(false)
    
    // 构建带筛选参数的 URL
    const params = new URLSearchParams()
    params.set('mode', 'wrong_answers')
    
    if (filterLanguage !== 'all') {
      params.set('language', filterLanguage)
    }
    if (filterType !== 'all') {
      params.append('type', filterType)
    }
    if (filterStatus !== 'all') {
      params.set('status', filterStatus)
    }
    
    router.push(`/dashboard/practice/session?${params.toString()}`)
  }

  const handleRetryQuestion = (questionId: number) => {
    router.push(`/dashboard/practice/session?mode=single&question_id=${questionId}&from=wrong-answers`)
  }

  useEffect(() => {
    const fetchWrongAnswers = async () => {
      if (!user?.student_id) {
        setIsLoading(false)
        return
      }

      try {
        const params = new URLSearchParams()
        params.set('student_id', user.student_id)
        if (filterLanguage !== 'all') params.set('language', filterLanguage)
        if (filterType !== 'all') params.set('type', filterType)
        if (filterStatus !== 'all') params.set('status', filterStatus)

        const response = await fetch(`/api/mistakes?${params.toString()}`)
        const data = await response.json()
        if (data.success) {
          setWrongAnswers(data.data || [])
          setCounts(data.counts || { pending: 0, reviewing: 0, mastered: 0 })
        }
      } catch (error) {
        console.error('Failed to fetch wrong answers:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchWrongAnswers()
  }, [user?.student_id, filterLanguage, filterType, filterStatus])

  // 监听统计数据更新事件
  useEffect(() => {
    const handleWrongAnswersStatsUpdate = (event: CustomEvent) => {
      setCounts(event.detail)
    }

    window.addEventListener('wrongAnswersStatsUpdated', handleWrongAnswersStatsUpdate as EventListener)
    
    return () => {
      window.removeEventListener('wrongAnswersStatsUpdated', handleWrongAnswersStatsUpdate as EventListener)
    }
  }, [])

  const filteredWrongAnswers = wrongAnswers

  const pendingCount = counts.pending
  const reviewingCount = counts.reviewing
  const masteredCount = counts.mastered

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">错题本</h1>
            <p className="text-muted-foreground mt-1">复习和巩固你的错题</p>
          </div>
          <Button onClick={handleStartWrongAnswerPractice} className="bg-primary text-primary-foreground">
            <RefreshCw className="w-4 h-4 mr-2" />
            开始错题练习
          </Button>
        </div>

      {/* Stats overview */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-destructive/20 flex items-center justify-center">
                <BookX className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{pendingCount}</div>
                <div className="text-xs text-muted-foreground">待复习</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-warning/20 flex items-center justify-center">
                <RefreshCw className="w-5 h-5 text-warning" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{reviewingCount}</div>
                <div className="text-xs text-muted-foreground">复习中</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-success" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{masteredCount}</div>
                <div className="text-xs text-muted-foreground">已掌握</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">筛选：</span>
              </div>
              <div className="flex flex-wrap gap-3">
                <Select value={filterLanguage} onValueChange={setFilterLanguage}>
                  <SelectTrigger className="w-32 bg-input border-border">
                    <SelectValue placeholder="语言" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部语言</SelectItem>
                    <SelectItem value="java">Java</SelectItem>
                    <SelectItem value="cpp">C/C++</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-32 bg-input border-border">
                    <SelectValue placeholder="题型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部题型</SelectItem>
                    <SelectItem value="single_choice">单选题</SelectItem>
                    <SelectItem value="fill_blank">程序填空</SelectItem>
                    <SelectItem value="error_fix">程序改错</SelectItem>
                    <SelectItem value="programming">程序设计</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-32 bg-input border-border">
                    <SelectValue placeholder="状态" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部状态</SelectItem>
                    <SelectItem value="pending">待复习</SelectItem>
                    <SelectItem value="reviewing">复习中</SelectItem>
                    <SelectItem value="mastered">已掌握</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              共 <span className="font-semibold text-foreground">{wrongAnswers.length}</span> 条记录
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Wrong answers list */}
      <div className="space-y-4">
        {filteredWrongAnswers.length === 0 ? (
          <Card className="bg-card border-border">
            <CardContent className="py-12 text-center">
              <CheckCircle2 className="w-12 h-12 text-success mx-auto mb-4" />
              <p className="text-foreground font-medium">没有符合条件的错题</p>
              <p className="text-sm text-muted-foreground mt-1">继续保持，你做得很好！</p>
            </CardContent>
          </Card>
        ) : (
          filteredWrongAnswers.map((wa) => (
            <Card key={wa.id} className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <Badge className={cn('text-xs', statusConfig[wa.status].color)}>
                        {statusConfig[wa.status].label}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {typeLabels[wa.question.type]}
                      </Badge>
                      <Badge className={cn('text-xs', difficultyConfig[wa.question.difficulty].color)}>
                        {difficultyConfig[wa.question.difficulty].label}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {languageConfig[wa.question.language].name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        错误 {wa.wrong_count} 次
                      </span>
                    </div>

                    <p className="text-foreground mb-2 line-clamp-2">
                      {wa.question.content}
                    </p>

                    {expandedId === wa.id && (
                      <div className="mt-4 space-y-4 animate-in slide-in-from-top-2">
                        {wa.question.code_template && (
                          <div className="rounded-lg bg-secondary/50 p-4">
                            <pre className="text-sm font-mono text-foreground whitespace-pre-wrap">
                              {wa.question.code_template}
                            </pre>
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30">
                            <span className="text-xs text-muted-foreground block mb-1">你的答案</span>
                            <span className="text-sm font-mono text-destructive">{wa.wrong_answer}</span>
                          </div>
                          <div className="p-3 rounded-lg bg-success/10 border border-success/30">
                            <span className="text-xs text-muted-foreground block mb-1">正确答案</span>
                            <span className="text-sm font-mono text-success">{wa.question.answer}</span>
                          </div>
                        </div>

                      </div>
                    )}
                  </div>

                  <div className="flex lg:flex-col gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setExpandedId(expandedId === wa.id ? null : wa.id)}
                      className="gap-1"
                    >
                      <Eye className="w-4 h-4" />
                      {expandedId === wa.id ? (
                        <>
                          收起
                          <ChevronUp className="w-3 h-3" />
                        </>
                      ) : (
                        <>
                          详情
                          <ChevronDown className="w-3 h-3" />
                        </>
                      )}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleRetryQuestion(wa.question.id)} className="gap-1">
                      <RefreshCw className="w-4 h-4" />
                      重做
                    </Button>
                    {wa.status === 'mastered' && (
                      <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground">
                        <Trash2 className="w-4 h-4" />
                        移除
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* 错题练习确认对话框 */}
      <AlertDialog open={showPracticeConfirm} onOpenChange={setShowPracticeConfirm}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">确认开始错题练习</AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              您当前筛选了 {filteredCount} 道错题需要练习（包含待复习和复习中状态）。
              {filteredCount === 0 && (
                <span className="text-warning block mt-2">
                  当前没有需要练习的错题，请调整筛选条件或等待新的错题产生。
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel 
              onClick={() => setShowPracticeConfirm(false)}
              className="bg-secondary text-secondary-foreground"
            >
              取消
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmPractice}
              disabled={filteredCount === 0}
              className="bg-primary text-primary-foreground"
            >
              开始练习
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
