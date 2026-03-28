'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useAuth } from '@/lib/auth-context'
import { ThemeModeButtons } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import {
  Code2,
  LayoutDashboard,
  BookOpen,
  BarChart3,
  BookX,
  User,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { useState } from 'react'

const navigation = [
  { name: '学习中心', href: '/dashboard', icon: LayoutDashboard },
  { name: '题库练习', href: '/dashboard/practice', icon: BookOpen },
  { name: '成绩统计', href: '/dashboard/statistics', icon: BarChart3 },
  { name: '错题本', href: '/dashboard/mistakes', icon: BookX },
  { name: '个人信息', href: '/dashboard/profile', icon: User },
]

function currentNavTitle(pathname: string) {
  const sorted = [...navigation].sort((a, b) => b.href.length - a.href.length)
  const hit = sorted.find(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`)
  )
  return hit?.name ?? '学习中心'
}

export function Sidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const mobileBarTitle = currentNavTitle(pathname)

  const SidebarContent = ({ showMobileClose }: { showMobileClose?: boolean }) => (
    <>
      <div className="flex items-center gap-3 border-b border-sidebar-border bg-sidebar px-4 py-5">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border border-primary/25 bg-primary/15 text-primary shadow-sm">
            <Code2 className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex flex-col">
            <span className="font-display truncate text-base font-semibold tracking-wide text-heading">
              CodePractice
            </span>
            <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              学生端
            </span>
          </div>
        </div>
        {showMobileClose && (
          <Button
            variant="secondary"
            size="icon"
            className="h-11 w-11 shrink-0 shadow-card ring-1 ring-border/80 lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-label="关闭菜单"
          >
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== '/dashboard' && pathname.startsWith(item.href))
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileOpen(false)}
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
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center">
            <User className="w-4 h-4 text-sidebar-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">
              {user?.name || '未登录'}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user?.student_id}
            </p>
          </div>
        </div>
        <ThemeModeButtons className="mb-2" />
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
      {!mobileOpen && (
        <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-card/90 pt-[env(safe-area-inset-top,0px)] shadow-card backdrop-blur-md lg:hidden">
          <div className="relative flex h-16 items-center gap-4 px-5">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0" />
            <div className="flex min-w-0 flex-1 items-center gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border border-primary/25 bg-primary/15 text-primary shadow-sm">
                <Code2 className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-lg font-semibold leading-snug text-heading">{mobileBarTitle}</p>
                <p className="truncate text-xs leading-snug text-muted-foreground">CodePractice · 学生端</p>
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
          <SidebarContent showMobileClose />
        </div>
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:z-30 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-sidebar-border lg:bg-sidebar lg:backdrop-blur-xl">
        <SidebarContent />
      </aside>
    </>
  )
}
