import React from 'react'

const LABEL = '大连东软信息学院'
const COUNT = 140

export function PageWatermark() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 select-none overflow-hidden"
      aria-hidden
    >
      <div
        className="absolute left-1/2 top-1/2 flex w-[280vmin] max-w-none flex-wrap content-start justify-center gap-x-32 gap-y-40 text-foreground/10 dark:text-foreground/[0.12]"
        style={{ transform: 'translate(-50%, -50%) rotate(-22deg)' }}
      >
        {Array.from({ length: COUNT }, (_, i) => (
          <span key={i} className="whitespace-nowrap text-sm font-medium">
            {LABEL}
          </span>
        ))}
      </div>
    </div>
  )
}
