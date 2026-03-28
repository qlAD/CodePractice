'use client'

import React from "react"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/lib/auth-context'
import { Code2, Eye, EyeOff, Loader2 } from 'lucide-react'

export default function LoginPage() {
  const [studentId, setStudentId] = useState('')
  const [password, setPassword] = useState('')
  const [keepLoggedIn, setKeepLoggedIn] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const success = await login(studentId, password, keepLoggedIn)
      if (success) {
        router.push('/dashboard')
      } else {
        setError('学号或密码错误')
      }
    } catch {
      setError('登录失败，请稍后重试')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-page-bg flex min-h-screen flex-col">
      <div className="grid flex-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,440px)]">
        <aside className="relative hidden flex-col justify-end border-border/70 p-10 lg:flex lg:border-r">
          <p className="font-display text-3xl font-semibold tracking-wide text-heading">CodePractice</p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            多语言程序设计在线练习 · 题库与判题一体化工作台
          </p>
          <div className="mt-12 h-px max-w-[200px] bg-gradient-to-r from-primary/50 to-transparent" />
        </aside>
        <div className="relative flex flex-col justify-center px-4 py-10 sm:px-8 lg:px-12">
        <div className="relative mx-auto w-full max-w-[400px]">
          <div className="mb-8 lg:text-left">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[var(--radius-sm)] border border-primary/30 bg-primary/15 text-primary shadow-card lg:mx-0 mx-auto">
              <Code2 className="h-7 w-7" aria-hidden />
            </div>
            <h1 className="text-center font-display text-xl font-semibold tracking-wide text-heading sm:text-2xl lg:text-left">
              学生登录
            </h1>
            <p className="mt-2 text-center text-sm text-muted-foreground lg:text-left">
              使用学号与密码进入练习系统
            </p>
          </div>

          <Card className="border-border/90 shadow-card transition-card hover:shadow-card-hover">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle>账号</CardTitle>
              <CardDescription>学号与密码由教务或任课教师发放</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="studentId" className="text-foreground">
                    学号
                  </Label>
                  <Input
                    id="studentId"
                    type="text"
                    placeholder="请输入学号"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    required
                    className="h-12 bg-background text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground">
                    密码
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="请输入密码"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-12 bg-background pr-11 text-base"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={showPassword ? '隐藏密码' : '显示密码'}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="keepLoggedIn"
                      checked={keepLoggedIn}
                      onCheckedChange={(checked) => setKeepLoggedIn(checked === true)}
                    />
                    <Label htmlFor="keepLoggedIn" className="cursor-pointer text-sm text-muted-foreground">
                      保持登录
                    </Label>
                  </div>
                  <Button
                    variant="link"
                    className="h-auto px-0 text-primary"
                    type="button"
                    onClick={() => setError('请联系管理员（乔林）或专任教师进行修改')}
                  >
                    忘记密码？
                  </Button>
                </div>

                {error && (
                  <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2.5 text-sm text-destructive">
                    {error}
                  </div>
                )}

                <Button type="submit" className="h-11 w-full text-base font-medium" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      登录中…
                    </>
                  ) : (
                    '登 录'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        </div>
      </div>

      <footer className="relative border-t border-border bg-card/80 py-4 text-center text-xs text-muted-foreground backdrop-blur-sm">
        <p>© {new Date().getFullYear()} 多语言程序设计在线练习平台</p>
        <p className="mt-1">大连东软信息学院 · 教学使用</p>
      </footer>
    </div>
  )
}
