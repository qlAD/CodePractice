// Code Execution Service
// This uses the Piston API for code execution (free, open-source)
// You can replace this with Judge0 or your own sandbox server

export interface ExecutionResult {
  success: boolean
  output: string
  error?: string
  executionTime?: number
  memoryUsage?: string
}

export interface ExecutionRequest {
  language: 'java' | 'cpp' | 'python'
  code: string
  input?: string
  timeLimit?: number // in seconds
}

// Language configurations for Piston API
const languageConfig: Record<string, { language: string; version: string }> = {
  java: { language: 'java', version: '15.0.2' },
  cpp: { language: 'cpp', version: '10.2.0' },
  python: { language: 'python', version: '3.10.0' },
}

// Piston API endpoint (free, no API key required)
const PISTON_API = 'https://emkc.org/api/v2/piston'

export async function executeCode(request: ExecutionRequest): Promise<ExecutionResult> {
  const { language, code, input = '', timeLimit = 10 } = request
  const config = languageConfig[language]

  if (!config) {
    return {
      success: false,
      output: '',
      error: `不支持的语言: ${language}`,
    }
  }

  try {
    const startTime = Date.now()

    const response = await fetch(`${PISTON_API}/execute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        language: config.language,
        version: config.version,
        files: [
          {
            name: getFileName(language),
            content: code,
          },
        ],
        stdin: input,
        run_timeout: timeLimit * 1000,
      }),
    })

    if (!response.ok) {
      throw new Error(`API 请求失败: ${response.status}`)
    }

    const result = await response.json()
    const executionTime = Date.now() - startTime

    // Check for compilation errors
    if (result.compile && result.compile.code !== 0) {
      return {
        success: false,
        output: '',
        error: `编译错误:\n${result.compile.stderr || result.compile.output}`,
        executionTime,
      }
    }

    // Check for runtime errors
    if (result.run.code !== 0) {
      return {
        success: false,
        output: result.run.stdout || '',
        error: `运行错误:\n${result.run.stderr || '程序异常退出'}`,
        executionTime,
      }
    }

    return {
      success: true,
      output: result.run.stdout || '(无输出)',
      executionTime,
    }
  } catch (error) {
    return {
      success: false,
      output: '',
      error: `执行失败: ${error instanceof Error ? error.message : '未知错误'}`,
    }
  }
}

function getFileName(language: string): string {
  switch (language) {
    case 'java':
      return 'Main.java'
    case 'cpp':
      return 'main.cpp'
    case 'python':
      return 'main.py'
    default:
      return 'main'
  }
}

// Test cases execution for auto-grading
export interface TestCase {
  input: string
  expectedOutput: string
}

export interface TestResult {
  passed: boolean
  testCase: number
  input: string
  expectedOutput: string
  actualOutput: string
  error?: string
}

export async function runTestCases(
  code: string,
  language: 'java' | 'cpp' | 'python',
  testCases: TestCase[]
): Promise<{ passed: number; total: number; results: TestResult[] }> {
  const results: TestResult[] = []
  let passed = 0

  for (let i = 0; i < testCases.length; i++) {
    const testCase = testCases[i]
    const result = await executeCode({
      language,
      code,
      input: testCase.input,
    })

    const actualOutput = result.output.trim()
    const expectedOutput = testCase.expectedOutput.trim()
    const isPassed = result.success && actualOutput === expectedOutput

    if (isPassed) passed++

    results.push({
      passed: isPassed,
      testCase: i + 1,
      input: testCase.input,
      expectedOutput,
      actualOutput,
      error: result.error,
    })
  }

  return { passed, total: testCases.length, results }
}
