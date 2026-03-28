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

export function Sidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)

  const SidebarContent = ({ showMobileClose }: { showMobileClose?: boolean }) => (
    <>
      <div className="flex items-center gap-3 border-b border-sidebar-border bg-sidebar px-4 py-5">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground shadow-sm">
            <Code2 className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex flex-col">
            <span className="truncate text-base font-semibold text-heading">CodePractice</span>
            <span className="text-xs text-muted-foreground">在线练习平台</span>
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
                'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors duration-150',
                isActive
                  ? 'bg-sidebar-accent font-semibold text-sidebar-primary'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/80'
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
        <Button
          variant="secondary"
          size="icon"
          className="fixed left-3 top-3 z-50 h-11 w-11 shadow-card ring-1 ring-border/80 lg:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="打开菜单"
        >
          <Menu className="h-5 w-5" />
        </Button>
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
          'fixed inset-y-0 left-0 z-40 w-64 border-r border-sidebar-border bg-sidebar shadow-card transform transition-transform duration-200 ease-in-out lg:hidden',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">
          <SidebarContent showMobileClose />
        </div>
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:z-30 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-sidebar-border lg:bg-sidebar">
        <SidebarContent />
      </aside>
    </>
  )
}
