import { api } from '@/data/api'
import { getBackendToken } from '@/utils/authServer'
import {
  BodyPaySale,
  bodyPaySaleSchema,
  BodyRegisterSale,
  BodyRemoveOrAddSaleItem,
  bodyRemoveOrAddSaleItemSchema,
  BodyUpdateBarberSaleItem,
  bodyUpdateBarberSaleItemSchema,
  BodyUpdateClientSale,
  bodyUpdateClientSaleSchema,
  BodyUpdateCouponSaleItem,
  bodyUpdateCouponSaleItemSchema,
  BodyUpdateCustomPriceSaleItem,
  bodyUpdateCustomPriceSaleItemSchema,
  BodyUpdateQuantitySaleItem,
  bodyUpdateQuantitySaleItemSchema,
  BodyUpdateSaleCoupon,
  bodyUpdateSaleCouponSchema,
  formSchemaRegisterSale,
  SaleGetResponseSchema,
  SaleSchema,
  SalesListPaginateResponseSchema,
  SalesListResponseSchema,
  UpdateSaleItemResponseSchema,
  ZUpdateSaleItemResponseSchema,
  type ZSale,
} from './schemas'
import { safeJson, readMessage } from '@/shared/http'
import type { QueryParams, ReturnListPaginated } from '@/types/http'
import { revalidateTag } from 'next/cache'
import { HttpError } from '@/shared/errors/httpError'
import { ValidationError } from '@/shared/errors/validationError'

export async function fetchSalesAll(
  page?: string,
  params?: QueryParams<ZSale, false>,
): Promise<ZSale[]> {
  const token = await getBackendToken()
  const response = await api(
    '/sales',
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
      next: { tags: ['sales'], revalidate: 60 * 4 },
    },
    page,
    params,
  )
  if (!response.ok) {
    const message = await readMessage(response)
    throw new HttpError(response.status, message)
  }
  const json = await safeJson(response)
  const parsed = SalesListResponseSchema.safeParse(json)
  if (!parsed.success) {
    throw ValidationError.fromZod(parsed.error, 'Invalid response list sales')
  }
  return parsed.data
}

export async function fetchSalesPaginated(
  page?: string,
  params?: QueryParams<ZSale, true>,
): Promise<ReturnListPaginated<ZSale>> {
  const token = await getBackendToken()
  const response = await api(
    '/sales',
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
      next: { tags: ['sales'], revalidate: 60 * 4 },
    },
    page,
    params,
  )
  if (!response.ok) {
    const message = await readMessage(response)
    throw new HttpError(response.status, message)
  }
  const json = await safeJson(response)
  const parsed = SalesListPaginateResponseSchema.safeParse(json)
  if (!parsed.success) {
    throw ValidationError.fromZod(
      parsed.error,
      'Invalid response list paginated sales',
    )
  }
  return parsed.data
}

export async function fetchSale(id: string): Promise<ZSale> {
  const token = await getBackendToken()
  const response = await api(`/sales/${id}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
    next: { tags: [id, 'sales'], revalidate: 60 * 4 },
  })
  if (!response.ok) {
    const message = await readMessage(response)
    throw new HttpError(response.status, message)
  }
  const json = await safeJson(response)
  const parsed = SaleGetResponseSchema.safeParse(json)
  if (!parsed.success) {
    throw ValidationError.fromZod(parsed.error, 'Invalid response get sale')
  }
  return parsed.data
}

export async function createSale(body: BodyRegisterSale): Promise<ZSale> {
  const validatedFields = formSchemaRegisterSale.safeParse({
    observation: body.observation,
    method: body.method,
  })
  if (!validatedFields.success) {
    throw ValidationError.fromZod(
      validatedFields.error,
      'Invalid body request create sale',
    )
  }

  const token = await getBackendToken()
  const response = await api('/sales', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })
  if (!response.ok) {
    const message = await readMessage(response)
    throw new HttpError(response.status, message)
  }
  const json = await safeJson(response)
  const parsed = SaleSchema.safeParse(json)
  if (!parsed.success) {
    throw ValidationError.fromZod(parsed.error, 'Invalid response create sale')
  }
  return parsed.data
}

export async function updateSale(id: string, body: FormData): Promise<ZSale> {
  const validatedFields = formSchemaRegisterSale.safeParse({
    observation: body.get('observation'),
    method: body.get('method'),
  })
  if (!validatedFields.success) {
    throw ValidationError.fromZod(
      validatedFields.error,
      'Invalid body request update sale',
    )
  }

  const token = await getBackendToken()
  const response = await api(`/sales/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const message = await readMessage(response)
    throw new HttpError(response.status, message)
  }
  if (!response.ok) {
    const message = await readMessage(response)
    throw new HttpError(response.status, message)
  }
  const json = await safeJson(response)
  const parsed = SaleSchema.safeParse(json)
  if (!parsed.success) {
    throw ValidationError.fromZod(parsed.error, 'Invalid response update sale')
  }
  return parsed.data
}

