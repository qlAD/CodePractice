const MULTI_CHAR_OPS = [
  '>>>=',
  '<<=',
  '>>=',
  '...',
  '>>>',
  '<<',
  '>>',
  '<=',
  '>=',
  '==',
  '!=',
  '&&',
  '||',
  '++',
  '--',
  '+=',
  '-=',
  '*=',
  '/=',
  '%=',
  '&=',
  '|=',
  '^=',
  '->',
  '::',
  '??',
] as const

function tryReadSymbolicOp(s: string, i: number): [string, number] | null {
  const rest = s.slice(i)
  for (const op of MULTI_CHAR_OPS) {
    if (rest.startsWith(op)) return [op, i + op.length]
  }
  return null
}

function tokenizeCodeSnippet(s: string): string[] {
  const tokens: string[] = []
  let i = 0
  const n = s.length

  const skipWs = () => {
    while (i < n && /\s/.test(s[i])) i++
  }

  while (i < n) {
    skipWs()
    if (i >= n) break

    const c = s[i]

    if (c === '/' && i + 1 < n) {
      if (s[i + 1] === '/') {
        i += 2
        while (i < n && s[i] !== '\n' && s[i] !== '\r') i++
        continue
      }
      if (s[i + 1] === '*') {
        i += 2
        while (i + 1 < n && !(s[i] === '*' && s[i + 1] === '/')) i++
        i = i + 1 < n && s[i] === '*' && s[i + 1] === '/' ? i + 2 : n
        continue
      }
    }

    if (c === '"') {
      const start = i
      i++
      while (i < n) {
        if (s[i] === '\\') {
          i += 2
          continue
        }
        if (s[i] === '"') {
          i++
          break
        }
        i++
      }
      tokens.push(s.slice(start, i))
      continue
    }

    if (c === "'") {
      const start = i
      i++
      while (i < n) {
        if (s[i] === '\\') {
          i += 2
          continue
        }
        if (s[i] === "'") {
          i++
          break
        }
        i++
      }
      tokens.push(s.slice(start, i))
      continue
    }

    if (/[0-9]/.test(c)) {
      const start = i
      i++
      while (i < n && /[0-9.]/.test(s[i])) i++
      tokens.push(s.slice(start, i))
      continue
    }

    if (/[a-zA-Z_$]/.test(c)) {
      const start = i
      i++
      while (i < n && /[a-zA-Z0-9_$]/.test(s[i])) i++
      tokens.push(s.slice(start, i))
      continue
    }

    const op = tryReadSymbolicOp(s, i)
    if (op) {
      tokens.push(op[0])
      i = op[1]
      continue
    }

    tokens.push(c)
    i++
  }

  return tokens
}

function stripOuterLineEndWs(src: string): string {
  return src
    .trim()
    .replace(/\r\n/g, '\n')
    .replace(/\s+$/gm, '')
}

const TOK_GAP = '\0'

export function normalizeCodeCompareSnippet(src: string): string {
  return tokenizeCodeSnippet(stripOuterLineEndWs(src)).join(TOK_GAP)
}

export function codeCompareTokens(src: string): string[] {
  return tokenizeCodeSnippet(stripOuterLineEndWs(src))
}
