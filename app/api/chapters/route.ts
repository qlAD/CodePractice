import { NextResponse } from 'next/server'
import { db, type DBChapter } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const language = searchParams.get('language')

    let sql = 'SELECT * FROM chapters'
    const params: unknown[] = []

    if (language) {
      sql += ' WHERE language = ?'
      params.push(language)
    }

    sql += ' ORDER BY language, sort_order'

    const chapters = await db.query<DBChapter>(sql, params)

    return NextResponse.json({
      success: true,
      data: chapters,
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: '获取章节列表失败' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { language, name, description, sort_order } = body

    // 获取最大排序值
    let order = sort_order
    if (!order) {
      const maxOrder = await db.queryOne<{ max_order: number }>(
        'SELECT MAX(sort_order) as max_order FROM chapters WHERE language = ?',
        [language]
      )
      order = (maxOrder?.max_order || 0) + 1
    }

    const result = await db.insert('chapters', {
      language,
      name,
      description,
      sort_order: order,
      question_count: 0,
    })

    return NextResponse.json({
      success: true,
      data: { id: result.insertId },
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: '创建章节失败' },
      { status: 500 }
    )
  }
}
