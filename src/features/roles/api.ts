import { api } from '@/data/api'
import { getBackendToken } from '@/utils/authServer'
import { RolesListSchema, RoleSchema, type ZRole } from './schemas'
import { readMessage, safeJson } from '@/shared/http'

export async function listRoles() {
  const token = await getBackendToken()
  const response = await api('/roles', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
    next: { tags: ['roles'], revalidate: 60 * 10 },
  })
  if (!response.ok) throw new Error(await readMessage(response))
  const json = await safeJson(response)
  if (Array.isArray(json))
    return { roles: json.map((i) => RoleSchema.parse(i)) }
  return RolesListSchema.parse(json)
}

export async function createRole(
  body: Record<string, unknown>,
): Promise<ZRole> {
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

export async function updateRole(
  id: string,
  body: Record<string, unknown>,
): Promise<ZRole> {
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
