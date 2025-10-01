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
import type { JsonObject, QueryParams } from '@/types/http'
import { toNormalizedError } from '@/shared/errors/to-normalized-error'

export async function listDebts(
  page?: string,
  where?: QueryParams<Debt>,
): Promise<ReturnList<Debt>> {
  try {
    const params: QueryParams<Debt> | undefined =
      page || where ? { ...(where ?? {}), page } : undefined
    const { items, count } = await fetchDebts(params)
    return { response: items as Debt[], count }
  } catch (e) {
    return {
      error: toNormalizedError(
        e instanceof Error ? e.message : 'Error unknown',
      ),
    }
  }
}

export async function getDebt(id: string) {
  try {
    const debt = await fetchDebt(id)
    return { response: debt }
  } catch (e) {
    return {
      error: toNormalizedError(
        e instanceof Error ? e.message : 'Error unknown',
      ),
    }
  }
}

export async function registerDebt(
  prev: InitialState<Debt>,
  formData: FormData,
) {
  try {
    const body = Object.fromEntries(formData.entries()) as JsonObject
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
    const body = Object.fromEntries(formData.entries()) as JsonObject
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
    const body = Object.fromEntries(formData.entries()) as JsonObject
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
