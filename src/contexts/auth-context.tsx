'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { RoleName } from '@/features/roles/schemas'
import { AuthUser } from '@/types/next-auth'

type AuthContextType = {
  user?: AuthUser
  role?: RoleName
}

const AuthContext = createContext<AuthContextType>({})

export function AuthProvider({
  children,
  initialUser,
}: {
  children: React.ReactNode
  initialUser?: AuthUser
}) {
  const [user, setUser] = useState<AuthUser | undefined>(initialUser)
  const [role, setRole] = useState<RoleName | undefined>(
    initialUser?.profile?.role?.name,
  )
  const { data } = useSession()
  useEffect(() => {
    if (data?.user) {
      setUser(data.user)
      const sessionUser = data.user
      const roleRaw = sessionUser?.profile?.role?.name
      setRole(roleRaw)
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
