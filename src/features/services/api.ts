import { api } from '@/data/api'
import { getBackendToken } from '@/utils/authServer'
import {
  ServiceSchema,
  ServicesListResponseSchema,
  ServicesListResponsePaginatedSchema,
  type ZService,
  RegisterServiceBody,
  RegisterServiceFormSchema,
  registerServiceResponseSchema,
  UpdateServiceFormSchema,
} from './schemas'
import type { QueryParams, ReturnListPaginated } from '@/types/http'
import { ValidationError } from '@/shared/errors/validationError'
import { readMessage, safeJson } from '@/shared/http'
import { HttpError } from '@/shared/errors/httpError'
import { logger } from '@/shared/logger'

export async function createService(
  body: RegisterServiceBody,
): Promise<ZService> {
  const validatedFields = RegisterServiceFormSchema.safeParse(body)

  if (!validatedFields.success) {
    logger.debug({ errors: validatedFields.error }, 'errors createService')
    throw ValidationError.fromZod(
      validatedFields.error,
      'Invalid body for creating service',
    )
  }

  const token = await getBackendToken()
  const response = await api('/create/service', {
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
  const parsed = registerServiceResponseSchema.safeParse(json)

  if (!parsed.success) {
    logger.debug({ errors: parsed.error }, 'errors parsed createService')
    throw ValidationError.fromZod(
      parsed.error,
      'Invalid response when creating service',
    )
  }

  return parsed.data
}

export async function updateService(
  id: string,
  body: Partial<RegisterServiceBody>,
): Promise<ZService> {
  const validatedFields = UpdateServiceFormSchema.safeParse(body)

  if (!validatedFields.success) {
    logger.debug({ errors: validatedFields.error }, 'errors updateService')
    throw ValidationError.fromZod(
      validatedFields.error,
      'Invalid body for updating service',
    )
  }

  const token = await getBackendToken()
  const response = await api(`/services/${id}`, {
    method: 'PATCH',
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
  const parsed = registerServiceResponseSchema.safeParse(json)

  if (!parsed.success) {
    logger.debug({ errors: parsed.error }, 'errors parsed updateService')
    throw ValidationError.fromZod(
      parsed.error,
      'Invalid response when updating service',
    )
  }

  return parsed.data
}

export type FetchServicesResult = {
  items: ZService[]
  count?: number
}

export async function fetchServices(
  page?: string,
  where?: QueryParams<ZService>,
): Promise<ZService[]> {
  const token = await getBackendToken()
  const response = await api(
    '/services',
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
      next: { tags: ['services'], revalidate: 60 * 4 },
    },
    page,
    where,
  )
  if (!response.ok) {
    const message = await readMessage(response)
    throw new HttpError(response.status, message)
  }
  const json = await safeJson(response)
  logger.debug({ json }, 'fetchServices')
  const parsed = ServicesListResponseSchema.safeParse(json)
  if (!parsed.success) {
    throw ValidationError.fromZod(
      parsed.error,
      'Invalid response list services',
    )
  }
  return parsed.data
}

export async function fetchServicesPaginated(
  page?: string,
  where?: QueryParams<ZService, true>,
): Promise<ReturnListPaginated<ZService>> {
  const token = await getBackendToken()
  const response = await api(
    '/services',
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
      next: { tags: ['sales'], revalidate: 60 * 4 },
    },
    page,
    where,
  )
  if (!response.ok) {
    const message = await readMessage(response)
    throw new HttpError(response.status, message)
  }
  const json = await safeJson(response)
  const parsed = ServicesListResponsePaginatedSchema.safeParse(json)
  if (!parsed.success) {
    throw ValidationError.fromZod(
      parsed.error,
      'Invalid response list paginated services',
    )
  }
  return parsed.data
}

export async function fetchService(id: string): Promise<ZService> {
  const token = await getBackendToken()
  const response = await api(`/services/${id}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
    next: { tags: [id, 'services'], revalidate: 60 * 4 },
  })
  if (!response.ok) {
    const message = await readMessage(response)
    throw new HttpError(response.status, message)
  }
  const json = await safeJson(response)
  const parsed = ServiceSchema.safeParse(json)
  if (!parsed.success) {
    throw ValidationError.fromZod(parsed.error, 'Invalid response get services')
  }
  return parsed.data
}
