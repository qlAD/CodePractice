import { db } from '@/lib/db'

export async function resolveQuestionPaperId(
  raw: unknown,
  language: string
): Promise<{ id: number | null; error?: string }> {
  if (raw === null || raw === undefined || raw === '') {
    return { id: null }
  }

  if (typeof raw === 'number' && Number.isFinite(raw)) {
    const row = await db.queryOne<{ id: number; language: string }>(
      'SELECT id, language FROM papers WHERE id = ?',
      [raw]
    )
    if (!row) {
      return { id: null, error: `试卷不存在: ${raw}` }
    }
    if (row.language !== language) {
      return { id: null, error: '试卷与题目语言不一致' }
    }
    return { id: row.id }
  }

  const s = String(raw).trim()
  if (!s) {
    return { id: null }
  }

  const byCode = await db.queryOne<{ id: number; language: string }>(
    'SELECT id, language FROM papers WHERE papers_id = ?',
    [s]
  )
  if (byCode) {
    if (byCode.language !== language) {
      return { id: null, error: `试卷编号 ${s} 与语言不一致` }
    }
    return { id: byCode.id }
  }

  if (/^\d+$/.test(s)) {
    const num = Number(s)
    const byId = await db.queryOne<{ id: number; language: string }>(
      'SELECT id, language FROM papers WHERE id = ?',
      [num]
    )
    if (!byId) {
      return { id: null, error: `试卷不存在: ${s}` }
    }
    if (byId.language !== language) {
      return { id: null, error: '试卷与题目语言不一致' }
    }
    return { id: byId.id }
  }

  return { id: null, error: `未找到试卷: ${s}` }
}
