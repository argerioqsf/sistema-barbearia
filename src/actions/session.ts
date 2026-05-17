'use server'

import { api } from '@/data/api'
import { getBackendToken } from '@/utils/authServer'
import { readMessage } from '@/shared/http'
import { revalidateTag } from 'next/cache'

type ChangeUnitResult = {
  ok: boolean
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

    if (!response.ok) {
      const message = await readMessage(response)
      return { ok: false, error: message }
    }

    revalidateTag('users')
    revalidateTag('units')
    return { ok: true }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Erro ao alterar unidade'
    return { ok: false, error: message }
  }
}
