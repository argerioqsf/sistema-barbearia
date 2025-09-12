import { api } from '@/data/api'
import { getBackendToken } from '@/utils/authServer'
import {
  ServiceSchema,
  ServicesListResponseSchema,
  type ZService,
} from './schemas'

export async function fetchServices(
  page?: string,
  where?: Record<string, unknown>,
): Promise<{ services: ZService[]; count: number }> {
  const token = await getBackendToken()
  const response = await api(
    '/services',
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
      next: { tags: ['services'], revalidate: 60 * 4 },
    },
    page,
    where,
  )
  if (!response.ok) throw new Error((await response.json()).message)
  const json = await response.json()
  // Some backends may return an array directly
  const arr = Array.isArray(json) ? json : json.services
  const parsed = ServicesListResponseSchema.safeParse({
    services: arr,
    count: json?.count ?? 0,
  })
  if (!parsed.success) throw new Error('Invalid services list response')
  return parsed.data
}

export async function fetchService(id: string): Promise<ZService> {
  const token = await getBackendToken()
  const response = await api(`/services/${id}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
    next: { tags: [id, 'services'], revalidate: 60 * 4 },
  })
  if (!response.ok) throw new Error((await response.json()).message)
  const parsed = ServiceSchema.safeParse(await response.json())
  if (!parsed.success) throw new Error('Invalid service response')
  return parsed.data
}
