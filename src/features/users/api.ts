import { api } from '@/data/api'
import { getBackendToken } from '@/utils/authServer'
import { UsersListResponseSchema, UserSchema } from './schemas'
import type { QueryParams } from '@/types/http'

export async function fetchUsers(page: string, where?: QueryParams) {
  const token = await getBackendToken()
  const response = await api(
    '/users',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ['users', 'indicators', 'consultants'],
        revalidate: 60 * 4,
      },
    },
    page,
    where,
  )

  if (!response.ok) {
    const err = await response.text()
    throw new Error(JSON.parse(err).message)
  }

  const json = await response.json()
  const parsed = UsersListResponseSchema.safeParse(json)
  if (!parsed.success) {
    throw new Error('Invalid users list response')
  }
  return parsed.data
}

export async function fetchUser(id: string) {
  const token = await getBackendToken()
  const response = await api(`/user/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: [id],
      revalidate: 60 * 4,
    },
  })

  if (!response.ok) {
    const err = await response.text()
    throw new Error(JSON.parse(err).message)
  }

  const json = await response.json()
  const parsed = UserSchema.safeParse(json)
  if (!parsed.success) {
    throw new Error('Invalid user response')
  }
  return parsed.data
}
