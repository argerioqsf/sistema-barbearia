import { api } from '@/data/api'
import { getBackendToken } from '@/utils/authServer'
import { readMessage, safeJson } from '@/shared/http'
import { HttpError } from '@/shared/errors/httpError'
import { ValidationError } from '@/shared/errors/validationError'
import { z } from 'zod'

export const ZPermissionSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  category: z.string(),
})

export type ZPermission = z.infer<typeof ZPermissionSchema>

export const ZPermissionsListSchema = z.array(ZPermissionSchema)

export async function listPermissions(): Promise<ZPermission[]> {
  const token = await getBackendToken()
  const response = await api('/permissions', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: ['permissions'],
      revalidate: 60 * 4,
    },
  })

  if (!response.ok) {
    const message = await readMessage(response)
    throw new HttpError(response.status, message)
  }

  const json = await safeJson(response)
  const parsed = ZPermissionsListSchema.safeParse(json)

  if (!parsed.success) {
    throw ValidationError.fromZod(
      parsed.error,
      'Invalid response list permissions',
    )
  }

  return parsed.data
}
