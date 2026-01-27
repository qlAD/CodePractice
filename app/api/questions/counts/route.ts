import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

// 获取题目数量统计
export async function GET() {
  try {
    // 按题型统计数量
    const typeStats = await db.query<{ type: string; count: number }>(
      `SELECT type, COUNT(*) as count FROM questions GROUP BY type`
    )

    // 按语言统计数量
    const languageStats = await db.query<{ language: string; count: number }>(
      `SELECT language, COUNT(*) as count FROM questions GROUP BY language`
    )

    // 构建返回数据
    const byType: Record<string, number> = {
      single_choice: 0,
      fill_blank: 0,
      error_fix: 0,
      programming: 0,
    }

    typeStats.forEach(stat => {
      if (stat.type) {
        byType[stat.type] = stat.count
        // 兼容 error_fix 和 error_fix
        if (stat.type === 'error_fix') {
          byType['error_fix'] = stat.count
        } else if (stat.type === 'error_fix') {
          byType['error_fix'] = stat.count
        }
      }
    })

    const byLanguage: Record<string, number> = {
      java: 0,
      cpp: 0,
      python: 0,
    }

    languageStats.forEach(stat => {
      if (stat.language && byLanguage.hasOwnProperty(stat.language)) {
        byLanguage[stat.language] = stat.count
      }
    })

    // 获取总数
    const totalResult = await db.queryOne<{ total: number }>(
      `SELECT COUNT(*) as total FROM questions`
    )

    return NextResponse.json({
      success: true,
      data: {
        total: totalResult?.total || 0,
        byType,
        byLanguage,
      },
    })
  } catch (error) {
    console.error('Get question counts error:', error)
    return NextResponse.json(
      { success: false, error: '获取题目统计失败' },
      { status: 500 }
    )
  }
}
