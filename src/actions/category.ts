'use server'

import { ReturnGet, ReturnList, InitialState } from '@/types/general'
import type { ZCategory as Category } from '@/features/categories/schemas'
import { fetchCategory, fetchCategories } from '@/features/categories/api'
import type { QueryParams } from '@/types/http'
import { api } from '@/data/api'
import { revalidateTag } from 'next/cache'
import { toNormalizedError } from '@/shared/errors/to-normalized-error'
import { getBackendToken } from '@/utils/authServer'

export async function listCategories(
  page?: string,
  where?: QueryParams<Category>,
): Promise<ReturnList<Category>> {
  try {
    const { categories, count } = await fetchCategories(page, where)
    return { response: categories, count }
  } catch (error) {
    return { error: toNormalizedError('Error unknown') }
  }
}

export async function getCategory(id: string): Promise<ReturnGet<Category>> {
  try {
    const category = await fetchCategory(id)
    return { response: category }
  } catch (error) {
    return { error: toNormalizedError('Error unknown') }
  }
}

export async function registerCategory(
  prevState: InitialState<Category>,
  formData: FormData,
): Promise<InitialState<Category>> {
  try {
    const token = await getBackendToken()
    const json = Object.fromEntries(formData.entries())
    const response = await api('/categories', {
      method: 'POST',
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
    revalidateTag('categories')
    return { ok: true, errors: {} }
  } catch {
    return { errors: { request: 'Failed to register category' } }
  }
}

export async function updateCategory(
  id: string,
  prevState: InitialState<Category>,
  formData: FormData,
): Promise<InitialState<Category>> {
  try {
    const token = await getBackendToken()
    const json = Object.fromEntries(formData.entries())
    const response = await api(`/categories/${id}`, {
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
    revalidateTag('categories')
    revalidateTag(id)
    return { ok: true, errors: {} }
  } catch {
    return { errors: { request: 'Failed to update category' } }
  }
}

export async function deleteCategory(
  id?: string,
): Promise<InitialState<Category>> {
  try {
    const token = await getBackendToken()
    const response = await api(`/categories/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!response.ok) {
      const errorMessage = await response.text()
      return { errors: { request: JSON.parse(errorMessage).message } }
    }
    revalidateTag('categories')
    return { ok: true, errors: {} }
  } catch {
    return { errors: { request: 'Failed to delete category' } }
  }
}
