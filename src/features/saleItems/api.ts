import { api } from '@/data/api'
import { getBackendToken } from '@/utils/authServer'
import { readMessage, safeJson } from '@/shared/http'
import { HttpError } from '@/shared/errors/httpError'
import { logger } from '@/shared/logger'
import { ValidationError } from '@/shared/errors/validationError'
import {
  ListUnpaidSaleItemsResponseSchema,
  ZSaleItemWithRemainingValue,
} from './schema'

export async function fetchUnpaidSaleItems(
  id: string,
): Promise<ZSaleItemWithRemainingValue[]> {
  const token = await getBackendToken()
  const response = await api(
    `/collaborators/${id}/pending-commission-sale-items`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
      next: {
        tags: [`pending-commission-sale-items-${id}`],
        revalidate: 60 * 2,
      },
    },
  )

  if (!response.ok) {
    const message = await readMessage(response)
    throw new HttpError(response.status, message)
  }

  const json = await safeJson(response)
  const parsed = ListUnpaidSaleItemsResponseSchema.safeParse(json)

  if (!parsed.success) {
    logger.debug({ errors: parsed.error }, 'errors parsed fetchUnpaidSaleItems')
    throw ValidationError.fromZod(
      parsed.error,
      `Invalid response when list unpaid sale items for collaborator ${id}`,
    )
  }
  return parsed.data
}
