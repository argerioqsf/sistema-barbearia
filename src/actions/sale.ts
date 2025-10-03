'use server'

import { ZSaleItem } from '@/features/saleItems/schema'
import {
  fetchSale,
  createSale,
  updateSale,
  updateSaleCoupon,
  paySale,
  updateSaleClient,
  fetchSalesPaginated,
  fetchSalesAll,
  removeOrAddSaleItems,
  updateCouponSaleItem,
  updateQuantitySaleItem,
  updateCustomPriceSaleItem,
  updateBarberSaleItem,
} from '@/features/sales/api'
import {
  BodyPaySale,
  BodyUpdateBarberSaleItem,
  BodyUpdateCouponSaleItem,
  BodyUpdateCustomPriceSaleItem,
  BodyUpdateQuantitySaleItem,
  BodyUpdateSaleCoupon,
  type ZSale as Sale,
  type ZSale,
} from '@/features/sales/schemas'
import { handleRequestError } from '@/shared/errors/handlerRequestError'
import type { InitialState, ReturnRequest } from '@/types/general'
import { ReturnListPaginated } from '@/types/http'

export async function createSaleAction(
  clientId: string,
  observation: string,
): Promise<ReturnRequest<Sale>> {
  try {
    const newSale = await createSale({ clientId, observation, method: 'CASH' })
    return { ok: true, data: newSale }
  } catch (e) {
    const normalized = handleRequestError(e, {
      rethrow: false,
    })
    return { ok: false, error: normalized }
  }
}

export async function listSales(
  page?: string,
  where?: Partial<Sale>,
): Promise<ReturnRequest<ZSale[]>> {
  try {
    const saleList = await fetchSalesAll(page, {
      ...where,
    })
    return { ok: true, data: saleList }
  } catch (err) {
    const normalized = handleRequestError(err, {
      rethrow: false,
    })
    return { ok: false, error: normalized }
  }
}

export async function listSalesPaginate(
  page?: string,
  where?: Partial<ZSale>,
): Promise<ReturnRequest<ReturnListPaginated<ZSale>>> {
  try {
    const saleList = await fetchSalesPaginated(page, {
      withCount: true,
      perPage: 10,
      ...where,
    })
    return { ok: true, data: saleList }
  } catch (err) {
    const normalized = handleRequestError(err, {
      rethrow: false,
    })
    return { ok: false, error: normalized }
  }
}

export async function getSale(id: string): Promise<ReturnRequest<ZSale>> {
  try {
    const sale = await fetchSale(id)
    return { ok: true, data: sale }
  } catch (e) {
    const normalized = handleRequestError(e, {
      rethrow: false,
    })
    return { ok: false, error: normalized }
  }
}

export async function patchSale(
  id: string,
  prev: InitialState<Sale>,
  formData: FormData,
): Promise<ReturnRequest<ZSale>> {
  try {
    const data = await updateSale(id, formData)
    return { ok: true, data }
  } catch (e) {
    const normalized = handleRequestError(e, {
      rethrow: false,
    })
    return { ok: false, error: normalized }
  }
}

export async function addSaleItemsAction(
  id: string,
  items: Partial<ZSaleItem>[],
): Promise<ReturnRequest<ZSale>> {
  try {
    await removeOrAddSaleItems(id, { addItems: items })
    const data = await fetchSale(id)
    return { ok: true, data }
  } catch (e) {
    const normalized = handleRequestError(e, {
      rethrow: false,
    })
    return { ok: false, error: normalized }
  }
}

export async function removeSaleItemsAction(
  id: string,
  itemIds: string[],
): Promise<ReturnRequest<ZSale>> {
  try {
    await removeOrAddSaleItems(id, { removeItemIds: itemIds })
    const data = await fetchSale(id)
    return { ok: true, data }
  } catch (e) {
    const normalized = handleRequestError(e, {
      rethrow: false,
    })
    return { ok: false, error: normalized }
  }
}

export async function updateSaleClientAction(
  id: string,
  clientId: string,
): Promise<ReturnRequest<Sale>> {
  try {
    await updateSaleClient(id, { clientId })
    const data = await fetchSale(id)
    return { ok: true, data }
  } catch (e) {
    const normalized = handleRequestError(e, {
      rethrow: false,
    })
    return { ok: false, error: normalized }
  }
}

export async function updateSaleCouponAction(
  id: string,
  body: BodyUpdateSaleCoupon,
): Promise<ReturnRequest<ZSale>> {
  try {
    const data = await updateSaleCoupon(id, body)
    return { ok: true, data }
  } catch (e) {
    const normalized = handleRequestError(e, {
      rethrow: false,
    })
    return { ok: false, error: normalized }
  }
}

export async function paySaleAction(
  id: string,
  body: BodyPaySale,
): Promise<ReturnRequest<ZSale>> {
  try {
    await paySale(id, body)
    const data = await fetchSale(id)
    return { ok: true, data }
  } catch (e) {
    const normalized = handleRequestError(e, {
      rethrow: false,
    })
    return { ok: false, error: normalized }
  }
}

export async function updateCouponSaleItemAction(
  saleItemId: string,
  body: BodyUpdateCouponSaleItem,
): Promise<ReturnRequest<ZSaleItem[] | undefined>> {
  try {
    console.log('body updateCouponSaleItemAction: ', body)
    const data = await updateCouponSaleItem(saleItemId, body)
    return { ok: true, data: data.saleItems }
  } catch (e) {
    const normalized = handleRequestError(e, {
      rethrow: false,
    })
    return { ok: false, error: normalized }
  }
}

export async function updateQuantitySaleItemAction(
  saleItemId: string,
  body: BodyUpdateQuantitySaleItem,
): Promise<ReturnRequest<ZSaleItem[] | undefined>> {
  try {
    console.log('body updateQuantitySaleItemAction: ', body)
    const data = await updateQuantitySaleItem(saleItemId, body)
    return { ok: true, data: data.saleItems }
  } catch (e) {
    const normalized = handleRequestError(e, {
      rethrow: false,
    })
    return { ok: false, error: normalized }
  }
}

export async function updateCustomPriceSaleItemAction(
  saleItemId: string,
  body: BodyUpdateCustomPriceSaleItem,
): Promise<ReturnRequest<ZSaleItem[] | undefined>> {
  try {
    console.log('body updateCustomPriceSaleItemAction: ', body)
    const data = await updateCustomPriceSaleItem(saleItemId, body)
    return { ok: true, data: data.saleItems }
  } catch (e) {
    const normalized = handleRequestError(e, {
      rethrow: false,
    })
    return { ok: false, error: normalized }
  }
}

export async function updateBarberSaleItemAction(
  saleItemId: string,
  body: BodyUpdateBarberSaleItem,
): Promise<ReturnRequest<ZSaleItem[] | undefined>> {
  try {
    console.log('body updateBarberSaleItemAction: ', body)
    const data = await updateBarberSaleItem(saleItemId, body)
    return { ok: true, data: data.saleItems }
  } catch (e) {
    const normalized = handleRequestError(e, {
      rethrow: false,
    })
    return { ok: false, error: normalized }
  }
}
