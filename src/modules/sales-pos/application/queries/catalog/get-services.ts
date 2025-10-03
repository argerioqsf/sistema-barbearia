'use server'

import type { NormalizedError } from '@/shared/errors/types'
import { ok, err, type Result } from '@/shared/result'
import { normalizeError } from '@/shared/errors/normalizeError'
import type { ZService } from '@/features/services/schemas'
import { fetchServices } from '@/features/services/api'

// TODO: Migrar para módulo de domínio `services` (ex.: src/modules/services/application/queries/list-services.ts)
export async function getServicesCatalog({
  search,
}: {
  search?: string
}): Promise<
  Result<
    { items: ZService[]; count?: number; page?: number; perPage?: number },
    NormalizedError
  >
> {
  try {
    const services = await fetchServices(undefined, { name: search })
    console.log('services', services)
    return ok({ items: services, count: 0 })
  } catch (error) {
    return err(normalizeError(error))
  }
}

export type ServicesCatalog =
  Awaited<ReturnType<typeof getServicesCatalog>> extends Result<
    infer T,
    unknown
  >
    ? T
    : never
