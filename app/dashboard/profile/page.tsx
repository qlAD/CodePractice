'use client'

import React from "react"

import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { User, Lock, CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const { user, updatePassword, logout } = useAuth()
  const router = useRouter()
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (newPassword !== confirmPassword) {
      setError('两次输入的密码不一致')
      return
    }

    if (newPassword.length < 8) {
      setError('密码长度不能少于8位')
      return
    }

    const result = await updatePassword(oldPassword, newPassword)
    if (result) {
      setSuccess(true)
      setOldPassword('')
      setNewPassword('')
      setConfirmPassword('')
      
      // 3秒后跳转到登录页面
      setTimeout(() => {
        logout()
        router.push('/login')
      }, 3000)
    } else {
      setError('密码修改失败，请检查原密码是否正确')
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">个人信息</h1>
        <p className="text-muted-foreground mt-1">查看和管理你的账号信息</p>
      </div>

      {/* User info card */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="w-8 h-8 text-primary" />
            </div>
            <div>
              <CardTitle className="text-foreground">{user?.name}</CardTitle>
              <CardDescription>{user?.student_id}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="text-muted-foreground text-sm">学号</Label>
              <p className="font-medium text-foreground">{user?.student_id}</p>
            </div>
            <div className="space-y-1">
              <Label className="text-muted-foreground text-sm">姓名</Label>
              <p className="font-medium text-foreground">{user?.name}</p>
            </div>
            <div className="space-y-1 col-span-2">
              <Label className="text-muted-foreground text-sm">专业</Label>
              <p className="font-medium text-foreground">{user?.major}</p>
            </div>
            <div className="space-y-1 col-span-2">
              <Label className="text-muted-foreground text-sm">班级</Label>
              <p className="font-medium text-foreground">{user?.class_name}</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground pt-2 border-t border-border">
            如需修改以上信息，请联系管理员或专任教师在后台进行修改
          </p>
        </CardContent>
      </Card>

      {/* Password change card */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <Lock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-foreground text-lg">修改密码</CardTitle>
                <CardDescription>定期修改密码可以保护账号安全</CardDescription>
              </div>
            </div>
            {!isChangingPassword && (
              <Button
                variant="outline"
                onClick={() => setIsChangingPassword(true)}
              >
                修改密码
              </Button>
            )}
          </div>
        </CardHeader>
        {isChangingPassword && (
          <CardContent>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="oldPassword">原密码</Label>
                <Input
                  id="oldPassword"
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                  className="bg-input border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">新密码</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="bg-input border-border"
                />
                <p className="text-xs text-muted-foreground">
                  密码长度不少于8位，建议包含字母、数字或特殊字符
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">确认新密码</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="bg-input border-border"
                />
              </div>

              {error && (
                <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="p-3 rounded-md bg-success/10 text-success text-sm flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  密码修改成功，即将跳转到登录页面...
                </div>
              )}

              <div className="flex gap-3">
                <Button type="submit" className="bg-primary text-primary-foreground">
                  确认修改
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsChangingPassword(false)
                    setError('')
                    setOldPassword('')
                    setNewPassword('')
                    setConfirmPassword('')
                  }}
                >
                  取消
                </Button>
              </div>
            </form>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
