'use client'

import React from "react"

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { TeacherAuthProvider, useTeacherAuth } from '@/lib/teacher-auth-context'
import { AdminSidebar } from '@/components/admin/sidebar'
import { Loader2 } from 'lucide-react'

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useTeacherAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isLoading && !user && pathname !== '/admin/login') {
      router.push('/admin/login')
    }
  }, [user, isLoading, router, pathname])

  if (isLoading) {
    return (
      <div className="app-shell flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // Login page doesn't need sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  if (!user) {
    return null
  }

  return (
    <div className="app-shell">
      <AdminSidebar />
      <main className="min-h-screen lg:pl-64">
        <div className="main-canvas min-h-screen min-w-0 w-full border-0 px-4 py-5 pt-[calc(4rem+env(safe-area-inset-top,0px)+1rem)] sm:px-6 lg:border-l lg:border-border lg:p-8 lg:pt-8">
          <div className="page-enter">{children}</div>
        </div>
      </main>
    </div>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <TeacherAuthProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </TeacherAuthProvider>
  )
}
