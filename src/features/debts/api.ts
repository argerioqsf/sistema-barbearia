import { api } from '@/data/api'
import { getBackendToken } from '@/utils/authServer'
import { DebtSchema, DebtsListResponseSchema, type ZDebt } from './schemas'
import { safeJson, readMessage } from '@/shared/http'

export async function fetchDebts(params?: Record<string, unknown>): Promise<{
  items: ZDebt[]
  count?: number
  page?: number
  perPage?: number
}> {
  const token = await getBackendToken()
  const response = await api(
    '/debts',
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
      next: { tags: ['debts'], revalidate: 60 * 4 },
    },
    String(params?.page ?? ''),
    params,
  )
  if (!response.ok) throw new Error(await readMessage(response))
  const json = await safeJson(response)
  if (Array.isArray(json))
    return { items: json.map((i) => DebtSchema.parse(i)) }
  return DebtsListResponseSchema.parse(json)
}

export async function fetchDebt(id: string) {
  const token = await getBackendToken()
  const response = await api(`/debts/${id}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!response.ok) throw new Error(await readMessage(response))
  return DebtSchema.parse(await safeJson(response))
}

export async function createDebt(body: Record<string, unknown>) {
  const token = await getBackendToken()
  const response = await api('/debts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })
  if (!response.ok) throw new Error(await readMessage(response))
  return DebtSchema.parse(await safeJson(response))
}

export async function updateDebt(id: string, body: Record<string, unknown>) {
  const token = await getBackendToken()
  const response = await api(`/debts/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })
  if (!response.ok) throw new Error(await readMessage(response))
  return DebtSchema.parse(await safeJson(response))
}

export async function payDebt(id: string, body: Record<string, unknown>) {
  const token = await getBackendToken()
  const response = await api(`/debts/${id}/pay`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })
  if (!response.ok) throw new Error(await readMessage(response))
  return await safeJson(response)
}

export async function deleteDebt(id: string) {
  const token = await getBackendToken()
  const response = await api(`/debts/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!response.ok) throw new Error(await readMessage(response))
  return {}
}
