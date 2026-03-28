'use client'

import { ThemeToggle } from '@/components/theme-toggle'

export function GlobalThemeToggle() {
  return (
    <div className="fixed top-4 right-4 z-[100]">
      <ThemeToggle />
    </div>
  )
}
