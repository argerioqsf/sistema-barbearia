import { api } from '@/data/api'
import { getBackendToken } from '@/utils/authServer'
import {
  PermissionsListSchema,
  PermissionSchema,
  type ZPermission,
} from './schemas'
import { readMessage, safeJson } from '@/shared/http'

export async function listPermissions() {
  const token = await getBackendToken()
  const response = await api('/permissions', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
    next: { tags: ['permissions'], revalidate: 60 * 10 },
  })
  if (!response.ok) throw new Error(await readMessage(response))
  const json = await safeJson(response)
  if (Array.isArray(json))
    return { permissions: json.map((i) => PermissionSchema.parse(i)) }
  return PermissionsListSchema.parse(json)
}

export async function createPermission(
  body: Record<string, unknown>,
): Promise<ZPermission> {
  const token = await getBackendToken()
  const response = await api('/permissions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })
  if (!response.ok) throw new Error(await readMessage(response))
  return PermissionSchema.parse(await safeJson(response))
}

export async function updatePermission(
  id: string,
  body: Record<string, unknown>,
): Promise<ZPermission> {
  const token = await getBackendToken()
  const response = await api(`/permissions/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })
  if (!response.ok) throw new Error(await readMessage(response))
  return PermissionSchema.parse(await safeJson(response))
}
