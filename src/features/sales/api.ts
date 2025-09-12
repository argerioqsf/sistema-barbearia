import { api } from '@/data/api'
import { getBackendToken } from '@/utils/authServer'
import { SaleSchema, SalesListResponseSchema, type ZSale } from './schemas'
import { safeJson, readMessage } from '@/shared/http'

export async function fetchSales(params?: Record<string, unknown>): Promise<{
  items: ZSale[]
  count?: number
  page?: number
  perPage?: number
}> {
  const token = await getBackendToken()
  const response = await api(
    '/sales',
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
      next: { tags: ['sales'], revalidate: 60 * 4 },
    },
    String(params?.page ?? ''),
    params,
  )
  if (!response.ok) throw new Error(await readMessage(response))
  const json = await safeJson(response)
  if (Array.isArray(json))
    return { items: json.map((i) => SaleSchema.parse(i)) }
  return SalesListResponseSchema.parse(json)
}

export async function fetchSale(id: string) {
  const token = await getBackendToken()
  const response = await api(`/sales/${id}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
    next: { tags: [id, 'sales'], revalidate: 60 * 4 },
  })
  if (!response.ok) throw new Error(await readMessage(response))
  return SaleSchema.parse(await safeJson(response))
}

export async function createSale(body: Record<string, unknown>) {
  const token = await getBackendToken()
  const response = await api('/sales', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })
  if (!response.ok) throw new Error(await readMessage(response))
  return SaleSchema.parse(await safeJson(response))
}

export async function updateSale(id: string, body: Record<string, unknown>) {
  const token = await getBackendToken()
  const response = await api(`/sales/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })
  if (!response.ok) throw new Error(await readMessage(response))
  return SaleSchema.parse(await safeJson(response))
}

export async function updateSaleItems(
  id: string,
  body: Record<string, unknown>,
) {
  const token = await getBackendToken()
  const response = await api(`/sales/${id}/saleItems`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })
  if (!response.ok) throw new Error(await readMessage(response))
  return await safeJson(response)
}

export async function updateSaleCoupon(
  id: string,
  body: Record<string, unknown>,
) {
  const token = await getBackendToken()
  const response = await api(`/sales/${id}/coupon`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })
  if (!response.ok) throw new Error(await readMessage(response))
  return await safeJson(response)
}

export async function paySale(id: string, body: Record<string, unknown>) {
  const token = await getBackendToken()
  const response = await api(`/sales/${id}/pay`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })
  if (!response.ok) throw new Error(await readMessage(response))
  return await safeJson(response)
}

export async function updateSaleClient(
  id: string,
  body: Record<string, unknown>,
) {
  const token = await getBackendToken()
  const response = await api(`/sales/${id}/client`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })
  if (!response.ok) throw new Error(await readMessage(response))
  return await safeJson(response)
}

export async function updateSaleItem(
  id: string,
  body: Record<string, unknown>,
) {
  const token = await getBackendToken()
  const response = await api(`/sales/saleItem/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })
  if (!response.ok) throw new Error(await readMessage(response))
  return await safeJson(response)
}
