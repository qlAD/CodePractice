'use client'

import React, { useState, useEffect } from "react"
import { useAuth } from '@/lib/auth-context'
import { useSearchParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import type { Language, QuestionType, StudentStats } from '@/lib/types'
import {
  BarChart3,
  TrendingUp,
  Target,
  BookOpen,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  Code2,
  FileCode,
} from 'lucide-react'

const languageConfig = {
  java: { name: 'Java', color: 'bg-java', icon: '☕' },
  cpp: { name: 'C/C++', color: 'bg-cpp', icon: '⚡' },
  python: { name: 'Python', color: 'bg-python', icon: '🐍' },
}

const questionTypeConfig = {
  single_choice: { name: '单选题', icon: Target },
  fill_blank: { name: '程序填空', icon: Code2 },
  error_fix: { name: '程序改错', icon: FileCode },
  programming: { name: '程序设计', icon: BookOpen },
}

export default function StatsPage() {
  const { user } = useAuth()
  const [stats, setStats] = useState<StudentStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState('all')
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab') || 'language'
  const router = useRouter()

  useEffect(() => {
    const fetchStats = async () => {
      if (!user?.student_id) {
        setIsLoading(false)
        return
      }

      try {
        const response = await fetch(`/api/statistics/student?student_id=${user.student_id}`)
        const data = await response.json()
        if (data.success) {
          setStats(data.data)
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [user?.student_id])

  if (isLoading) {
    return <StatsPageSkeleton />
  }

  const displayStats = stats || {
    total_questions: 0,
    correct_count: 0,
    accuracy_rate: 0,
    by_language: {
      java: { total: 0, correct: 0, rate: 0 },
      cpp: { total: 0, correct: 0, rate: 0 },
      python: { total: 0, correct: 0, rate: 0 },
    },
    by_type: {
      single_choice: { total: 0, correct: 0, rate: 0 },
      fill_blank: { total: 0, correct: 0, rate: 0 },
      error_fix: { total: 0, correct: 0, rate: 0 },
      programming: { total: 0, correct: 0, rate: 0 },
    },
    by_chapter: {},
    recent_sessions: [],
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">成绩统计</h1>
          <p className="text-muted-foreground mt-1">查看你的学习数据和进步情况</p>
        </div>
      </div>

      {/* Overview stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="总答题数"
          value={displayStats.total_questions}
          icon={<BookOpen className="w-5 h-5" />}
        />
        <StatCard
          title="正确率"
          value={`${displayStats.accuracy_rate}%`}
          icon={<TrendingUp className="w-5 h-5" />}
          highlight
        />
        <StatCard
          title="正确题数"
          value={displayStats.correct_count}
          icon={<CheckCircle2 className="w-5 h-5" />}
        />
        <StatCard
          title="错题数"
          value={displayStats.total_questions - displayStats.correct_count}
          icon={<XCircle className="w-5 h-5" />}
        />
      </div>

      <Tabs defaultValue={tab} className="space-y-6" onValueChange={(value) => {
        const url = new URL(window.location.href)
        url.searchParams.set('tab', value)
        router.replace(url.toString())
      }}>
        <TabsList className="h-auto flex-wrap justify-start gap-2 rounded-[var(--radius)] bg-muted/50 p-2">
          <TabsTrigger value="language" className="rounded-[var(--radius-sm)] data-[state=active]:border data-[state=active]:border-primary/20">
            按语言
          </TabsTrigger>
          <TabsTrigger value="type" className="rounded-[var(--radius-sm)] data-[state=active]:border data-[state=active]:border-primary/20">
            按题型
          </TabsTrigger>
          <TabsTrigger value="chapter" className="rounded-[var(--radius-sm)] data-[state=active]:border data-[state=active]:border-primary/20">
            按章节
          </TabsTrigger>
          <TabsTrigger value="history" className="rounded-[var(--radius-sm)] data-[state=active]:border data-[state=active]:border-primary/20">
            练习记录
          </TabsTrigger>
        </TabsList>

        {/* By language */}
        <TabsContent value="language" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {(Object.keys(displayStats.by_language) as Language[]).map((lang) => {
              const data = displayStats.by_language[lang]
              const config = languageConfig[lang]
              return (
                <Card key={lang} className="bg-card border-border">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-lg ${config.color} flex items-center justify-center`}>
                        <span className="text-2xl">{config.icon}</span>
                      </div>
                      <div>
                        <CardTitle className="text-foreground">{config.name}</CardTitle>
                        <CardDescription>编程语言</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">正确率</span>
                        <span className="font-semibold text-foreground">{data.rate}%</span>
                      </div>
                      <Progress value={data.rate} className="h-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="text-center p-3 rounded-lg bg-secondary/50">
                        <div className="text-2xl font-bold text-foreground">{data.total}</div>
                        <div className="text-xs text-muted-foreground">总题数</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-success/10">
                        <div className="text-2xl font-bold text-success">{data.correct}</div>
                        <div className="text-xs text-muted-foreground">正确数</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* By type */}
        <TabsContent value="type" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">各题型掌握情况</CardTitle>
              <CardDescription>按题目类型统计你的答题正确率</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {(Object.keys(displayStats.by_type) as QuestionType[]).map((type) => {
                const data = displayStats.by_type[type]
                const config = questionTypeConfig[type]
                const Icon = config.icon
                return (
                  <div key={type} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <span className="font-medium text-foreground">{config.name}</span>
                          <p className="text-xs text-muted-foreground">
                            答题 {data.total} 道，正确 {data.correct} 道
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xl font-bold text-foreground">{data.rate}%</span>
                      </div>
                    </div>
                    <Progress value={data.rate} className="h-2" />
                  </div>
                )
              })}
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">优势题型</CardTitle>
                <CardDescription>你掌握最好的题目类型</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-success/20 flex items-center justify-center">
                    <Target className="w-8 h-8 text-success" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">单选题</div>
                    <div className="text-sm text-muted-foreground">正确率 {displayStats.by_type.single_choice.rate}%</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">需加强题型</CardTitle>
                <CardDescription>建议多加练习的题目类型</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-warning/20 flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-warning" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">程序设计</div>
                    <div className="text-sm text-muted-foreground">正确率 {displayStats.by_type.programming.rate}%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* By chapter */}
        <TabsContent value="chapter" className="space-y-6">
          {Object.keys(displayStats.by_chapter).length === 0 ? (
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">章节掌握情况</CardTitle>
                <CardDescription>按知识点章节统计你的学习进度</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  暂无章节练习数据
                </div>
              </CardContent>
            </Card>
          ) : (
            Object.entries(displayStats.by_chapter).map(([language, chapters]) => {
              const config = languageConfig[language as Language];
              if (!config) return null;
              
              return (
                <Card key={language} className="bg-card border-border">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${config.color} flex items-center justify-center`}>
                        <span className="text-xl">{config.icon}</span>
                      </div>
                      <div>
                        <CardTitle className="text-foreground">{config.name}章节掌握情况</CardTitle>
                        <CardDescription>按知识点章节统计你的学习进度</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(chapters).map(([chapterName, data]) => (
                      <div key={chapterName} className="flex items-center gap-4 p-4 rounded-lg bg-secondary/30">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-foreground">
                              {chapterName}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>答题 {data.total} 道</span>
                            <span>正确 {data.correct} 道</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-foreground">{data.rate}%</div>
                          <div className="w-24">
                            <Progress value={data.rate} className="h-1.5" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              );
            })
          )}
        </TabsContent>

        {/* History */}
        <TabsContent value="history" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">练习记录</CardTitle>
              <CardDescription>查看你的历史练习记录</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {displayStats.recent_sessions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  暂无练习记录
                </div>
              ) : (
                displayStats.recent_sessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center gap-4 p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-foreground">
                          {session.mode === 'exam' ? '模拟考试' :
                           session.mode === 'language' && session.language && languageConfig[session.language] ? `${languageConfig[session.language].name}练习` :
                           session.mode === 'type' ? '题型练习' :
                           '练习'}
                        </span>
                        {session.language && languageConfig[session.language] && (
                          <span className="text-xs px-2 py-0.5 rounded bg-secondary text-muted-foreground">
                            {languageConfig[session.language].name}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3 h-3" />
                          {session.total_questions} 题
                        </span>
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-success" />
                          {session.correct_count} 正确
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(session.started_at).toLocaleString('zh-CN', {
                            month: 'numeric',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{session.score}</div>
                      <div className="text-xs text-muted-foreground">分</div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function StatCard({
  title,
  value,
  icon,
  highlight,
}: {
  title: string
  value: string | number
  icon: React.ReactNode
  highlight?: boolean
}) {
  return (
    <Card className={`bg-card border-border ${highlight ? 'border-primary/50' : ''}`}>
      <CardContent className="p-4 lg:p-6">
        <div className="flex items-center justify-between mb-2">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${highlight ? 'bg-primary/20 text-primary' : 'bg-secondary text-muted-foreground'}`}>
            {icon}
          </div>
        </div>
        <div className={`text-2xl lg:text-3xl font-bold ${highlight ? 'text-primary' : 'text-foreground'}`}>
          {value}
        </div>
        <div className="text-xs text-muted-foreground mt-1">{title}</div>
      </CardContent>
    </Card>
  )
}

function StatsPageSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-8 w-32 mb-2" />
        <Skeleton className="h-4 w-48" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="bg-card border-border">
            <CardContent className="p-4 lg:p-6">
              <Skeleton className="w-10 h-10 rounded-lg mb-2" />
              <Skeleton className="h-8 w-16 mb-1" />
              <Skeleton className="h-3 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-2 w-full" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
