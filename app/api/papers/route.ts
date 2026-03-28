import { NextResponse } from 'next/server'
import { db, type DBChapter } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const language = searchParams.get('language')

    let sql = 'SELECT * FROM papers'
    const params: unknown[] = []

    if (language) {
      sql += ' WHERE language = ?'
      params.push(language)
    }

    sql += ' ORDER BY language, sort_order'

    const papers = await db.query<DBChapter>(sql, params)

    return NextResponse.json({
      success: true,
      data: papers,
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: '获取试卷列表失败' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { language, name, description, sort_order, papers_id } = body

    const code = typeof papers_id === 'string' ? papers_id.trim() : ''
    if (!code) {
      return NextResponse.json(
        { success: false, error: '请填写试卷编号 papers_id' },
        { status: 400 }
      )
    }

    const dup = await db.queryOne<{ id: number }>(
      'SELECT id FROM papers WHERE papers_id = ?',
      [code]
    )
    if (dup) {
      return NextResponse.json(
        { success: false, error: '试卷编号已存在' },
        { status: 400 }
      )
    }

    let order = sort_order
    if (!order) {
      const maxOrder = await db.queryOne<{ max_order: number }>(
        'SELECT MAX(sort_order) as max_order FROM papers WHERE language = ?',
        [language]
      )
      order = (maxOrder?.max_order || 0) + 1
    }

    const result = await db.insert('papers', {
      papers_id: code,
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
      { success: false, error: '创建试卷失败' },
      { status: 500 }
    )
  }
}