export async function removeOrAddSaleItems(
  id: string,
  body: BodyRemoveOrAddSaleItem,
): Promise<ZSale> {
  const validatedFields = bodyRemoveOrAddSaleItemSchema.safeParse({
    addItems: body.addItems,
    removeItemIds: body.removeItemIds,
  })
  if (!validatedFields.success) {
    throw ValidationError.fromZod(
      validatedFields.error,
      'Invalid body request remove or add saleItem',
    )
  }

  const token = await getBackendToken()
  const response = await api(`/sales/${id}/saleItems`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })
  if (!response.ok) {
    const message = await readMessage(response)
    throw new HttpError(response.status, message)
  }
  const json = await safeJson(response)
  const parsed = SaleSchema.safeParse(json)
  if (!parsed.success) {
    throw ValidationError.fromZod(
      parsed.error,
      'Invalid response remove or add saleItem',
    )
  }
  revalidateTag('sales')
  revalidateTag(id)
  return parsed.data
}

export async function updateSaleCoupon(
  id: string,
  body: BodyUpdateSaleCoupon,
): Promise<ZSale> {
  const validatedFields = bodyUpdateSaleCouponSchema.safeParse({
    couponCode: body.couponCode,
    removeCoupon: body.removeCoupon,
  })
  if (!validatedFields.success) {
    throw ValidationError.fromZod(
      validatedFields.error,
      'Invalid body request update sale coupon',
    )
  }

  const token = await getBackendToken()
  const response = await api(`/sales/${id}/coupon`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const message = await readMessage(response)
    throw new HttpError(response.status, message)
  }
  const json = await safeJson(response)
  const parsed = SaleSchema.safeParse(json)
  if (!parsed.success) {
    throw ValidationError.fromZod(
      parsed.error,
      'Invalid response update sale coupon',
    )
  }
  revalidateTag('sales')
  revalidateTag(id)
  return parsed.data
}

export async function paySale(id: string, body: BodyPaySale): Promise<ZSale> {
  const validatedFields = bodyPaySaleSchema.safeParse({
    method: body.method,
  })
  if (!validatedFields.success) {
    throw ValidationError.fromZod(
      validatedFields.error,
      'Invalid body request pay sale',
    )
  }

  const token = await getBackendToken()
  const response = await api(`/sales/${id}/pay`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const message = await readMessage(response)
    throw new HttpError(response.status, message)
  }
  const json = await safeJson(response)
  const parsed = SaleSchema.safeParse(json)
  if (!parsed.success) {
    throw ValidationError.fromZod(parsed.error, 'Invalid response pay sale')
  }
  revalidateTag('sales')
  revalidateTag(id)
  return parsed.data
}

export async function updateSaleClient(
  id: string,
  body: BodyUpdateClientSale,
): Promise<ZSale> {
  const validatedFields = bodyUpdateClientSaleSchema.safeParse({
    clientId: body.clientId,
  })
  if (!validatedFields.success) {
    throw ValidationError.fromZod(
      validatedFields.error,
      'Invalid body request update client sale',
    )
  }

  const token = await getBackendToken()
  const response = await api(`/sales/${id}/client`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const message = await readMessage(response)
    throw new HttpError(response.status, message)
  }
  const json = await safeJson(response)
  const parsed = SaleSchema.safeParse(json)
  if (!parsed.success) {
    throw ValidationError.fromZod(
      parsed.error,
      'Invalid response update client sale',
    )
  }
  revalidateTag('sales')
  revalidateTag(id)
  return parsed.data
}

