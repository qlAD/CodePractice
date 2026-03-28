import { createLowlight } from 'lowlight'
import java from 'highlight.js/lib/languages/java'
import cpp from 'highlight.js/lib/languages/cpp'
import python from 'highlight.js/lib/languages/python'
import { toHtml } from 'hast-util-to-html'
import type { Language } from '@/lib/types'

const low = createLowlight({ java, cpp, python })

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export function highlightCode(lang: Language, code: string): string {
  try {
    return toHtml(low.highlight(lang, code))
  } catch {
    return escapeHtml(code)
  }
}
