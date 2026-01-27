import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const settings = await db.query<{ setting_key: string; setting_value: string }>(
      'SELECT setting_key, setting_value FROM system_settings'
    )
    
    const settingsMap: Record<string, string> = {}
    for (const s of settings) {
      settingsMap[s.setting_key] = s.setting_value
    }
    
    return NextResponse.json({
      success: true,
      data: settingsMap,
    })
  } catch {
    return NextResponse.json({
      success: true,
      data: {},
    })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    
    for (const [key, value] of Object.entries(body)) {
      // Check if setting exists
      const existing = await db.queryOne<{ id: number }>(
        'SELECT id FROM system_settings WHERE setting_key = ?',
        [key]
      )
      
      if (existing) {
        await db.update(
          'system_settings',
          { setting_value: String(value) },
          'setting_key = ?',
          [key]
        )
      } else {
        await db.insert('system_settings', {
          setting_key: key,
          setting_value: String(value),
        })
      }
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Update settings error:', error)
    return NextResponse.json(
      { success: false, error: '保存设置失败' },
      { status: 500 }
    )
  }
}
