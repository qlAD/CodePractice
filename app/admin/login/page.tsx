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
    } catch (error) {
      setError('登录失败，请稍后重试')
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-xl bg-accent/20 flex items-center justify-center mb-4">
              <Settings className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">教师管理端</h1>
            <p className="text-muted-foreground mt-2">CodePractice 后台管理系统</p>
          </div>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-lg">教师登录</CardTitle>
              <CardDescription>请使用管理员分配的账号登录</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
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
                    className="bg-input border-border"
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
                      className="bg-input border-border pr-10"
                      autoComplete="current-password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      登录中...
                    </>
                  ) : (
                    '登录'
                  )}
                </Button>
              </form>

              
            </CardContent>
          </Card>

          <div className="text-center">
            <Link href="/login" className="text-sm text-muted-foreground hover:text-primary">
              学生端登录
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
