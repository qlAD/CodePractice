export const PRACTICE_MODES = ['by_language', 'by_type', 'by_paper', 'by_exam'] as const
export type PracticeMode = (typeof PRACTICE_MODES)[number]

const LEGACY_MODE: Record<string, PracticeMode> = {
  language: 'by_language',
  type: 'by_type',
  paper: 'by_paper',
  exam: 'by_exam',
}

export function canonicalizePracticeModeParam(mode: string): PracticeMode | null {
  if ((PRACTICE_MODES as readonly string[]).includes(mode)) return mode as PracticeMode
  if (mode in LEGACY_MODE) return LEGACY_MODE[mode]
  return null
}

export function normalizePracticeModeForSession(raw: string): string {
  return canonicalizePracticeModeParam(raw) ?? raw
}

export function normalizePracticeModeForDb(
  mode: string | undefined | null,
  fallback: PracticeMode = 'by_language'
): PracticeMode {
  if (mode == null || mode === '') return fallback
  return canonicalizePracticeModeParam(mode) ?? fallback
}

export const STATS_TABS = ['by_language', 'by_type', 'by_paper', 'history'] as const
export type StatsTab = (typeof STATS_TABS)[number]

const LEGACY_STATS_TAB: Record<string, StatsTab> = {
  language: 'by_language',
  type: 'by_type',
  paper: 'by_paper',
}

export function canonicalizeStatsTabParam(tab: string): StatsTab | null {
  if ((STATS_TABS as readonly string[]).includes(tab)) return tab as StatsTab
  if (tab in LEGACY_STATS_TAB) return LEGACY_STATS_TAB[tab]
  return null
}

export function normalizeStatsTab(raw: string | undefined | null): StatsTab {
  if (raw == null || raw === '') return 'by_language'
  return canonicalizeStatsTabParam(raw) ?? 'by_language'
}