export async function updateCouponSaleItem(
  id: string,
  body: BodyUpdateCouponSaleItem,
): Promise<ZUpdateSaleItemResponseSchema> {
  const validatedFields = bodyUpdateCouponSaleItemSchema.safeParse({
    couponId: body.couponId,
    couponCode: body.couponCode,
  })
  if (!validatedFields.success) {
    throw ValidationError.fromZod(
      validatedFields.error,
      'Invalid body request update coupon sale item',
    )
  }

  const token = await getBackendToken()
  const bodyParsed = JSON.stringify(body)
  console.log('bodyParsed updateCouponSaleItem: ', bodyParsed)
  const response = await api(`/sales/saleItem/${id}/coupon`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: bodyParsed,
  })
  if (!response.ok) {
    const message = await readMessage(response)
    throw new HttpError(response.status, message)
  }
  const json = await safeJson(response)
  const parsed = UpdateSaleItemResponseSchema.safeParse(json)
  if (!parsed.success) {
    throw ValidationError.fromZod(
      parsed.error,
      'Invalid response update coupon sale item',
    )
  }
  revalidateTag('sales')
  revalidateTag(id)
  return parsed.data
}

export async function updateQuantitySaleItem(
  id: string,
  body: BodyUpdateQuantitySaleItem,
): Promise<ZUpdateSaleItemResponseSchema> {
  const validatedFields = bodyUpdateQuantitySaleItemSchema.safeParse({
    quantity: body.quantity,
  })
  if (!validatedFields.success) {
    throw ValidationError.fromZod(
      validatedFields.error,
      'Invalid body request update Quantity sale item',
    )
  }

  const token = await getBackendToken()
  const bodyParsed = JSON.stringify(body)
  const response = await api(`/sales/saleItem/${id}/quantity`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: bodyParsed,
  })
  if (!response.ok) {
    const message = await readMessage(response)
    throw new HttpError(response.status, message)
  }
  const json = await safeJson(response)
  const parsed = UpdateSaleItemResponseSchema.safeParse(json)
  if (!parsed.success) {
    throw ValidationError.fromZod(
      parsed.error,
      'Invalid response update Quantity sale item',
    )
  }
  revalidateTag('sales')
  revalidateTag(id)
  return parsed.data
}

export async function updateCustomPriceSaleItem(
  id: string,
  body: BodyUpdateCustomPriceSaleItem,
): Promise<ZUpdateSaleItemResponseSchema> {
  const validatedFields = bodyUpdateCustomPriceSaleItemSchema.safeParse({
    customPrice: body.customPrice,
  })
  if (!validatedFields.success) {
    throw ValidationError.fromZod(
      validatedFields.error,
      'Invalid body request update custom price sale item',
    )
  }
  const token = await getBackendToken()
  const bodyParsed = JSON.stringify(body)
  const response = await api(`/sales/saleItem/${id}/custom-price`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: bodyParsed,
  })
  if (!response.ok) {
    const message = await readMessage(response)
    throw new HttpError(response.status, message)
  }
  const json = await safeJson(response)
  const parsed = UpdateSaleItemResponseSchema.safeParse(json)
  if (!parsed.success) {
    throw ValidationError.fromZod(
      parsed.error,
      'Invalid response update custom price sale item',
    )
  }
  revalidateTag('sales')
  revalidateTag(id)
  return parsed.data
}

export async function updateBarberSaleItem(
  id: string,
  body: BodyUpdateBarberSaleItem,
): Promise<ZUpdateSaleItemResponseSchema> {
  const validatedFields = bodyUpdateBarberSaleItemSchema.safeParse({
    barberId: body.barberId,
  })
  if (!validatedFields.success) {
    throw ValidationError.fromZod(
      validatedFields.error,
      'Invalid body request update barber sale item',
    )
  }
  const token = await getBackendToken()
  const bodyParsed = JSON.stringify(body)
  const response = await api(`/sales/saleItem/${id}/barber`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: bodyParsed,
  })
  if (!response.ok) {
    const message = await readMessage(response)
    throw new HttpError(response.status, message)
  }
  const json = await safeJson(response)
  const parsed = UpdateSaleItemResponseSchema.safeParse(json)
  if (!parsed.success) {
    throw ValidationError.fromZod(
      parsed.error,
      'Invalid response update custom barber item',
    )
  }
  revalidateTag('sales')
  revalidateTag(id)
  return parsed.data
}

export async function updatePaymentMethod(
  id: string,
  method: string,
): Promise<ZSale> {
  const token = await getBackendToken()
  const response = await api(`/sales/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ method }),
  })

  if (!response.ok) {
    const message = await readMessage(response)
    throw new HttpError(response.status, message)
  }

  const json = await safeJson(response)
  const parsed = SaleSchema.safeParse(json)

  if (!parsed.success) {
    throw ValidationError.fromZod(
      parsed.error,
      'Invalid response update payment method',
    )
  }
  revalidateTag('sales')
  revalidateTag(id)
  return parsed.data
}
