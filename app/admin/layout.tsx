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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
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
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <main className="lg:pl-64">
        <div className="min-h-screen">
          {children}
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
