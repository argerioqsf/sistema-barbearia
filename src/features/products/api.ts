import { api } from '@/data/api'
import { getBackendToken } from '@/utils/authServer'
import {
  ProductsListResponseSchema,
  ProductDetailResponseSchema,
  ProductSellersResponseSchema,
  ZProduct,
  ProductsListPaginateResponseSchema,
} from './schemas'
import { safeJson, readMessage } from '@/shared/http'

import type { QueryParams } from '@/types/http'

export async function fetchProducts(
  page?: string,
  where?: QueryParams<ZProduct>,
): Promise<{
  items: ZProduct[]
  count?: number
  page?: number
  perPage?: number
}> {
  const token = await getBackendToken()
  console.log('token', token)
  const withPaginate = where?.withCount ?? false
  const response = await api(
    '/products',
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
      next: { tags: ['products'], revalidate: 60 * 4 },
    },
    page,
    where,
  )
  // console.log('response', response)
  if (!response.ok) throw new Error(await readMessage(response))
  const json = await safeJson(response)
  if (withPaginate) {
    const parsed = ProductsListPaginateResponseSchema.safeParse(json)
    if (!parsed.success) {
      console.error('Validation error:', parsed.error)
      throw new Error('Invalid products paginate list response')
    }
    return parsed.data
  } else {
    const parsed = ProductsListResponseSchema.safeParse(json)
    if (!parsed.success) {
      console.error('Validation error:', parsed.error)
      throw new Error('Invalid products list response')
    }
    return { items: parsed.data }
  }
}

export async function fetchProduct(id: string) {
  const token = await getBackendToken()
  const response = await api(`/products/${id}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
    next: { tags: [id, 'products'], revalidate: 60 * 4 },
  })
  if (!response.ok) throw new Error(await readMessage(response))
  const json = await safeJson(response)
  // Accept object { product } or direct product
  const data = json
  const parsed = ProductDetailResponseSchema.safeParse({ product: data })
  if (!parsed.success) throw new Error('Invalid product response')
  return parsed.data.product
}

export async function fetchProductSellers() {
  const token = await getBackendToken()
  const response = await api('/product-sellers', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
    next: { tags: ['products', 'sellers'], revalidate: 60 * 12 },
  })
  if (!response.ok) throw new Error(await readMessage(response))
  const parsed = ProductSellersResponseSchema.safeParse(
    await safeJson(response),
  )
  if (!parsed.success) throw new Error('Invalid product sellers response')
  return parsed.data.sellers
}
