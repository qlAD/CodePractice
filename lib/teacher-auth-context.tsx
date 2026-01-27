'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { TeacherAuthUser, TeacherPermission } from './types'

interface TeacherAuthContextType {
  user: TeacherAuthUser | null
  isLoading: boolean
  login: (username: string, password: string) => Promise<{ success: boolean; needsPasswordChange?: boolean; error?: string }>
  logout: () => void
  updatePassword: (oldPassword: string, newPassword: string) => Promise<boolean>
  hasPermission: (permission: TeacherPermission) => boolean
}

const TeacherAuthContext = createContext<TeacherAuthContextType | undefined>(undefined)

export function TeacherAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<TeacherAuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkSession = async () => {
      try {
        const savedUser = localStorage.getItem('teacher_auth_user')
        if (savedUser) {
          setUser(JSON.parse(savedUser))
        }
      } catch (error) {
        console.error('Session check failed:', error)
      } finally {
        setIsLoading(false)
      }
    }
    checkSession()
  }, [])

  const login = async (username: string, password: string): Promise<{ success: boolean; needsPasswordChange?: boolean; error?: string }> => {
    try {
      const response = await fetch('/api/auth/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      let data
      try {
        data = await response.json()
      } catch {
        return { success: false, error: '服务器响应格式错误' }
      }
      
      if (response.ok && data.success) {
        setUser(data.user)
        localStorage.setItem('teacher_auth_user', JSON.stringify(data.user))
        return { success: true, needsPasswordChange: data.needsPasswordChange }
      }
      
      return { success: false, error: data?.error || '用户名或密码错误' }
    } catch (error) {
      console.error('Login failed:', error)
      return { success: false, error: '网络错误，请稍后重试' }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('teacher_auth_user')
  }

  const updatePassword = async (oldPassword: string, newPassword: string): Promise<boolean> => {
    try {
      if (!user) return false
      const response = await fetch('/api/auth/admin/update-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teacher_id: user.id, old_password: oldPassword, new_password: newPassword }),
      })
      return response.ok
    } catch (error) {
      console.error('Password update failed:', error)
      return false
    }
  }

  const hasPermission = (permission: TeacherPermission): boolean => {
    if (!user) return false
    if (user.permissions.includes('all')) return true
    return user.permissions.includes(permission)
  }

  return (
    <TeacherAuthContext.Provider value={{ user, isLoading, login, logout, updatePassword, hasPermission }}>
      {children}
    </TeacherAuthContext.Provider>
  )
}

export function useTeacherAuth() {
  const context = useContext(TeacherAuthContext)
  if (context === undefined) {
    throw new Error('useTeacherAuth must be used within a TeacherAuthProvider')
  }
  return context
}
