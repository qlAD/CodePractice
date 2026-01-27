import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 安全地解析 JSON 字符串或返回原对象
 * MySQL JSON 类型字段可能返回对象或字符串
 */
export function safeJsonParse<T = unknown>(value: unknown, defaultValue: T | null = null): T | null {
  if (value === null || value === undefined) return defaultValue
  if (typeof value === 'object') return value as T
  if (typeof value === 'string') {
    try {
      return JSON.parse(value) as T
    } catch {
      return defaultValue
    }
  }
  return defaultValue
}
