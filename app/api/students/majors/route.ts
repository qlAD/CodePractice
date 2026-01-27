import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const majors = await db.query<{ major: string }>(
      'SELECT DISTINCT major FROM students WHERE major IS NOT NULL AND major != "" ORDER BY major'
    )
    
    const majorList = majors.map(item => item.major)
    
    return NextResponse.json({
      success: true,
      data: majorList
    })
  } catch (error) {
    console.error('Get majors error:', error)
    return NextResponse.json(
      { success: false, error: '获取专业列表失败' },
      { status: 500 }
    )
  }
}
