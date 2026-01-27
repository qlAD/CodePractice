'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Play,
  Loader2,
  CheckCircle2,
  XCircle,
  Clock,
  Terminal,
  TestTube,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Language } from '@/lib/types'

interface TestCase {
  input: string
  expectedOutput: string
}

interface TestResult {
  passed: boolean
  testCase: number
  input: string
  expectedOutput: string
  actualOutput: string
  error?: string
}

interface CodeRunnerProps {
  code: string
  language: Language
  testCases?: TestCase[]
  disabled?: boolean
  onTestComplete?: (passed: number, total: number) => void
}

export function CodeRunner({
  code,
  language,
  testCases = [],
  disabled = false,
  onTestComplete,
}: CodeRunnerProps) {
  const [activeTab, setActiveTab] = useState<'run' | 'test'>('run')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [executionTime, setExecutionTime] = useState<number | null>(null)
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [testSummary, setTestSummary] = useState<{ passed: number; total: number } | null>(null)

  const handleRunCode = async () => {
    setIsRunning(true)
    setOutput('')
    setError('')
    setExecutionTime(null)

    try {
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language, code, input }),
      })

      const result = await response.json()

      if (result.error && !result.output) {
        setError(result.error)
      } else {
        setOutput(result.output || '')
        if (result.error) {
          setError(result.error)
        }
      }
      setExecutionTime(result.executionTime || null)
    } catch (err) {
      setError('无法连接到代码执行服务')
    } finally {
      setIsRunning(false)
    }
  }

  const handleRunTests = async () => {
    if (testCases.length === 0) {
      setError('没有可用的测试用例')
      return
    }

    setIsRunning(true)
    setTestResults([])
    setTestSummary(null)
    setError('')

    try {
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language, code, testCases }),
      })

      const result = await response.json()

      if (result.error) {
        setError(result.error)
      } else {
        setTestResults(result.results || [])
        setTestSummary({ passed: result.passed, total: result.total })
        onTestComplete?.(result.passed, result.total)
      }
    } catch (err) {
      setError('无法连接到代码执行服务')
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Terminal className="w-4 h-4 text-primary" />
            代码运行
          </CardTitle>
          {executionTime && (
            <Badge variant="outline" className="text-xs">
              <Clock className="w-3 h-3 mr-1" />
              {executionTime}ms
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'run' | 'test')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="run">
              <Play className="w-4 h-4 mr-2" />
              运行代码
            </TabsTrigger>
            <TabsTrigger value="test" disabled={testCases.length === 0}>
              <TestTube className="w-4 h-4 mr-2" />
              测试用例 ({testCases.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="run" className="space-y-4">
            <div className="space-y-2">
              <Label className="text-muted-foreground">输入 (stdin)</Label>
              <Textarea
                placeholder="在此输入程序的输入数据..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="bg-input border-border font-mono text-sm h-20 resize-none"
                disabled={disabled || isRunning}
              />
            </div>

            <Button
              onClick={handleRunCode}
              disabled={disabled || isRunning || !code.trim()}
              className="w-full bg-primary hover:bg-primary/90"
            >
              {isRunning ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  运行中...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  运行代码
                </>
              )}
            </Button>

            {(output || error) && (
              <div className="space-y-2">
                <Label className="text-muted-foreground">输出结果</Label>
                <div
                  className={cn(
                    'p-3 rounded-lg font-mono text-sm min-h-[80px] max-h-[200px] overflow-auto',
                    error ? 'bg-destructive/10 border border-destructive/30' : 'bg-secondary border border-border'
                  )}
                >
                  {output && <pre className="text-foreground whitespace-pre-wrap">{output}</pre>}
                  {error && <pre className="text-destructive whitespace-pre-wrap">{error}</pre>}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="test" className="space-y-4">
            <Button
              onClick={handleRunTests}
              disabled={disabled || isRunning || !code.trim() || testCases.length === 0}
              className="w-full bg-primary hover:bg-primary/90"
            >
              {isRunning ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  测试中...
                </>
              ) : (
                <>
                  <TestTube className="w-4 h-4 mr-2" />
                  运行所有测试
                </>
              )}
            </Button>

            {testSummary && (
              <div
                className={cn(
                  'p-4 rounded-lg border',
                  testSummary.passed === testSummary.total
                    ? 'bg-success/10 border-success/30'
                    : 'bg-warning/10 border-warning/30'
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-foreground font-medium">测试结果</span>
                  <Badge
                    variant={testSummary.passed === testSummary.total ? 'default' : 'secondary'}
                    className={cn(
                      testSummary.passed === testSummary.total
                        ? 'bg-success text-success-foreground'
                        : ''
                    )}
                  >
                    {testSummary.passed}/{testSummary.total} 通过
                  </Badge>
                </div>
              </div>
            )}

            {testResults.length > 0 && (
              <div className="space-y-2">
                {testResults.map((result, index) => (
                  <div
                    key={index}
                    className={cn(
                      'p-3 rounded-lg border',
                      result.passed
                        ? 'bg-success/5 border-success/20'
                        : 'bg-destructive/5 border-destructive/20'
                    )}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {result.passed ? (
                        <CheckCircle2 className="w-4 h-4 text-success" />
                      ) : (
                        <XCircle className="w-4 h-4 text-destructive" />
                      )}
                      <span className="font-medium text-foreground">测试用例 {result.testCase}</span>
                    </div>
                    <div className="grid grid-cols-1 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">输入: </span>
                        <code className="text-foreground bg-secondary px-1 rounded">
                          {result.input || '(无)'}
                        </code>
                      </div>
                      <div>
                        <span className="text-muted-foreground">期望输出: </span>
                        <code className="text-foreground bg-secondary px-1 rounded">
                          {result.expectedOutput || '(无)'}
                        </code>
                      </div>
                      <div>
                        <span className="text-muted-foreground">实际输出: </span>
                        <code
                          className={cn(
                            'px-1 rounded',
                            result.passed ? 'text-success bg-success/10' : 'text-destructive bg-destructive/10'
                          )}
                        >
                          {result.actualOutput || '(无)'}
                        </code>
                      </div>
                      {result.error && (
                        <div className="text-destructive text-xs mt-1">{result.error}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {error && !testResults.length && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30">
                <pre className="text-destructive text-sm font-mono whitespace-pre-wrap">{error}</pre>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
