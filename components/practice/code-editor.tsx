'use client'

import { useRef, useCallback, useMemo } from 'react'
import type { Language } from '@/lib/types'
import { cn } from '@/lib/utils'

const languageLabel: Record<Language, string> = {
  java: 'Java',
  cpp: 'C++',
  python: 'Python',
}

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  language: Language
  readOnly?: boolean
  height?: string
}

const TAB = '    '

export function CodeEditor({
  value,
  onChange,
  language,
  readOnly = false,
  height = '300px',
}: CodeEditorProps) {
  const taRef = useRef<HTMLTextAreaElement>(null)
  const gutterRef = useRef<HTMLDivElement>(null)

  const lineCount = useMemo(() => {
    if (!value) return 1
    return value.split('\n').length
  }, [value])

  const gutterLines = useMemo(
    () => Array.from({ length: lineCount }, (_, i) => i + 1).join('\n'),
    [lineCount]
  )

  const syncScroll = useCallback(() => {
    const ta = taRef.current
    const g = gutterRef.current
    if (ta && g) g.scrollTop = ta.scrollTop
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (readOnly || e.key !== 'Tab') return
      e.preventDefault()
      const ta = e.currentTarget
      const start = ta.selectionStart
      const end = ta.selectionEnd
      const v = value

      if (e.shiftKey) {
        const lineStart = v.lastIndexOf('\n', start - 1) + 1
        const before = v.slice(lineStart, start)
        let remove = 0
        if (before.startsWith(TAB)) remove = TAB.length
        else if (before.startsWith('\t')) remove = 1
        else if (before.match(/^ +/)) {
          const m = before.match(/^ +/)![0]
          remove = Math.min(m.length, 4)
        }
        if (remove === 0) return
        const next = v.slice(0, start - remove) + v.slice(start)
        onChange(next)
        requestAnimationFrame(() => {
          ta.focus()
          const ns = start - remove
          const ne = end - remove
          ta.setSelectionRange(ns, Math.max(ns, ne))
        })
        return
      }

      const next = v.slice(0, start) + TAB + v.slice(end)
      onChange(next)
      requestAnimationFrame(() => {
        ta.focus()
        const p = start + TAB.length
        ta.setSelectionRange(p, p)
      })
    },
    [readOnly, value, onChange]
  )

  const editorClass =
    'min-h-0 min-w-0 flex-1 resize-none border-0 bg-transparent py-3 pr-3 font-mono text-[13px] leading-[1.6] outline-none focus:ring-0 focus-visible:ring-0 selection:bg-code-purple/25'

  return (
    <div
      className="flex flex-col overflow-hidden rounded-[var(--radius)] border border-border/60 shadow-card ring-1 ring-primary/10 transition-shadow duration-200 hover:shadow-card-hover"
      style={{
        height,
        backgroundColor: 'var(--code-surface)',
      }}
    >
      <div
        className="flex shrink-0 items-center justify-end border-b px-2 py-1.5"
        style={{ borderColor: 'var(--code-bar)' }}
      >
        <span className="rounded-[4px] bg-code-cyan/15 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-code-cyan">
          {languageLabel[language]}
        </span>
      </div>
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <div
          ref={gutterRef}
          className="shrink-0 select-none overflow-y-auto overflow-x-hidden py-3 pl-2 pr-2 text-right font-mono text-[13px] leading-[1.6] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{
            minWidth: `${Math.max(2.25, String(lineCount).length * 0.65 + 1)}rem`,
            backgroundColor: 'var(--code-gutter)',
            color: 'var(--code-linenumber)',
            borderRight: '1px solid var(--code-bar)',
          }}
          aria-hidden
        >
          <pre className="m-0 whitespace-pre font-mono">{gutterLines}</pre>
        </div>
        <textarea
          ref={taRef}
          className={cn(editorClass, readOnly && 'cursor-default opacity-90')}
          style={{ color: 'var(--code-text)' }}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onScroll={syncScroll}
          onKeyDown={handleKeyDown}
          readOnly={readOnly}
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          wrap="off"
        />
      </div>
    </div>
  )
}
