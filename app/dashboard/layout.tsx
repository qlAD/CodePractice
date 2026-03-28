'use client'

import React from "react"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Sidebar } from '@/components/dashboard/sidebar'
import { Loader2 } from 'lucide-react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="app-shell flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">加载中…</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="min-h-screen lg:pl-64">
        <div className="main-canvas min-h-screen min-w-0 w-full border-0 px-4 py-5 pt-[calc(4rem+env(safe-area-inset-top,0px)+1rem)] sm:px-6 lg:border-l lg:border-border lg:p-8 lg:pt-8">
          <div className="page-enter">{children}</div>
        </div>
      </main>
    </div>
  )
}
