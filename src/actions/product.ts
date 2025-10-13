'use server'

import {
  ReturnGet,
  ReturnList,
  InitialState,
  ReturnRequest,
} from '@/types/general'
import {
  createProduct,
  fetchProduct,
  fetchProducts,
  updateProduct as apiUpdateProduct,
} from '@/features/products/api'
import type {
  ZProduct as Product,
  RegisterProductBody,
} from '@/features/products/schemas'
import { api } from '@/data/api'
import { getBackendToken } from '@/utils/authServer'
import { revalidateTag } from 'next/cache'
import { toNormalizedError } from '@/shared/errors/to-normalized-error'
import type { QueryParams } from '@/types/http'
import { logger } from '@/shared/logger'
import { handleRequestError } from '@/shared/errors/handlerRequestError'

export async function listProducts(): Promise<ReturnList<Product>> {
  try {
    const { items } = await fetchProducts()
    return { response: items }
  } catch (error) {
    return {
      error: toNormalizedError(
        error instanceof Error ? error.message : 'Error unknown',
      ),
    }
  }
}

export async function listProductsPaginated(
  page?: string,
  where?: QueryParams<Product>,
): Promise<ReturnList<Product>> {
  try {
    const { items, count } = await fetchProducts(page, where)
    return { response: items, count }
  } catch (error) {
    return {
      error: toNormalizedError(
        error instanceof Error ? error.message : 'Error unknown',
      ),
    }
  }
}

export async function getProduct(id: string): Promise<ReturnGet<Product>> {
  try {
    const product = await fetchProduct(id)
    return { response: product }
  } catch (error) {
    return {
      error: toNormalizedError(
        error instanceof Error ? error.message : 'Error unknown',
      ),
    }
  }
}

export async function registerProduct(
  prevState: InitialState<Product>,
  formData: FormData,
): Promise<ReturnRequest<Product>> {
  try {
    const rawData: RegisterProductBody = {
      name: formData.get('name') as string,
      description: (formData.get('description') as string) || '',
      categoryId: formData.get('categoryId') as string,
      quantity: Number(formData.get('quantity')) || undefined,
      cost: Number(formData.get('cost')),
      price: Number(formData.get('price')),
      commissionPercentage:
        Number(formData.get('commissionPercentage')) || undefined,
      image: formData.get('image'),
    }

    logger.debug({ rawData }, 'rawData registerProduct')
    const data = await createProduct(rawData)
    revalidateTag('users')
    return { ok: true, data }
  } catch (e) {
    const normalized = handleRequestError(e, {
      rethrow: false,
    })
    return { ok: false, error: normalized }
  }
}

export async function updateProduct(
  id: string,
  prevState: InitialState<Product>,
  formData: FormData,
): Promise<ReturnRequest<Product>> {
  try {
    const rawData = {
      name: formData.get('name') as string,
      description: (formData.get('description') as string) || '',
      categoryId: formData.get('categoryId') as string,
      quantity: Number(formData.get('quantity')) || undefined,
      cost: Number(formData.get('cost')),
      price: Number(formData.get('price')),
      commissionPercentage:
        Number(formData.get('commissionPercentage')) || undefined,
    }

    const data = await apiUpdateProduct(id, rawData)
    revalidateTag('products')
    revalidateTag(id)
    return { ok: true, data }
  } catch (e) {
    const normalized = handleRequestError(e, {
      rethrow: false,
    })
    return { ok: false, error: normalized }
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
