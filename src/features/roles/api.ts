import { api } from '@/data/api'
import { getBackendToken } from '@/utils/authServer'
import { RoleSchema, RolesListSchema, type ZRole } from './schemas'
import { readMessage, safeJson } from '@/shared/http'
import type { JsonObject } from '@/types/http'
import { HttpError } from '@/shared/errors/httpError'
import { ValidationError } from '@/shared/errors/validationError'
import { logger } from '@/shared/logger'

export async function listRoles(): Promise<ZRole[]> {
  const token = await getBackendToken()
  const response = await api('/roles', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
    next: { tags: ['roles'], revalidate: 60 * 10 },
  })
  if (!response.ok) {
    const message = await readMessage(response)
    throw new HttpError(response.status, message)
  }
  const json = await safeJson(response)
  logger.debug({ json })
  const parsed = RolesListSchema.safeParse(json)
  if (!parsed.success) {
    logger.debug({ errors: parsed.error }, 'parsed listRoles')
    throw ValidationError.fromZod(parsed.error, 'Invalid response list roles')
  }
  return parsed.data
}

export async function createRole(body: JsonObject): Promise<ZRole> {
  const token = await getBackendToken()
  const response = await api('/roles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })
  if (!response.ok) throw new Error(await readMessage(response))
  return RoleSchema.parse(await safeJson(response))
}

export async function updateRole(id: string, body: JsonObject): Promise<ZRole> {
  const token = await getBackendToken()
  const response = await api(`/roles/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })
  if (!response.ok) throw new Error(await readMessage(response))
  return RoleSchema.parse(await safeJson(response))
}
