'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import type { User, Role } from '@/types/general'
import { normalizeRole } from '@/utils/normalizeRole'
import { useSession } from 'next-auth/react'

type AuthContextType = {
  user?: User
  role?: Role
}

const AuthContext = createContext<AuthContextType>({})

export function AuthProvider({
  children,
  initialUser,
}: {
  children: React.ReactNode
  initialUser?: User
}) {
  const [user, setUser] = useState<User | undefined>(initialUser)
  const [role, setRole] = useState<Role | undefined>(
    normalizeRole(initialUser?.profile?.role),
  )
  const { data } = useSession()
  useEffect(() => {
    if (data?.user) {
      setUser(data.user as User)
      const sessionUser = data.user as Partial<User>
      const roleRaw = sessionUser?.profile?.role
      setRole(normalizeRole(roleRaw))
    }
  }, [data?.user])

  return (
    <AuthContext.Provider value={{ user, role }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
