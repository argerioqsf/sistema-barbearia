'use client'

import { useSession } from 'next-auth/react'

type ApplyArgs = {
  token?: string
  unitId?: string
}

type UseTokenSyncResult = {
  apply: (args: ApplyArgs) => Promise<void>
}

export function useTokenSync(): UseTokenSyncResult {
  const { update, data } = useSession()

  async function apply({ token, unitId }: ApplyArgs) {
    if (!token && !unitId) return

    const payload: Record<string, unknown> = {}
    if (token) payload.accessToken = token

    if (unitId || data?.user) {
      payload.user = {
        ...(data?.user ?? {}),
        ...(unitId ? { unitId } : {}),
      }
    }

    try {
      await update(payload)
    } catch (error) {
      console.error('Falha ao atualizar sessão com novo token', error)
    }
  }

  return { apply }
}
