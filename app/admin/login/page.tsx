'use client'

import React from "react"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTeacherAuth } from '@/lib/teacher-auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Settings, Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function TeacherLoginPage() {
  const router = useRouter()
  const { login, isLoading } = useTeacherAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    if (!username || !password) {
      setError('请输入用户名和密码')
      setIsSubmitting(false)
      return
    }

    try {
      const result = await login(username, password)

      if (result.success) {
        if (result.needsPasswordChange) {
          router.push('/admin/change-password?first=true')
        } else {
          router.push('/admin')
        }
      } else {
        setError(result.error || '用户名或密码错误')
        setIsSubmitting(false)
      }
    } catch {
      setError('登录失败，请稍后重试')
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="app-shell flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="login-page-bg flex min-h-screen flex-col">
      <div className="grid flex-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,440px)]">
        <aside className="relative hidden flex-col justify-end border-border/70 p-10 lg:flex lg:border-r">
          <p className="font-display text-3xl font-semibold tracking-wide text-heading">教务控制台</p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            题库、练习、师生与系统配置 · 与课堂练习数据同一套设计语言
          </p>
          <div className="mt-12 h-px max-w-[200px] bg-gradient-to-r from-primary/50 to-transparent" />
        </aside>
        <div className="relative flex flex-col justify-center px-4 py-10 sm:px-8 lg:px-12">
          <div className="relative mx-auto w-full max-w-[400px]">
            <div className="mb-8 lg:text-left">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[var(--radius-sm)] border border-primary/30 bg-primary/15 text-primary shadow-card lg:mx-0 mx-auto">
                <Settings className="h-7 w-7" aria-hidden />
              </div>
              <h1 className="text-center font-display text-xl font-semibold tracking-wide text-heading sm:text-2xl lg:text-left">
                管理端登录
              </h1>
              <p className="mt-2 text-center text-sm text-muted-foreground lg:text-left">
                教师 / 管理员账号
              </p>
            </div>

            <Card className="border-border/90 shadow-card transition-card hover:shadow-card-hover">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle>登录</CardTitle>
              <CardDescription>请使用管理员分配的账号登录</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <Alert variant="destructive" className="border-destructive/40">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="username">用户名</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="请输入用户名"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="h-12 text-base"
                    autoComplete="username"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">密码</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="请输入密码"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 bg-background pr-10 text-base"
                      autoComplete="current-password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-12 w-10 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button type="submit" className="h-11 w-full text-base font-medium" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      登录中…
                    </>
                  ) : (
                    '登录'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

            <div className="mt-6 text-center lg:text-left">
              <Link href="/login" className="text-sm text-muted-foreground transition-ui hover:text-primary">
                学生端登录
              </Link>
            </div>
          </div>
        </div>
      </div>

      <footer className="relative border-t border-border bg-card/80 py-4 text-center text-xs text-muted-foreground backdrop-blur-sm">
        <p>© {new Date().getFullYear()} 多语言程序设计在线练习平台 · 管理端</p>
      </footer>
    </div>
  )
}
