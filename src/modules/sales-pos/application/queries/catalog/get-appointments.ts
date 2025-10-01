'use server'

import type { NormalizedError } from '@/shared/errors/types'
import { ok, err, type Result } from '@/shared/result'
import { normalizeError } from '@/shared/errors/normalizeError'
import type { ZAppointment } from '@/features/appointments/schemas'
import { fetchAppointments } from '@/features/appointments/api'

// TODO: Migrar para módulo de domínio `appointments` (ex.: src/modules/appointments/application/queries/list-appointments.ts)
export async function getAppointmentsCatalog({
  date,
}: {
  date?: string
}): Promise<
  Result<
    { items: ZAppointment[]; count?: number; page?: number; perPage?: number },
    NormalizedError
  >
> {
  try {
    const { items, count, page, perPage } = await fetchAppointments({ date })
    return ok({ items, count, page, perPage })
  } catch (error) {
    return err(normalizeError(error))
  }
}

export type AppointmentsCatalog =
  Awaited<ReturnType<typeof getAppointmentsCatalog>> extends Result<
    infer T,
    unknown
  >
    ? T
    : never
