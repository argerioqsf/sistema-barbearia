'use server'

import type { NormalizedError } from '@/shared/errors/types'
import { ok, err, type Result } from '@/shared/result'
import { normalizeError } from '@/shared/errors/normalizeError'
import type { ZUser } from '@/features/users/schemas'
import { fetchClients } from '@/features/clients/api'

// TODO: Migrar para módulo de domínio `clients` (ex.: src/modules/clients/application/queries/list-clients.ts)
export async function getClientsCatalog({
  search,
}: {
  search?: string
}): Promise<Result<{ items: ZUser[] }, NormalizedError>> {
  try {
    const items = await fetchClients(undefined, { name: search })
    return ok({ items })
  } catch (error) {
    return err(normalizeError(error))
  }
}

export type ClientsCatalog =
  Awaited<ReturnType<typeof getClientsCatalog>> extends Result<infer T, unknown>
    ? T
    : never
