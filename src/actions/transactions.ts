'use server'

import { InitialState, ReturnList } from '@/types/general'
import {
  createTransaction as createTransactionAPI,
  listPending as listPendingAPI,
} from '@/features/transactions/api'
import type { ZTransaction } from '@/features/transactions/schemas'
import { toNormalizedError } from '@/shared/errors/to-normalized-error'

export async function listPendingTransactions(
  userId: string,
): Promise<ReturnList<ZTransaction>> {
  try {
    const transactions = await listPendingAPI(userId)
    return { response: transactions }
  } catch {
    return { error: toNormalizedError('Error unknown') }
  }
}

export async function createTransaction(
  _prev: InitialState<ZTransaction>,
  formData: FormData,
): Promise<InitialState<ZTransaction>> {
  try {
    await createTransactionAPI(formData)
    return { ok: true, errors: {} }
  } catch {
    return { errors: { request: 'Failed to create transaction' } }
  }
}
