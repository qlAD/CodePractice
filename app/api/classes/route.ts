import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const classes = await db.query<{ class_name: string }>(
      'SELECT DISTINCT class_name FROM students WHERE class_name IS NOT NULL AND class_name != "" ORDER BY class_name'
    )

    return NextResponse.json({
      success: true,
      data: classes.map(c => c.class_name),
    })
  } catch (error) {
    console.error('Get classes error:', error)
    return NextResponse.json(
      { success: false, error: '获取班级列表失败' },
      { status: 500 }
    )
  }
}
