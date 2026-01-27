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
import { Code2, BookOpen, BarChart3, Loader2 } from 'lucide-react'

export default function LoginPage() {
  const [studentId, setStudentId] = useState('')
  const [password, setPassword] = useState('')
  const [keepLoggedIn, setKeepLoggedIn] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
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
    <div className="min-h-screen bg-background flex">
      {/* 左侧 - 品牌展示 */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 bg-card border-r border-border">
        <div>
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Code2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">CodePractice</span>
          </div>
          
          <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">
            多语言程序设计在线练习平台
          </h1>
          <p className="text-lg text-muted-foreground mb-12 text-pretty leading-relaxed">
            支持 Java、C/C++、Python 三种语言的在线练习，包含单选题、程序填空题、程序改错题、程序设计题四种题型。
          </p>
          
          <div className="space-y-6">
            <FeatureItem 
              icon={<BookOpen className="w-5 h-5" />}
              title="丰富题库"
              description="覆盖三种语言的核心知识点"
            />
            <FeatureItem 
              icon={<Code2 className="w-5 h-5" />}
              title="在线编程"
              description="支持语法高亮和代码运行"
            />
            <FeatureItem 
              icon={<BarChart3 className="w-5 h-5" />}
              title="学习分析"
              description="详细的答题数据统计与分析"
            />
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground">
          请使用学号和密码登录
        </p>
      </div>
      
      {/* 右侧 - 登录表单 */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <Card className="w-full max-w-md bg-card border-border">
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-3 mb-4 lg:hidden">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Code2 className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold text-foreground">CodePractice</span>
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">学生登录</CardTitle>
            <CardDescription className="text-muted-foreground">
              使用学号和密码登录系统
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="studentId" className="text-foreground">学号</Label>
                <Input
                  id="studentId"
                  type="text"
                  placeholder="请输入学号"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  required
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">密码</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="请输入密码"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="keepLoggedIn"
                    checked={keepLoggedIn}
                    onCheckedChange={(checked) => setKeepLoggedIn(checked === true)}
                  />
                  <Label htmlFor="keepLoggedIn" className="text-sm text-muted-foreground cursor-pointer">
                    保持登录
                  </Label>
                </div>
                <Button variant="link" className="px-0 text-primary hover:text-primary/80" type="button" onClick={() => setError('请联系管理员（qlAD）或专任教师修改')}>
                  忘记密码？
                </Button>
              </div>
              
              {error && (
                <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
                  {error}
                </div>
              )}
              
              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    登录中...
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
  )
}

function FeatureItem({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-primary shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="font-medium text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
