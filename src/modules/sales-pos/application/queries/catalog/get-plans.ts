'use server'

import type { NormalizedError } from '@/shared/errors/types'
import { ok, err, type Result } from '@/shared/result'
import { normalizeError } from '@/shared/errors/normalizeError'
import type { ZPlan } from '@/features/plans/schema'
import { fetchPlans } from '@/features/plans/api'

// TODO: Migrar para módulo de domínio `plans` (ex.: src/modules/plans/application/queries/list-plans.ts)
export async function getPlansCatalog({
  search,
}: {
  search?: string
}): Promise<
  Result<
    { items: ZPlan[]; count?: number; page?: number; perPage?: number },
    NormalizedError
  >
> {
  try {
    const { items, count, page, perPage } = await fetchPlans(undefined, {
      name: search,
    })
    return ok({ items, count, page, perPage })
  } catch (error) {
    return err(normalizeError(error))
  }
}

export type PlansCatalog =
  Awaited<ReturnType<typeof getPlansCatalog>> extends Result<infer T, unknown>
    ? T
    : never
