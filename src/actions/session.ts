'use server'

import { api } from '@/data/api'
import { getBackendToken } from '@/utils/authServer'
import { extractNewToken, readMessage } from '@/shared/http'
import { revalidateTag } from 'next/cache'
import { logger } from '@/shared/logger'

type ChangeUnitResult = {
  ok: boolean
  token?: string
  error?: string
}

export async function changeActiveUnit(
  unitId: string,
): Promise<ChangeUnitResult> {
  if (!unitId) {
    return { ok: false, error: 'unitId obrigatório' }
  }

  try {
    const token = await getBackendToken()
    if (!token) {
      return { ok: false, error: 'Credenciais inválidas' }
    }

    const response = await api('/sessions/unit', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ unitId }),
    })
    logger.debug({ response }, 'response changeActiveUnit')

    if (!response.ok) {
      const message = await readMessage(response)
      return { ok: false, error: message }
    }

    const tokenUpdated = extractNewToken(response)

    revalidateTag('users')
    revalidateTag('units')
    return { ok: true, token: tokenUpdated }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Erro ao alterar unidade'
    return { ok: false, error: message }
  }
}
