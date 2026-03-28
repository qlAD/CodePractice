'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useTeacherAuth } from '@/lib/teacher-auth-context'
import { ThemeModeButtons } from '@/components/theme-toggle'
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
import type { TeacherAuthUser } from '@/lib/types'

const navigation = [
  { name: '控制台', href: '/admin', icon: LayoutDashboard, permission: null },
  { name: '学生管理', href: '/admin/students', icon: GraduationCap, permission: 'user_management' as const },
  { name: '教师管理', href: '/admin/teachers', icon: UserCog, permission: 'user_management' as const },
  { name: '题库管理', href: '/admin/questions', icon: BookOpen, permission: 'question_management' as const },
  { name: '练习管理', href: '/admin/exercises', icon: ClipboardList, permission: 'practice_management' as const },
  { name: '系统设置', href: '/admin/settings', icon: Cog, permission: 'system_management' as const },
]

function navTitleFromPath(
  pathname: string,
  items: Array<{ name: string; href: string }>
) {
  const sorted = [...items].sort((a, b) => b.href.length - a.href.length)
  const hit = sorted.find(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`)
  )
  return hit?.name ?? '控制台'
}

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
                    <span className="ml-2 font-medium text-primary">({countdown})</span>
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

type AdminNavItem = (typeof navigation)[number]

function AdminSidebarBody({
  pathname,
  items,
  user,
  showMobileClose,
  onCloseMobile,
  onOpenProfile,
  onLogout,
}: {
  pathname: string
  items: AdminNavItem[]
  user: TeacherAuthUser | null
  showMobileClose?: boolean
  onCloseMobile: () => void
  onOpenProfile: () => void
  onLogout: () => void
}) {
  return (
    <>
      <div className="flex items-center gap-3 border-b border-sidebar-border bg-sidebar px-4 py-5">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border border-primary/25 bg-primary/15 text-primary shadow-sm">
            <Settings className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex flex-col">
            <span className="font-display truncate text-base font-semibold tracking-wide text-heading">
              CodePractice
            </span>
            <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              教师管理端
            </span>
          </div>
        </div>
        {showMobileClose && (
          <Button
            variant="secondary"
            size="icon"
            className="h-11 w-11 shrink-0 shadow-card ring-1 ring-border/80 lg:hidden"
            onClick={onCloseMobile}
            aria-label="关闭菜单"
          >
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {items.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== '/admin' && pathname.startsWith(item.href))
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onCloseMobile}
              className={cn(
                'flex items-center gap-3 rounded-[var(--radius-sm)] border-l-2 border-transparent py-2.5 pl-2.5 pr-3 text-sm font-medium transition-ui duration-200',
                isActive
                  ? 'border-primary bg-sidebar-accent font-semibold text-sidebar-primary'
                  : 'text-sidebar-foreground hover:border-border hover:bg-sidebar-accent/50'
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
          onClick={onOpenProfile}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
            <Users className="h-4 w-4 text-primary" />
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
        <ThemeModeButtons className="mb-2" />
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          onClick={onLogout}
        >
          <LogOut className="w-5 h-5" />
          退出登录
        </Button>
      </div>
    </>
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

  const mobileBarTitle = navTitleFromPath(pathname, filteredNavigation)

  return (
    <>
      {!mobileOpen && (
        <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-card/90 pt-[env(safe-area-inset-top,0px)] shadow-card backdrop-blur-md lg:hidden">
          <div className="relative flex h-16 items-center gap-4 px-5">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0" />
            <div className="flex min-w-0 flex-1 items-center gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border border-primary/25 bg-primary/15 text-primary shadow-sm">
                <Settings className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-lg font-semibold leading-snug text-heading">{mobileBarTitle}</p>
                <p className="truncate text-xs leading-snug text-muted-foreground">CodePractice · 管理端</p>
              </div>
            </div>
            <Button
              variant="secondary"
              size="icon"
              className="h-11 w-11 shrink-0 shadow-sm ring-1 ring-border/80"
              onClick={() => setMobileOpen(true)}
              aria-label="打开菜单"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </header>
      )}

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
          'fixed inset-y-0 left-0 z-40 w-[min(20rem,92vw)] border-r border-sidebar-border bg-sidebar backdrop-blur-xl shadow-card transform transition-transform duration-200 ease-in-out lg:hidden',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">
          <AdminSidebarBody
            pathname={pathname}
            items={filteredNavigation}
            user={user}
            showMobileClose
            onCloseMobile={() => setMobileOpen(false)}
            onOpenProfile={() => setProfileOpen(true)}
            onLogout={logout}
          />
        </div>
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:z-30 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-sidebar-border lg:bg-sidebar lg:backdrop-blur-xl">
        <AdminSidebarBody
          pathname={pathname}
          items={filteredNavigation}
          user={user}
          onCloseMobile={() => setMobileOpen(false)}
          onOpenProfile={() => setProfileOpen(true)}
          onLogout={logout}
        />
      </aside>

      <ProfileDialog open={profileOpen} onOpenChange={setProfileOpen} />
    </>
  )
}
