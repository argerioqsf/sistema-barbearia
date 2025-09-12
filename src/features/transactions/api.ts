import { api } from '@/data/api'
import { getBackendToken } from '@/utils/authServer'
import {
  TransactionsListSchema,
  TransactionSchema,
  type ZTransaction,
} from './schemas'
import { readMessage, safeJson } from '@/shared/http'

export async function createTransaction(form: FormData): Promise<ZTransaction> {
  const token = await getBackendToken()
  const response = await api('/pay/transactions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  })
  if (!response.ok) throw new Error(await readMessage(response))
  return TransactionSchema.parse(await safeJson(response))
}

export async function listPending(userId: string): Promise<ZTransaction[]> {
  const token = await getBackendToken()
  const response = await api(`/pay/pending/${userId}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
    next: { tags: ['transactions', 'pending', userId], revalidate: 60 * 2 },
  })
  if (!response.ok) throw new Error(await readMessage(response))
  const json = await safeJson(response)
  if (Array.isArray(json)) return json.map((i) => TransactionSchema.parse(i))
  return TransactionsListSchema.parse(json).transactions
}

export async function listTransactions(page?: string) {
  const token = await getBackendToken()
  const response = await api(
    '/transactions',
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
      next: { tags: ['transactions'], revalidate: 60 * 2 },
    },
    page,
  )
  if (!response.ok) throw new Error(await readMessage(response))
  const json = await safeJson(response)
  if (Array.isArray(json))
    return { transactions: json.map((i) => TransactionSchema.parse(i)) }
  return TransactionsListSchema.parse(json)
}
