'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { AuthUser } from './types'

interface AuthContextType {
  user: AuthUser | null
  isLoading: boolean
  login: (studentId: string, password: string, rememberMe?: boolean) => Promise<boolean>
  logout: () => void
  updatePassword: (oldPassword: string, newPassword: string) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      try {
        const savedAuthData = localStorage.getItem('auth_data')
        if (savedAuthData) {
          const { user, expiry } = JSON.parse(savedAuthData)
          // Check if session is not expired
          if (Date.now() < expiry) {
            setUser(user)
          } else {
            // Session expired, remove it
            localStorage.removeItem('auth_data')
          }
        }
      } catch (error) {
        console.error('Session check failed:', error)
      } finally {
        setIsLoading(false)
      }
    }
    checkSession()
  }, [])

  const login = async (studentId: string, password: string, keepLoggedIn = false): Promise<boolean> => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ student_id: studentId, password }),
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
        
        // Calculate expiry time
        const now = Date.now()
        const expiry = keepLoggedIn 
          ? now + (30 * 24 * 60 * 60 * 1000) // 30 days
          : now + (24 * 60 * 60 * 1000) // 24 hours
        
        // Store user with expiry time
        localStorage.setItem('auth_data', JSON.stringify({ 
          user: data.user, 
          expiry 
        }))
        
        return true
      }
      
      return false
    } catch (error) {
      console.error('Login failed:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('auth_user')
    localStorage.removeItem('auth_data')
  }

  const updatePassword = async (oldPassword: string, newPassword: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/update-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          student_id: user?.student_id, 
          old_password: oldPassword, 
          new_password: newPassword 
        }),
      })
      return response.ok
    } catch (error) {
      console.error('Password update failed:', error)
      return false
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, updatePassword }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
