import { api } from '@/data/api'
import { getBackendToken } from '@/utils/authServer'
import {
  ProductsListResponseSchema,
  ProductDetailResponseSchema,
  ProductSellersResponseSchema,
  ZProduct,
  ProductsListPaginateResponseSchema,
  RegisterProductBody,
  RegisterProductFormSchema,
  registerProductResponseSchema,
  UpdateProductFormSchema,
} from './schemas'
import { safeJson, readMessage } from '@/shared/http'

import type { QueryParams } from '@/types/http'
import { HttpError } from '@/shared/errors/httpError'

import { logger } from '@/shared/logger'
import { ValidationError } from '@/shared/errors/validationError'
import { revalidateTag } from 'next/cache'

export async function updateProduct(
  id: string,
  body: Partial<RegisterProductBody>,
): Promise<ZProduct> {
  const validatedFields = UpdateProductFormSchema.safeParse(body)

  if (!validatedFields.success) {
    logger.debug({ errors: validatedFields.error }, 'errors updateProduct')
    throw ValidationError.fromZod(
      validatedFields.error,
      'Invalid body for updating product',
    )
  }

  const token = await getBackendToken()
  const response = await api(`/products/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(validatedFields.data),
  })

  if (!response.ok) {
    const message = await readMessage(response)
    throw new HttpError(response.status, message)
  }

  const json = await safeJson(response)
  const parsed = registerProductResponseSchema.safeParse(json)

  if (!parsed.success) {
    logger.debug({ errors: parsed.error }, 'errors parsed updateProduct')
    throw ValidationError.fromZod(
      parsed.error,
      'Invalid response when updating product',
    )
  }

  return parsed.data
}

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
  if (!response.ok) {
    const message = await readMessage(response)
    throw new HttpError(response.status, message)
  }
  const json = await safeJson(response)
  if (withPaginate) {
    logger.debug({ json }, 'json fetchProducts')
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

export async function createProduct(
  body: RegisterProductBody,
): Promise<ZProduct> {
  const validatedFields = RegisterProductFormSchema.safeParse(body)

  if (!validatedFields.success) {
    logger.debug({ errors: validatedFields.error }, 'errors createProduct')
    throw ValidationError.fromZod(
      validatedFields.error,
      'Invalid body for creating product',
    )
  }

  const token = await getBackendToken()
  const response = await api('/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(validatedFields.data),
  })

  if (!response.ok) {
    const message = await readMessage(response)
    throw new HttpError(response.status, message)
  }

  const json = await safeJson(response)
  const parsed = registerProductResponseSchema.safeParse(json)

  if (!parsed.success) {
    logger.debug({ errors: parsed.error }, 'errors parsed createProduct')
    throw ValidationError.fromZod(
      parsed.error,
      'Invalid response when creating product',
    )
  }

  revalidateTag('products')

  return parsed.data
}
