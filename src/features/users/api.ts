import { api } from '@/data/api'
import { getBackendToken } from '@/utils/authServer'
import {
  BodyRegisterUser,
  UserSchema,
  ZUser,
  bodyRegisterUserSchema,
  userListAllResponseSchema,
  usersListPaginateResponseSchema,
} from './schemas'
import type { QueryParams, ReturnListPaginated } from '@/types/http'
import { readMessage, safeJson } from '@/shared/http'
import { HttpError } from '@/shared/errors/httpError'
import { ValidationError } from '@/shared/errors/validationError'

export async function createUser(body: FormData): Promise<ZUser> {
  const validatedFields = bodyRegisterUserSchema.safeParse({
    observation: body.get('observation'),
    method: body.get('method'),
    clientId: body.get('clientId'),
  })
  if (!validatedFields.success) {
    throw ValidationError.fromZod(
      validatedFields.error,
      'Invalid body request create sale',
    )
  }

  const token = await getBackendToken()
  const response = await api('/sales', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })
  if (!response.ok) {
    const message = await readMessage(response)
    throw new HttpError(response.status, message)
  }
  const json = await safeJson(response)
  const parsed = UserSchema.safeParse(json)
  if (!parsed.success) {
    throw ValidationError.fromZod(parsed.error, 'Invalid response create sale')
  }
  return parsed.data
}

export async function fetchUsersAll(
  page?: string,
  where?: QueryParams<ZUser>,
): Promise<ZUser[]> {
  const token = await getBackendToken()
  const response = await api(
    '/barber/users',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ['users'],
        revalidate: 60 * 4,
      },
    },
    page,
    where,
  )

  if (!response.ok) {
    const message = await readMessage(response)
    throw new HttpError(response.status, message)
  }
  const json = await safeJson(response)
  const parsed = userListAllResponseSchema.safeParse(json)
  if (!parsed.success) {
    throw ValidationError.fromZod(parsed.error, 'Invalid response list users')
  }
  return parsed.data.users
}

export async function fetchUsersPaginated(
  page?: string,
  where?: QueryParams<ZUser>,
): Promise<ReturnListPaginated<ZUser>> {
  const token = await getBackendToken()
  const response = await api(
    '/barber/users',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ['users'],
        revalidate: 60 * 4,
      },
    },
    page,
    where,
  )

  if (!response.ok) {
    const message = await readMessage(response)
    throw new HttpError(response.status, message)
  }
  const json = await safeJson(response)
  const parsed = usersListPaginateResponseSchema.safeParse(json)
  if (!parsed.success) {
    throw ValidationError.fromZod(
      parsed.error,
      'Invalid response list user paginated',
    )
  }
  return parsed.data
}

export async function fetchUser(id: string): Promise<ZUser> {
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
    const message = await readMessage(response)
    throw new HttpError(response.status, message)
  }
  const json = await safeJson(response)
  const parsed = UserSchema.safeParse(json)
  if (!parsed.success) {
    throw ValidationError.fromZod(parsed.error, 'Invalid response get user')
  }
  return parsed.data
}
