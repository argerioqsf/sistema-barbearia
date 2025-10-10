'use server'

import { InitialState, ReturnRequest } from '@/types/general'
import { handleRequestError } from '@/shared/errors/handlerRequestError'
import {
  createCommissionPayment,
  listTransactionsAll,
} from '@/features/transactions/api'
import type { ZTransaction } from '@/features/transactions/schemas'
import { revalidateTag } from 'next/cache'

export async function listTransactionsAction(
  page?: string,
  // where?: QueryParams<ZTransaction>,
): Promise<ReturnRequest<ZTransaction[]>> {
  try {
    const transactionsList = await listTransactionsAll(page)
    return { ok: true, data: transactionsList }
  } catch (error) {
    const normalized = handleRequestError(error, {
      rethrow: false,
    })
    return { ok: false, error: normalized }
  }
}

export async function payCommissionAction(
  prevState: InitialState<unknown>,
  formData: FormData,
): Promise<ReturnRequest<unknown>> {
  try {
    const rawData = {
      affectedUserId: formData.get('affectedUserId') as string,
      paymentMode: formData.get('paymentMode') as 'amount' | 'items',
      amount: Number(formData.get('amount')) || undefined,
      description: (formData.get('description') as string) || '',
      discountLoans: formData.get('discountLoans') === 'on',
      receipt: formData.get('receipt'),
      // These are expected to be JSON strings from hidden inputs
      saleItemIds: JSON.parse((formData.get('saleItemIds') as string) || '[]'),
      appointmentIds: JSON.parse(
        (formData.get('appointmentIds') as string) || '[]',
      ),
    }

    const data = await createCommissionPayment(rawData)

    // Revalidate tags for user balance, transactions, etc.
    revalidateTag('transactions')
    revalidateTag(`user-${rawData.affectedUserId}`)

    return { ok: true, data }
  } catch (e) {
    const normalized = handleRequestError(e, {
      rethrow: false,
    })
    return { ok: false, error: normalized }
  }
}
