'use server'

import type { NormalizedError } from '@/shared/errors/types'
import { ok, err, type Result } from '@/shared/result'
import { normalizeError } from '@/shared/errors/normalizeError'
import { fetchAppointmentBarbers } from '@/features/appointments/api'
import { BarberSchema } from '@/features/barbers/schemas'

// TODO: Migrar para módulo de domínio `barbers` (ex.: src/modules/barbers/application/queries/list-barbers.ts)
export async function getBarbersCatalog(): Promise<
  Result<
    { items: Array<ReturnType<typeof BarberSchema.parse>> },
    NormalizedError
  >
> {
  try {
    const raw = await fetchAppointmentBarbers()
    const items = raw.map((i) => BarberSchema.parse(i))
    return ok({ items })
  } catch (error) {
    return err(normalizeError(error))
  }
}

export type BarbersCatalog =
  Awaited<ReturnType<typeof getBarbersCatalog>> extends Result<infer T, unknown>
    ? T
    : never
