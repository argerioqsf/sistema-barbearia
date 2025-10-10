import { api } from '@/data/api'
import { getBackendToken } from '@/utils/authServer'
import {
  UnitsListResponseSchema,
  UnitDetailWrappedSchema,
  UnitSchema,
  type ZUnit,
} from './schemas'
import type { QueryParams } from '@/types/http'
import { logger } from '@/shared/logger'
import { readMessage } from '@/shared/http'
import { HttpError } from '@/shared/errors/httpError'
import { ValidationError } from '@/shared/errors/validationError'

export async function fetchUnits(page: string, where?: QueryParams<ZUnit>) {
  const token = await getBackendToken()
  const response = await api(
    '/units',
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
      next: { tags: ['units'], revalidate: 60 * 4 },
    },
    page,
    where,
  )
  if (!response.ok) throw new Error((await response.json()).message)
  const parsed = UnitsListResponseSchema.safeParse(await response.json())
  if (!parsed.success) throw new Error('Invalid units list response')
  return parsed.data
}

export async function fetchUnit(id: string) {
  const token = await getBackendToken()
  const response = await api(`/unit/${id}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
    next: { tags: [id, 'segments', 'courses'], revalidate: 60 * 4 },
  })
  if (!response.ok) throw new Error((await response.json()).message)
  const json = await response.json()
  const wrapped = UnitDetailWrappedSchema.safeParse(json)
  if (wrapped.success) return wrapped.data.unit
  const direct = UnitSchema.safeParse(json)
  if (direct.success) return direct.data
  throw new Error('Invalid unit response')
}

export async function fetchUnitsSelect(): Promise<ZUnit[]> {
  const token = await getBackendToken()
  const response = await api(`/units`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
    next: { tags: ['units'], revalidate: 60 * 4 },
  })
  logger.debug({ response }, 'response')

  if (!response.ok) {
    const message = await readMessage(response)
    throw new HttpError(response.status, message)
  }
  const json = await response.json()
  const parsed = UnitsListResponseSchema.safeParse(json)
  if (!parsed.success) {
    throw ValidationError.fromZod(parsed.error, 'Invalid response get sale')
  }
  return parsed.data
}
