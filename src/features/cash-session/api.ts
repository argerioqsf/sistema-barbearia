import { api } from '@/data/api'
import { getBackendToken } from '@/utils/authServer'
import {
  CashSessionSchema,
  CashSessionsListResponseSchema,
  type ZCashSession,
} from './schemas'
import { readMessage, safeJson } from '@/shared/http'

export async function openCashSession(
  initialAmount: number,
): Promise<ZCashSession> {
  const token = await getBackendToken()
  const response = await api('/cash-session/open', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ initialAmount }),
  })
  console.log('response 1', response)
  if (!response.ok) throw new Error(await readMessage(response))
  console.log('response', response)
  const json = await safeJson(response)
  console.log('json', json)
  const parse = CashSessionSchema.safeParse(json)
  if (!parse.success) throw new Error('Invalid Cash Session response')
  console.log('parsed', parse.data)
  return parse.data
}

export async function closeCashSession(): Promise<ZCashSession> {
  const token = await getBackendToken()
  const response = await api('/cash-session/close', {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!response.ok) throw new Error(await readMessage(response))
  return CashSessionSchema.parse(await safeJson(response))
}

export async function getCashSession(): Promise<ZCashSession[]> {
  const token = await getBackendToken()
  const response = await api('/cash-session', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
    next: { tags: ['cash-session'], revalidate: 60 * 2 },
  })
  if (!response.ok) throw new Error(await readMessage(response))
  console.log('response', response)
  const json = await safeJson(response)
  console.log('json', json)
  const parsed = CashSessionsListResponseSchema.safeParse(json)
  if (!parsed.success) throw new Error('Invalid products list response')
  console.log('parsed', parsed)
  return parsed.data
}
