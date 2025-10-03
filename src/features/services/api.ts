import { api } from '@/data/api'
import { getBackendToken } from '@/utils/authServer'
import {
  ServiceSchema,
  ServicesListResponseSchema,
  type ZService,
} from './schemas'
import type { QueryParams } from '@/types/http'
import { ValidationError } from '@/shared/errors/validationError'

export async function fetchServices(
  page?: string,
  where?: QueryParams<ZService>,
): Promise<ZService[]> {
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
  console.log('response', response)
  if (!response.ok) throw new Error((await response.json()).message)
  const json = await response.json()
  console.log('json', json)
  const parsed = ServicesListResponseSchema.safeParse(json)
  if (!parsed.success) {
    console.log('parsed.error', parsed.error)
    throw ValidationError.fromZod(parsed.error, 'Invalid response list sales')
  }
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
