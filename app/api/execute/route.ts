import { NextRequest, NextResponse } from 'next/server'
import { executeCode, runTestCases, type TestCase } from '@/lib/code-executor'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { language, code, input, testCases } = body

    if (!language || !code) {
      return NextResponse.json(
        { error: '缺少必要参数' },
        { status: 400 }
      )
    }

    // If test cases provided, run all test cases
    if (testCases && Array.isArray(testCases) && testCases.length > 0) {
      const results = await runTestCases(code, language, testCases as TestCase[])
      return NextResponse.json({
        type: 'test',
        ...results,
      })
    }

    // Otherwise, just execute the code
    const result = await executeCode({
      language,
      code,
      input: input || '',
    })

    return NextResponse.json({
      type: 'execute',
      ...result,
    })
  } catch (error) {
    console.error('Code execution error:', error)
    return NextResponse.json(
      { error: '代码执行服务暂时不可用' },
      { status: 500 }
    )
  }
}
