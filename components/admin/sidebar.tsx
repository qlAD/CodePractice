'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useTeacherAuth } from '@/lib/teacher-auth-context'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Settings,
  LayoutDashboard,
  Users,
  BookOpen,
  ClipboardList,
  Cog,
  LogOut,
  Menu,
  X,
  GraduationCap,
  UserCog,
} from 'lucide-react'
import { useState, useEffect } from 'react'

const navigation = [
  { name: '控制台', href: '/admin', icon: LayoutDashboard, permission: null },
  { name: '学生管理', href: '/admin/students', icon: GraduationCap, permission: 'user_management' as const },
  { name: '教师管理', href: '/admin/teachers', icon: UserCog, permission: 'user_management' as const },
  { name: '题库管理', href: '/admin/questions', icon: BookOpen, permission: 'question_management' as const },
  { name: '练习管理', href: '/admin/exercises', icon: ClipboardList, permission: 'practice_management' as const },
  { name: '系统设置', href: '/admin/settings', icon: Cog, permission: 'system_management' as const },
]

function ProfileDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { user, updatePassword } = useTeacherAuth()
  const router = useRouter()
  const [oldPassword, setOldPassword] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [countdown, setCountdown] = useState(0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')

    if (!oldPassword) {
      setMessage('请输入旧密码')
      return
    }
    if (password !== confirmPassword) {
      setMessage('两次输入的新密码不一致')
      return
    }
    if (password.length < 6) {
      setMessage('新密码长度至少为6位')
      return
    }

    setLoading(true)
    const result = await updatePassword(oldPassword, password)
    setLoading(false)

    if (result) {
      setMessage('密码修改成功，3秒后自动跳转到登录页面')
      setOldPassword('')
      setPassword('')
      setConfirmPassword('')
      setCountdown(3)
    } else {
      setMessage('密码修改失败，请检查旧密码是否正确')
    }
  }

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (countdown === 0 && message.includes('密码修改成功')) {
      router.push('/admin/login')
    }
  }, [countdown, message, router])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>个人信息</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>用户名</Label>
            <Input value={user?.name || ''} disabled />
          </div>
          <div className="space-y-2">
            <Label>角色</Label>
            <Input value={user?.role === 'admin' ? '管理员' : '教师'} disabled />
          </div>
          <div className="border-t pt-4 mt-4">
            <h4 className="font-medium mb-4">修改密码</h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="oldPassword">旧密码</Label>
                <Input
                  id="oldPassword"
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="请输入旧密码"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">新密码</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="请输入新密码"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">确认新密码</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="请再次输入新密码"
                />
              </div>
              {message && (
                <p className="text-sm text-muted-foreground">
                  {message}
                  {countdown > 0 && message.includes('密码修改成功') && (
                    <span className="ml-2 font-medium text-accent">({countdown})</span>
                  )}
                </p>
              )}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? '修改中...' : '确认修改'}
              </Button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function AdminSidebar() {
  const pathname = usePathname()
  const { user, logout, hasPermission } = useTeacherAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  const filteredNavigation = navigation.filter(item => {
    if (!item.permission) return true
    return hasPermission(item.permission)
  })

  const SidebarContent = () => (
    <>
      <div className="flex items-center gap-3 px-4 py-6 border-b border-sidebar-border">
        <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
          <Settings className="w-6 h-6 text-accent-foreground" />
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-sidebar-foreground">CodePractice</span>
          <span className="text-xs text-muted-foreground">教师管理端</span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {filteredNavigation.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== '/admin' && pathname.startsWith(item.href))
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-accent/20 text-accent'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="px-3 py-4 border-t border-sidebar-border">
        <div
          className="flex items-center gap-3 px-3 py-2 mb-2 cursor-pointer rounded-lg transition-colors hover:bg-sidebar-accent/50"
          onClick={() => setProfileOpen(true)}
        >
          <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
            <Users className="w-4 h-4 text-accent" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">
              {user?.name || '未登录'}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user?.role === 'admin' ? '管理员' : '教师'}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          onClick={logout}
        >
          <LogOut className="w-5 h-5" />
          退出登录
        </Button>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-200 ease-in-out lg:hidden',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          <SidebarContent />
        </div>
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-sidebar border-r border-sidebar-border">
        <SidebarContent />
      </aside>

      <ProfileDialog open={profileOpen} onOpenChange={setProfileOpen} />
    </>
  )
}
