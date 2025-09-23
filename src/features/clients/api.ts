import { api } from '@/data/api'
import { getBackendToken } from '@/utils/authServer'
import { ZUser, UsersClientListResponseSchema } from '@/features/users/schemas'
import { safeJson, readMessage } from '@/shared/http'
import type { QueryParams } from '@/types/http'

export async function fetchClients(
  page?: string,
  where?: QueryParams,
): Promise<ZUser[]> {
  const token = await getBackendToken()
  const response = await api(
    '/clients',
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
      next: { tags: ['clients'], revalidate: 60 * 4 },
    },
    String(page ?? ''),
    where,
  )
  if (!response.ok) throw new Error(await readMessage(response))
  const json = await safeJson(response)
  const parsed = UsersClientListResponseSchema.safeParse(json)
  if (!parsed.success) {
    console.error('Validation error:', parsed.error)
    throw new Error('Invalid users list response')
  }
  return parsed.data
}
