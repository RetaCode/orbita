'use client'

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { api, LoginResponse } from '@/lib/api'

interface AuthContextValue {
  token: string | null
  user: any | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<any | null>(null)

  useEffect(() => {
    try {
      const t = localStorage.getItem('authToken')
      if (t) setToken(t)
    } catch {}
  }, [])

  const login = async (email: string, password: string) => {
    const res: LoginResponse = await api.login(email, password)
    if (res?.token) {
      localStorage.setItem('authToken', res.token)
      setToken(res.token)
      setUser(res.usuario ?? null)
    }
  }

  const logout = () => {
    try { localStorage.removeItem('authToken') } catch {}
    setToken(null)
    setUser(null)
  }

  const value = useMemo<AuthContextValue>(() => ({ token, user, isAuthenticated: !!token, login, logout }), [token, user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}