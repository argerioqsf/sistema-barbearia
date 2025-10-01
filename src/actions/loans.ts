'use server'

import { InitialState, ReturnList } from '@/types/general'
import type { ZLoan } from '@/features/loans/schemas'
import {
  createLoan as createLoanAPI,
  listUserLoans as listUserLoansAPI,
  updateLoanStatus as updateLoanStatusAPI,
  payLoan as payLoanAPI,
} from '@/features/loans/api'
import { toNormalizedError } from '@/shared/errors/to-normalized-error'

export async function listUserLoans(
  userId: string,
): Promise<ReturnList<ZLoan>> {
  try {
    const loans = await listUserLoansAPI(userId)
    return { response: loans }
  } catch (error) {
    return { error: toNormalizedError('Error unknown') }
  }
}

export async function createLoan(
  _prev: InitialState<ZLoan>,
  formData: FormData,
): Promise<InitialState<ZLoan>> {
  try {
    const amount = Number(formData.get('amount') ?? 0)
    await createLoanAPI(amount)
    return { ok: true, errors: {} }
  } catch {
    return { errors: { request: 'Failed to create loan' } }
  }
}

export async function setLoanStatus(
  id: string,
  _prev: InitialState<ZLoan>,
  formData: FormData,
): Promise<InitialState<ZLoan>> {
  try {
    const status = String(formData.get('status') ?? '')
    await updateLoanStatusAPI(id, status)
    return { ok: true, errors: {} }
  } catch {
    return { errors: { request: 'Failed to update loan status' } }
  }
}

export async function payLoan(
  id: string,
  _prev: InitialState<ZLoan>,
  formData: FormData,
): Promise<InitialState<ZLoan>> {
  try {
    const amount = Number(formData.get('amount') ?? 0)
    await payLoanAPI(id, amount)
    return { ok: true, errors: {} }
  } catch {
    return { errors: { request: 'Failed to pay loan' } }
  }
}
