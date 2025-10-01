'use server'

import { ReturnList } from '@/types/general'
import { fetchClients } from '@/features/clients/api'
import type { QueryParams } from '@/types/http'
import { ZUser } from '@/features/users/schemas'
import { toNormalizedError } from '@/shared/errors/to-normalized-error'

export async function listClients(
  page?: string,
  where?: QueryParams<ZUser>,
): Promise<ReturnList<ZUser>> {
  try {
    const clients = await fetchClients(page, where)
    return { response: clients }
  } catch (error) {
    return { error: toNormalizedError('Error unknown') }
  }
}
