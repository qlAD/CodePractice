'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useTeacherAuth } from '@/lib/teacher-auth-context'
import {
  Users,
  BookOpen,
  ClipboardList,
  TrendingUp,
  Activity,
  GraduationCap,
  FileQuestion,
  Clock,
  Loader2,
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface DashboardStats {
  overview: {
    students: number
    activeStudents: number
    teachers: number
    questions: number
    chapters: number
    todayPractices: number
    weekPractices: number
  }
  questionsByLanguage: Array<{ language: string; count: number }>
  questionsByType: Array<{ type: string; count: number }>
  recentStudents: Array<{ id: number; name: string; student_id: string; practice_count: number; last_practice_at: string | null }>
}

const languageColorMap: Record<string, string> = {
  java: 'bg-java',
  cpp: 'bg-cpp',
  python: 'bg-python',
}

const languageNameMap: Record<string, string> = {
  java: 'Java',
  cpp: 'C/C++',
  python: 'Python',
}

export default function AdminDashboardPage() {
  const { user } = useTeacherAuth()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/statistics')
        const data = await res.json()
        if (data.success) {
          setStats(data.data)
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="p-6 lg:p-8 flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  const overview = stats?.overview || { students: 0, activeStudents: 0, teachers: 0, questions: 0, chapters: 0, todayPractices: 0, weekPractices: 0 }
  const questionsByLanguage = stats?.questionsByLanguage || []
  const recentStudents = stats?.recentStudents || []
  const totalQuestions = questionsByLanguage.reduce((sum, l) => sum + l.count, 0)
  const languageStats = questionsByLanguage.map((lang) => ({
    language: languageNameMap[lang.language] || lang.language,
    count: lang.count,
    color: languageColorMap[lang.language] || 'bg-gray',
  }))
  const recentActivities = recentStudents.filter(student => student.practice_count > 0).map((student) => ({
    id: student.id,
    name: student.name,
    practice_count: student.practice_count,
    last_practice_at: student.last_practice_at,
  }))

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-foreground">控制台</h1>
        <p className="text-muted-foreground">
          欢迎回来, {user?.name}! 今天是 {new Date().toLocaleDateString('zh-CN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">学生总数</p>
                <p className="text-2xl font-bold text-foreground mt-1">{overview.students}</p>
                <p className="text-xs text-primary mt-1">
                  <span className="text-success">{overview.activeStudents}</span> 活跃
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">题库总量</p>
                <p className="text-2xl font-bold text-foreground mt-1">{overview.questions}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  共 {overview.chapters} 个章节
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <FileQuestion className="w-6 h-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">今日练习</p>
                <p className="text-2xl font-bold text-foreground mt-1">{overview.todayPractices}</p>
                <p className="text-xs text-muted-foreground mt-1">今日练习次数</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                <ClipboardList className="w-6 h-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">本周练习</p>
                <p className="text-2xl font-bold text-foreground mt-1">{overview.weekPractices}</p>
                <p className="text-xs text-muted-foreground mt-1">本周练习次数</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-chart-3/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-chart-3" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Language Stats */}
        <Card className="bg-card border-border lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">语言练习统计</CardTitle>
            <CardDescription>各语言学习情况概览</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {languageStats.map((lang) => (
                <div key={lang.language} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${lang.color}`} />
                      <span className="font-medium text-foreground">{lang.language}</span>
                    </div>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <span>{lang.count} 题目</span>
                      <span className="text-foreground font-medium">{lang.count}%</span>
                    </div>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className={`h-full ${lang.color} rounded-full transition-all`}
                      style={{ width: `${lang.count}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                共 {totalQuestions} 道题目
              </p>
              <Link href="/admin/questions">
                <Button variant="outline" size="sm">
                  管理题库
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              最近动态
            </CardTitle>
            <CardDescription>学生学习活动</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">
                      <span className="font-medium">{activity.name}</span>{' '}
                      <span className="text-muted-foreground">练习了 {activity.practice_count} 套题目</span>
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {activity.last_practice_at ? new Date(activity.last_practice_at).toLocaleString('zh-CN') : '-'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-border">
              <Link href="/admin/exercises">
                <Button variant="ghost" size="sm" className="w-full">
                  查看全部
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg">快捷操作</CardTitle>
          <CardDescription>常用管理功能</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Link href="/admin/students">
              <Button variant="outline" className="w-full h-auto py-4 flex flex-col gap-2 bg-transparent">
                <GraduationCap className="w-6 h-6 text-primary" />
                <span>添加学生</span>
              </Button>
            </Link>
            <Link href="/admin/questions">
              <Button variant="outline" className="w-full h-auto py-4 flex flex-col gap-2 bg-transparent">
                <BookOpen className="w-6 h-6 text-accent" />
                <span>添加题目</span>
              </Button>
            </Link>
            <Link href="/admin/exercises">
              <Button variant="outline" className="w-full h-auto py-4 flex flex-col gap-2 bg-transparent">
                <ClipboardList className="w-6 h-6 text-success" />
                <span>数据分析</span>
              </Button>
            </Link>
            <Link href="/admin/settings">
              <Button variant="outline" className="w-full h-auto py-4 flex flex-col gap-2 bg-transparent">
                <Activity className="w-6 h-6 text-chart-3" />
                <span>系统设置</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
