import { api } from '@/data/api'
import { getBackendToken } from '@/utils/authServer'
import { BarbersListResponseSchema } from './schemas'
import { safeJson, readMessage } from '@/shared/http'
import type { JsonObject, QueryParams } from '@/types/http'
import { UserSchema, ZUser } from '../users/schemas'

export async function fetchBarbers(
  page?: string,
  where?: QueryParams<ZUser>,
): Promise<{ users: ZUser[]; count?: number }> {
  const token = await getBackendToken()
  const response = await api(
    '/barber/users',
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
      next: { tags: ['barbers'], revalidate: 60 * 4 },
    },
    page,
    where,
  )
  if (!response.ok) throw new Error(await readMessage(response))
  const json = await safeJson(response)
  if (Array.isArray(json))
    return { users: json.map((i) => UserSchema.parse(i)) }
  return BarbersListResponseSchema.parse(json)
}

export async function fetchBarber(id: string) {
  const token = await getBackendToken()
  const response = await api(`/barber/users/${id}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
    next: { tags: [id, 'barbers'], revalidate: 60 * 4 },
  })
  if (!response.ok) throw new Error(await readMessage(response))
  return UserSchema.parse(await safeJson(response))
}

export async function createBarber(body: JsonObject) {
  const token = await getBackendToken()
  const response = await api('/barber/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })
  if (!response.ok) throw new Error(await readMessage(response))
  return UserSchema.parse(await safeJson(response))
}

export async function updateBarber(id: string, body: JsonObject) {
  const token = await getBackendToken()
  const response = await api(`/barber/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })
  if (!response.ok) throw new Error(await readMessage(response))
  return UserSchema.parse(await safeJson(response))
}

export async function deleteBarber(id: string) {
  const token = await getBackendToken()
  const response = await api(`/barber/users/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!response.ok) throw new Error(await readMessage(response))
  return {}
}
