'use server'

import {
  fetchSale,
  fetchSales,
  createSale,
  updateSale,
  updateSaleItems,
  updateSaleCoupon,
  paySale,
  updateSaleClient,
  updateSaleItem,
} from '@/features/sales/api'
import type { ZSale as Sale } from '@/features/sales/schemas'
import type { InitialState, ReturnList } from '@/types/general'

export async function listSales(
  page?: string,
  where?: Partial<Sale>,
): Promise<ReturnList<Sale>> {
  try {
    const { items, count } = await fetchSales({
      page,
      ...(where as Record<string, unknown>),
    })
    return { response: items as Sale[], count }
  } catch (e) {
    return {
      error: { request: e instanceof Error ? e.message : 'Error unknown' },
    }
  }
}

export async function getSale(id: string) {
  try {
    const sale = await fetchSale(id)
    return { response: sale }
  } catch (e) {
    return {
      error: { request: e instanceof Error ? e.message : 'Error unknown' },
    }
  }
}

export async function registerSale(
  prev: InitialState<Sale>,
  formData: FormData,
) {
  try {
    const body = Object.fromEntries(formData.entries())
    await createSale(body)
    return { ok: true, errors: {} }
  } catch (e) {
    return {
      errors: {
        request: e instanceof Error ? e.message : 'Failed to create sale',
      },
    }
  }
}

export async function patchSale(
  id: string,
  prev: InitialState<Sale>,
  formData: FormData,
) {
  try {
    const body = Object.fromEntries(formData.entries())
    await updateSale(id, body)
    return { ok: true, errors: {} }
  } catch (e) {
    return {
      errors: {
        request: e instanceof Error ? e.message : 'Failed to update sale',
      },
    }
  }
}

export async function patchSaleItems(
  id: string,
  prev: InitialState<Sale>,
  formData: FormData,
) {
  try {
    const body = Object.fromEntries(formData.entries())
    await updateSaleItems(id, body)
    return { ok: true, errors: {} }
  } catch (e) {
    return {
      errors: {
        request: e instanceof Error ? e.message : 'Failed to update sale items',
      },
    }
  }
}

export async function patchSaleCoupon(
  id: string,
  prev: InitialState<Sale>,
  formData: FormData,
) {
  try {
    const body = Object.fromEntries(formData.entries())
    await updateSaleCoupon(id, body)
    return { ok: true, errors: {} }
  } catch (e) {
    return {
      errors: {
        request: e instanceof Error ? e.message : 'Failed to apply coupon',
      },
    }
  }
}

export async function patchSalePay(
  id: string,
  prev: InitialState<Sale>,
  formData: FormData,
) {
  try {
    const body = Object.fromEntries(formData.entries())
    await paySale(id, body)
    return { ok: true, errors: {} }
  } catch (e) {
    return {
      errors: {
        request: e instanceof Error ? e.message : 'Failed to pay sale',
      },
    }
  }
}

export async function patchSaleClient(
  id: string,
  prev: InitialState<Sale>,
  formData: FormData,
) {
  try {
    const body = Object.fromEntries(formData.entries())
    await updateSaleClient(id, body)
    return { ok: true, errors: {} }
  } catch (e) {
    return {
      errors: {
        request:
          e instanceof Error ? e.message : 'Failed to update sale client',
      },
    }
  }
}

export async function patchSaleItem(
  id: string,
  prev: InitialState<Sale>,
  formData: FormData,
) {
  try {
    const body = Object.fromEntries(formData.entries())
    await updateSaleItem(id, body)
    return { ok: true, errors: {} }
  } catch (e) {
    return {
      errors: {
        request: e instanceof Error ? e.message : 'Failed to update sale item',
      },
    }
  }
}
