import { api } from '@/data/api'
import { getBackendToken } from '@/utils/authServer'
import {
  TransactionsListSchema,
  TransactionSchema,
  type ZTransaction,
} from './schemas'
import { readMessage, safeJson } from '@/shared/http'
import { PayCommissionBody, PayCommissionFormSchema } from './schemas'
import { ValidationError } from '@/shared/errors/validationError'
import { HttpError } from '@/shared/errors/httpError'
import { logger } from '@/shared/logger'

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
  return TransactionsListSchema.parse(json)
}

export async function listTransactionsAll(
  page?: string,
): Promise<ZTransaction[]> {
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
  if (!response.ok) {
    const message = await readMessage(response)
    throw new HttpError(response.status, message)
  }
  const json = await safeJson(response)
  const parsed = TransactionsListSchema.safeParse(json)

  if (!parsed.success) {
    logger.debug({ errors: parsed.error }, 'errors parsed listTransactionsAll')
    throw ValidationError.fromZod(
      parsed.error,
      'Invalid response when list transactions',
    )
  }

  return parsed.data
}

export async function createCommissionPayment(body: PayCommissionBody) {
  const validatedFields = PayCommissionFormSchema.safeParse(body)

  if (!validatedFields.success) {
    logger.debug(
      { errors: validatedFields.error },
      'errors createCommissionPayment',
    )
    throw ValidationError.fromZod(
      validatedFields.error,
      'Invalid body for creating commission payment',
    )
  }

  const formData = new FormData()
  const { receipt, saleItemIds, appointmentIds, ...otherData } =
    validatedFields.data

  // Append simple key-value pairs
  Object.entries(otherData).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, String(value))
    }
  })

  // Append arrays as JSON strings, as per backend-endpoints.md
  if (saleItemIds && saleItemIds.length > 0) {
    formData.append('saleItemIds', JSON.stringify(saleItemIds))
  }
  if (appointmentIds && appointmentIds.length > 0) {
    formData.append('appointmentServiceIds', JSON.stringify(appointmentIds)) // Note the key name change
  }

  // Append the file if it exists
  if (receipt instanceof File) {
    formData.append('receipt', receipt)
  }

  const token = await getBackendToken()
  const response = await api('/pay/transactions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })

  if (!response.ok) {
    const message = await readMessage(response)
    throw new HttpError(response.status, message)
  }

  return response.json()
}
