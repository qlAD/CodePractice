import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Number(searchParams.get('limit')) || 50
    const offset = Number(searchParams.get('offset')) || 0
    const user_type = searchParams.get('user_type')
    const module = searchParams.get('module')
    
    let sql = 'SELECT * FROM system_logs WHERE 1=1'
    const params: unknown[] = []
    
    if (user_type && user_type !== 'all') {
      sql += ' AND user_type = ?'
      params.push(user_type)
    }
    if (module && module !== 'all') {
      sql += ' AND module = ?'
      params.push(module)
    }
    
    sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?'
    params.push(limit, offset)
    
    const logs = await db.query(sql, params)
    
    // Get total count
    let countSql = 'SELECT COUNT(*) as total FROM system_logs WHERE 1=1'
    const countParams: unknown[] = []
    if (user_type && user_type !== 'all') {
      countSql += ' AND user_type = ?'
      countParams.push(user_type)
    }
    if (module && module !== 'all') {
      countSql += ' AND module = ?'
      countParams.push(module)
    }
    const countResult = await db.queryOne<{ total: number }>(countSql, countParams)
    
    return NextResponse.json({
      success: true,
      data: logs,
      total: countResult?.total || 0,
    })
  } catch {
    return NextResponse.json({
      success: true,
      data: [],
      total: 0,
    })
  }
}
