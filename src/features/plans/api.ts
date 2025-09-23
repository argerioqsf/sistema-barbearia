import { QueryParams } from '@/types/http'
import {
  PlansListPaginateResponseSchema,
  PlansListResponseSchema,
  ZPlan,
} from './schema'
import { getBackendToken } from '@/utils/authServer'
import { api } from '@/data/api'
import { readMessage, safeJson } from '@/shared/http'

export async function fetchPlans(
  page?: string,
  where?: QueryParams<ZPlan>,
): Promise<{
  items: ZPlan[]
  count?: number
  page?: number
  perPage?: number
}> {
  const token = await getBackendToken()
  console.log('token', token)
  const withPaginate = where?.withCount ?? false
  const response = await api(
    '/plans',
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
      next: { tags: ['plans'], revalidate: 60 * 4 },
    },
    page,
    where,
  )
  if (!response.ok) throw new Error(await readMessage(response))
  const json = await safeJson(response)
  if (withPaginate) {
    const parsed = PlansListPaginateResponseSchema.safeParse(json)
    if (!parsed.success) {
      console.error('Validation error:', parsed.error)
      throw new Error('Invalid products paginate list response')
    }
    return parsed.data
  } else {
    const parsed = PlansListResponseSchema.safeParse(json)
    if (!parsed.success) {
      console.error('Validation error:', parsed.error)
      throw new Error('Invalid products list response')
    }
    return { items: parsed.data }
  }
}
