'use client'

import { useSession } from 'next-auth/react'

type RefreshArgs = {
  unitId?: string
}

type UseRefreshSessionTokenResult = {
  refresh: (args?: RefreshArgs) => Promise<void>
}

export function useRefreshSessionToken(): UseRefreshSessionTokenResult {
  const { update, data } = useSession()

  async function refresh(args: RefreshArgs = {}) {
    const payload: Record<string, unknown> = {
      accessTokenExpires: Date.now(),
    }

    if (args.unitId || data?.user) {
      payload.user = {
        ...(data?.user ?? {}),
        ...(args.unitId ? { unitId: args.unitId } : {}),
      }
    }

    try {
      await update(payload)
    } catch (error) {
      console.error('Falha ao renovar sessão com o backend', error)
    }
  }

  return { refresh }
}
