import { api } from '@/data/api'
import { getBackendToken } from '@/utils/authServer'
import {
  CategoriesListResponseSchema,
  CategorySchema,
  type ZCategory,
} from './schemas'
import type { QueryParams } from '@/types/http'

export async function fetchCategories(
  page?: string,
  where?: QueryParams<ZCategory>,
): Promise<{ categories: ZCategory[]; count: number }> {
  const token = await getBackendToken()
  const response = await api(
    '/categories',
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
      next: { tags: ['categories'], revalidate: 60 * 4 },
    },
    page,
    where,
  )
  if (!response.ok) throw new Error((await response.json()).message)
  const json = await response.json()
  const arr = Array.isArray(json) ? json : json.categories
  const parsed = CategoriesListResponseSchema.safeParse({
    categories: arr,
    count: json?.count ?? 0,
  })
  if (!parsed.success) throw new Error('Invalid categories list response')
  return parsed.data
}

export async function fetchCategory(id: string): Promise<ZCategory> {
  const token = await getBackendToken()
  const response = await api(`/categories/${id}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
    next: { tags: [id, 'categories'], revalidate: 60 * 4 },
  })
  if (!response.ok) throw new Error((await response.json()).message)
  const parsed = CategorySchema.safeParse(await response.json())
  if (!parsed.success) throw new Error('Invalid category response')
  return parsed.data
}
