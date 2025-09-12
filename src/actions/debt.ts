'use server'

import type { ZDebt as Debt } from '@/features/debts/schemas'
import {
  fetchDebts,
  fetchDebt,
  createDebt,
  updateDebt,
  payDebt,
  deleteDebt,
} from '@/features/debts/api'
import type { InitialState, ReturnList } from '@/types/general'

export async function listDebts(
  page?: string,
  where?: Partial<Debt>,
): Promise<ReturnList<Debt>> {
  try {
    const { items, count } = await fetchDebts({
      page,
      ...(where as Record<string, unknown>),
    })
    return { response: items as Debt[], count }
  } catch (e) {
    return {
      error: { request: e instanceof Error ? e.message : 'Error unknown' },
    }
  }
}

export async function getDebt(id: string) {
  try {
    const debt = await fetchDebt(id)
    return { response: debt }
  } catch (e) {
    return {
      error: { request: e instanceof Error ? e.message : 'Error unknown' },
    }
  }
}

export async function registerDebt(
  prev: InitialState<Debt>,
  formData: FormData,
) {
  try {
    const body = Object.fromEntries(formData.entries())
    await createDebt(body)
    return { ok: true, errors: {} }
  } catch (e) {
    return {
      errors: {
        request: e instanceof Error ? e.message : 'Failed to create debt',
      },
    }
  }
}

export async function patchDebt(
  id: string,
  prev: InitialState<Debt>,
  formData: FormData,
) {
  try {
    const body = Object.fromEntries(formData.entries())
    await updateDebt(id, body)
    return { ok: true, errors: {} }
  } catch (e) {
    return {
      errors: {
        request: e instanceof Error ? e.message : 'Failed to update debt',
      },
    }
  }
}

export async function patchDebtPay(
  id: string,
  prev: InitialState<Debt>,
  formData: FormData,
) {
  try {
    const body = Object.fromEntries(formData.entries())
    await payDebt(id, body)
    return { ok: true, errors: {} }
  } catch (e) {
    return {
      errors: {
        request: e instanceof Error ? e.message : 'Failed to pay debt',
      },
    }
  }
}

export async function removeDebt(id: string) {
  try {
    await deleteDebt(id)
    return { ok: true, errors: {} }
  } catch (e) {
    return {
      errors: {
        request: e instanceof Error ? e.message : 'Failed to delete debt',
      },
    }
  }
}
