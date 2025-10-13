import { api } from '@/data/api'
import { getBackendToken } from '@/utils/authServer'
import { UnitsListResponseSchema, UnitSchema, type ZUnit } from './schemas'
import type { QueryParams } from '@/types/http'
import { logger } from '@/shared/logger'
import { readMessage, safeJson } from '@/shared/http'
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

export async function fetchUnit(id: string): Promise<ZUnit> {
  const token = await getBackendToken()
  const response = await api(`/units/${id}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
    next: { tags: [id], revalidate: 60 * 4 },
  })
  if (!response.ok) {
    const message = await readMessage(response)
    throw new HttpError(response.status, message)
  }
  const json = await safeJson(response)
  const parsed = UnitSchema.safeParse(json)

  if (!parsed.success) {
    logger.debug({ errors: parsed.error }, 'errors parsed fetchUnit')
    throw ValidationError.fromZod(
      parsed.error,
      'Invalid response when get unit',
    )
  }

  return parsed.data
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
