'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

const modes = [
  { value: 'light' as const, label: '日间' },
  { value: 'dark' as const, label: '夜间' },
  { value: 'system' as const, label: '自动' },
]

export function ThemeModeButtons({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const current = mounted ? theme ?? 'system' : 'system'

  return (
    <div
      className={cn('grid grid-cols-3 gap-0.5 rounded-lg border border-sidebar-border bg-sidebar-accent/40 p-0.5', className)}
      role="group"
      aria-label="主题"
    >
      {modes.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          disabled={!mounted}
          onClick={() => setTheme(value)}
          className={cn(
            'rounded-md px-1.5 py-1.5 text-[11px] font-medium transition-ui',
            current === value
              ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground'
          )}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
