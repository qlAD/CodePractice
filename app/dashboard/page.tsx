'use client'

import React, { useState, useEffect } from "react"

import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'
import type { DBChapter } from '@/lib/db'
import type { StudentStats } from '@/lib/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import {
  BookOpen,
  Code2,
  FileCode,
  Target,
  TrendingUp,
  Clock,
  ArrowRight,
  CheckCircle2,
  XCircle,
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

export default function DashboardPage() {
  const { user } = useAuth()
  const [stats, setStats] = useState<StudentStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [papers, setPapers] = useState<DBChapter[]>([])
  const [papersLoading, setPapersLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const response = await fetch('/api/papers')
        const data = await response.json()
        if (!cancelled && data.success) {
          setPapers(data.data ?? [])
        }
      } catch (error) {
        console.error('Failed to fetch papers:', error)
      } finally {
        if (!cancelled) setPapersLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

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
    return <DashboardSkeleton />
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
      <div className="grid gap-4 border-b border-border/60 pb-4 sm:grid-cols-[1fr_auto] sm:items-end">
        <div className="min-w-0">
          <p className="font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
            学习中心
          </p>
          <h1 className="mt-1 font-display text-xl font-semibold tracking-wide text-heading sm:text-2xl">
            欢迎回来，{user?.name}
          </h1>
          <p className="mt-1 max-w-lg text-sm leading-relaxed text-muted-foreground">
            继续你的编程练习；左侧导航可进入题库、统计与错题本。
          </p>
        </div>
        <Link href="/dashboard/practice?mode=paper" className="shrink-0 sm:self-center">
          <Button size="lg" className="h-11 gap-2 px-8">
            开始练习
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="总答题数"
          value={displayStats.total_questions}
          icon={<BookOpen className="w-5 h-5" />}
          description="累计练习题目"
        />
        <StatsCard
          title="正确率"
          value={`${displayStats.accuracy_rate}%`}
          icon={<TrendingUp className="w-5 h-5" />}
          description="整体正确率"
          highlight
        />
        <StatsCard
          title="正确题数"
          value={displayStats.correct_count}
          icon={<CheckCircle2 className="w-5 h-5" />}
          description="答对的题目"
        />
        <StatsCard
          title="错题数"
          value={displayStats.total_questions - displayStats.correct_count}
          icon={<XCircle className="w-5 h-5" />}
          description="需要复习"
        />
      </div>

      {/* Main content grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Language progress */}
        <Card className="border-border shadow-card transition-card hover:shadow-card-hover">
          <CardHeader>
            <CardTitle className="text-foreground">各语言学习进度</CardTitle>
            <CardDescription>按编程语言统计答题情况</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {(Object.keys(displayStats.by_language) as Array<keyof typeof displayStats.by_language>).map((lang) => {
              const data = displayStats.by_language[lang]
              const config = languageConfig[lang]
              return (
                <div key={lang} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{config.icon}</span>
                      <span className="font-medium text-foreground">{config.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {data.correct}/{data.total} ({data.rate}%)
                    </span>
                  </div>
                  <Progress value={data.rate} className="h-2" />
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Question type progress */}
        <Card className="border-border shadow-card transition-card hover:shadow-card-hover">
          <CardHeader>
            <CardTitle className="text-foreground">各题型掌握情况</CardTitle>
            <CardDescription>按题目类型统计答题正确率</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {(Object.keys(displayStats.by_type) as Array<keyof typeof displayStats.by_type>).map((type) => {
              const data = displayStats.by_type[type]
              const config = questionTypeConfig[type]
              const Icon = config.icon
              return (
                <div key={type} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-foreground">{config.name}</span>
                      <span className="text-sm text-muted-foreground">{data.rate}%</span>
                    </div>
                    <Progress value={data.rate} className="h-1.5" />
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>

      {/* Quick practice */}
      <Card className="border-border shadow-card transition-card hover:shadow-card-hover">
        <CardHeader>
          <CardTitle className="text-foreground">快速开始</CardTitle>
          <CardDescription>选择一份试卷开始练习</CardDescription>
        </CardHeader>
        <CardContent>
          {papersLoading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-12 w-full rounded-lg" />
              ))}
            </div>
          ) : papers.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4">暂无试卷</p>
          ) : (
            <div className="divide-y divide-border border border-border rounded-lg overflow-hidden">
              {papers.map((p) => {
                const lang = languageConfig[p.language]
                return (
                  <Link
                    key={p.id}
                    href={`/dashboard/practice/session?mode=paper&language=${p.language}&paper=${p.id}`}
                    className="flex items-center justify-between gap-4 px-4 py-3 bg-secondary/30 hover:bg-secondary/60 transition-colors"
                  >
                    <span className="flex items-center gap-2 min-w-0">
                      <span className="text-lg shrink-0">{lang.icon}</span>
                      <span className="font-medium text-foreground truncate">{p.name}</span>
                    </span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
                  </Link>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent practice sessions */}
      <Card className="border-border shadow-card transition-card hover:shadow-card-hover">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-foreground">最近练习记录</CardTitle>
            <CardDescription>你的最近练习情况</CardDescription>
          </div>
          <Link href="/dashboard/statistics?tab=history">
              <Button variant="ghost" size="sm" className="text-primary">
              查看全部
              <ArrowRight className="ml-1 w-4 h-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {displayStats.recent_sessions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                还没有练习记录，开始你的第一次练习吧！
              </div>
            ) : (
              displayStats.recent_sessions.slice(0, 3).map((session) => (
                <div
                  key={session.id}
                  className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50"
                >
                  <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-foreground">
                        {session.mode === 'exam' ? '模拟考试' :
                         session.mode === 'language' && session.language ? `${languageConfig[session.language]?.name || session.language}练习` :
                         session.mode === 'type' && session.type ? `${questionTypeConfig[session.type]?.name || session.type}练习` :
                         '练习'}
                      </span>
                      {session.language && languageConfig[session.language] && (
                        <span className="text-xs px-2 py-0.5 rounded bg-secondary text-muted-foreground">
                          {languageConfig[session.language].name}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      答题 {session.total_questions} 道，正确 {session.correct_count} 道
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-primary">{session.score}分</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(session.started_at).toLocaleDateString('zh-CN')}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function StatsCard({
  title,
  value,
  icon,
  description,
  highlight,
}: {
  title: string
  value: string | number
  icon: React.ReactNode
  description: string
  highlight?: boolean
}) {
  return (
    <Card
      className={`transition-card border-border hover:shadow-card-hover ${highlight ? 'border-primary/35 ring-1 ring-primary/20' : ''}`}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className={`text-2xl font-bold tabular-nums mt-1 ${highlight ? 'text-primary' : 'text-foreground'}`}>{value}</p>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          </div>
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${highlight ? 'bg-primary/10' : 'bg-muted'}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-10 w-28" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
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

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-border shadow-card transition-card hover:shadow-card-hover">
          <CardHeader>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-2 w-full" />
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="border-border shadow-card transition-card hover:shadow-card-hover">
          <CardHeader>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="w-10 h-10 rounded-lg" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-1.5 w-full" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
