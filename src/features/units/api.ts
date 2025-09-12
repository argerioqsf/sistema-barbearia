import { api } from '@/data/api'
import { getBackendToken } from '@/utils/authServer'
import {
  UnitsListResponseSchema,
  UnitDetailWrappedSchema,
  UnitSchema,
} from './schemas'

export async function fetchUnits(
  page: string,
  where?: Record<string, unknown>,
) {
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

export async function fetchUnitsSelect() {
  const token = await getBackendToken()
  const response = await api(`/units/select`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
    next: { tags: ['units'], revalidate: 60 * 4 },
  })
  if (!response.ok) throw new Error((await response.json()).message)
  const json = await response.json()
  // Accept either { units } or direct array
  if (Array.isArray(json)) return json
  if (Array.isArray(json.units)) return json.units
  throw new Error('Invalid units select response')
}
