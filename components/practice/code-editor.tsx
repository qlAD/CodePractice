'use client'

import { useRef, useCallback } from 'react'
import Editor, { OnMount, OnChange, loader } from '@monaco-editor/react'
import type { Language } from '@/lib/types'

loader.config({ paths: { vs: 'https://cdn.jsdelivr.net.cn/npm/monaco-editor@latest/min/vs' } })

const languageMap: Record<Language, string> = {
  java: 'java',
  cpp: 'cpp',
  python: 'python',
}

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  language: Language
  readOnly?: boolean
  height?: string
}

export function CodeEditor({
  value,
  onChange,
  language,
  readOnly = false,
  height = '300px',
}: CodeEditorProps) {
  const editorRef = useRef<any>(null)

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor

    // Configure editor theme
    monaco.editor.defineTheme('codePracticeTheme', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6A9955' },
        { token: 'keyword', foreground: '569CD6' },
        { token: 'string', foreground: 'CE9178' },
        { token: 'number', foreground: 'B5CEA8' },
        { token: 'type', foreground: '4EC9B0' },
      ],
      colors: {
        'editor.background': '#1a1a2e',
        'editor.foreground': '#d4d4d4',
        'editor.lineHighlightBackground': '#2a2a4a',
        'editor.selectionBackground': '#264f78',
        'editorLineNumber.foreground': '#858585',
        'editorCursor.foreground': '#4ade80',
        'editor.inactiveSelectionBackground': '#3a3a5a',
      },
    })
    monaco.editor.setTheme('codePracticeTheme')

    // Auto-format on mount
    setTimeout(() => {
      editor.getAction('editor.action.formatDocument')?.run()
    }, 100)
  }

  const handleChange: OnChange = useCallback(
    (value) => {
      onChange(value || '')
    },
    [onChange]
  )

  return (
    <div className="rounded-lg overflow-hidden border border-border">
      <Editor
        height={height}
        language={languageMap[language]}
        value={value}
        onChange={handleChange}
        onMount={handleEditorDidMount}
        options={{
          readOnly,
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          wordWrap: 'on',
          automaticLayout: true,
          tabSize: 4,
          insertSpaces: true,
          scrollBeyondLastLine: false,
          renderLineHighlight: 'all',
          cursorBlinking: 'smooth',
          cursorSmoothCaretAnimation: 'on',
          smoothScrolling: true,
          padding: { top: 12, bottom: 12 },
          folding: true,
          bracketPairColorization: { enabled: true },
          autoIndent: 'full',
          formatOnPaste: true,
          formatOnType: true,
        }}
        loading={
          <div className="h-full flex items-center justify-center bg-secondary">
            <div className="text-muted-foreground">加载编辑器中...</div>
          </div>
        }
      />
    </div>
  )
}
