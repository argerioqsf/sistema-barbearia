import { api } from '@/data/api'
import { getBackendToken } from '@/utils/authServer'
import {
  UserSchema,
  ZUser,
  userRegisterBodySchema,
  type UserRegisterBody,
  userListAllResponseSchema,
  usersListPaginateResponseSchema,
  UserCreateResponseSchema,
  UserUpdateStatusResponseSchema,
  type UserUpdateBody,
  userUpdateBodySchema,
} from './schemas'
import type { QueryParams, ReturnListPaginated } from '@/types/http'
import { readMessage, safeJson } from '@/shared/http'
import { HttpError } from '@/shared/errors/httpError'
import { ValidationError } from '@/shared/errors/validationError'
import { logger } from '@/shared/logger'

export async function createCollaborator(
  body: UserRegisterBody,
): Promise<ZUser> {
  const validatedFields = userRegisterBodySchema.safeParse(body)

  if (!validatedFields.success) {
    logger.debug({ errors: validatedFields.error }, 'errors')
    throw ValidationError.fromZod(
      validatedFields.error,
      'Invalid body for creating collaborator',
    )
  }

  const token = await getBackendToken()
  const response = await api('/barber/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(validatedFields.data),
  })

  if (!response.ok) {
    const message = await readMessage(response)
    throw new HttpError(response.status, message)
  }

  const json = await safeJson(response)
  // The backend returns { user, profile }, but for now we are parsing only the user.
  // The full response schema should be addressed later if needed.
  const parsed = UserCreateResponseSchema.safeParse(json)

  if (!parsed.success) {
    logger.debug({ errors: parsed.error }, 'parsed')
    throw ValidationError.fromZod(
      parsed.error,
      'Invalid response when creating collaborator',
    )
  }

  return parsed.data.user
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
    logger.debug({ errors: parsed.error }, 'parsed fetchUsersAll')
    throw ValidationError.fromZod(parsed.error, 'Invalid response list users')
  }
  return parsed.data
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
  logger.debug({ json }, 'fetchUsersPaginated')
  const parsed = usersListPaginateResponseSchema.safeParse(json)
  if (!parsed.success) {
    logger.debug({ errors: parsed.error }, 'parsed')
    throw ValidationError.fromZod(
      parsed.error,
      'Invalid response list user paginated',
    )
  }
  return parsed.data
}

export async function fetchUser(id: string): Promise<ZUser> {
  const token = await getBackendToken()
  const response = await api(`/barber/users/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: ['users', id],
    },
  })

  if (!response.ok) {
    const message = await readMessage(response)
    throw new HttpError(response.status, message)
  }
  const json = await safeJson(response)
  const parsed = UserSchema.safeParse(json)
  if (!parsed.success) {
    logger.debug({ error: parsed.error }, 'error fetchUser')
    console.log(parsed.error)
    throw ValidationError.fromZod(
      parsed.error,
      'Invalid response when fetching user',
    )
  }
  return parsed.data
}

export async function updateUser(
  userId: string,
  body: UserUpdateBody,
): Promise<ZUser> {
  const validatedFields = userUpdateBodySchema.safeParse(body)

  if (!validatedFields.success) {
    logger.debug({ errors: validatedFields.error }, 'errors validatedFields')
    throw ValidationError.fromZod(
      validatedFields.error,
      'Invalid body for updating user',
    )
  }

  const token = await getBackendToken()
  const response = await api(`/barber/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(validatedFields.data),
  })

  if (!response.ok) {
    const message = await readMessage(response)
    throw new HttpError(response.status, message)
  }

  const json = await safeJson(response)
  const parsed = UserUpdateStatusResponseSchema.safeParse(json) // The endpoint returns { user }

  if (!parsed.success) {
    throw ValidationError.fromZod(
      parsed.error,
      'Invalid response when updating user',
    )
  }

  return parsed.data.user
}

export async function updateCollaboratorStatus(
  userId: string,
  active: boolean,
): Promise<ZUser> {
  const token = await getBackendToken()
  const response = await api(`/barber/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ active }),
  })

  if (!response.ok) {
    const message = await readMessage(response)
    throw new HttpError(response.status, message)
  }

  const json = await safeJson(response)
  const parsed = UserUpdateStatusResponseSchema.safeParse(json) // The endpoint returns { user }

  if (!parsed.success) {
    throw ValidationError.fromZod(
      parsed.error,
      'Invalid response when updating collaborator status',
    )
  }

  return parsed.data.user
}
