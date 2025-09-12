'use server'

import { ReturnGet, ReturnList, InitialState } from '@/types/general'
import type { QueryParams } from '@/types/http'
import { fetchProduct, fetchProducts } from '@/features/products/api'
import type { ZProduct as Product } from '@/features/products/schemas'
import { api } from '@/data/api'
import { getBackendToken } from '@/utils/authServer'
import { revalidateTag } from 'next/cache'

export async function listProducts(
  page?: string,
  where?: Partial<Product>,
): Promise<ReturnList<Product>> {
  try {
    const { items, count } = await fetchProducts(page, where as QueryParams)
    return { response: items, count }
  } catch (error) {
    return {
      error: {
        request: error instanceof Error ? error.message : 'Error unknown',
      },
    }
  }
}

export async function getProduct(id: string): Promise<ReturnGet<Product>> {
  try {
    const product = await fetchProduct(id)
    return { response: product }
  } catch (error) {
    return {
      error: {
        request: error instanceof Error ? error.message : 'Error unknown',
      },
    }
  }
}

export async function registerProduct(
  prevState: InitialState<Product | { image: string }>,
  formData: FormData,
): Promise<InitialState<Product>> {
  try {
    const token = await getBackendToken()
    const response = await api('/products', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
    if (!response.ok) {
      const errorMessage = await response.text()
      return { errors: { request: JSON.parse(errorMessage).message } }
    }
    revalidateTag('products')
    return { ok: true, errors: {} }
  } catch {
    return { errors: { request: 'Failed to register product' } }
  }
}

export async function updateProduct(
  id: string,
  prevState: InitialState<Product>,
  formData: FormData,
): Promise<InitialState<Product>> {
  try {
    const token = await getBackendToken()
    const json = Object.fromEntries(formData.entries())
    const response = await api(`/products/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(json),
    })
    if (!response.ok) {
      const errorMessage = await response.text()
      return { errors: { request: JSON.parse(errorMessage).message } }
    }
    revalidateTag('products')
    revalidateTag(id)
    return { ok: true, errors: {} }
  } catch {
    return { errors: { request: 'Failed to update product' } }
  }
}

export async function deleteProduct(
  id?: string,
): Promise<InitialState<Product>> {
  if (!id) throw new Error('Id undefined')
  try {
    const token = await getBackendToken()
    const response = await api(`/products/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!response.ok) {
      const errorMessage = await response.text()
      return { errors: { request: JSON.parse(errorMessage).message } }
    }
    revalidateTag('products')
    return { ok: true, errors: {} }
  } catch {
    return { errors: { request: 'Failed to delete product' } }
  }
}
