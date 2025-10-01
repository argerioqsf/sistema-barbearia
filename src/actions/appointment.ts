'use server'

import type { ZAppointment as Appointment } from '@/features/appointments/schemas'
import {
  createAppointment,
  fetchAppointmentBarbers,
  fetchAppointments,
  updateAppointment,
} from '@/features/appointments/api'
import type { InitialState, ReturnList } from '@/types/general'
import type { JsonObject, QueryParams } from '@/types/http'
import { toNormalizedError } from '@/shared/errors/to-normalized-error'

export async function listAppointments(
  page?: string,
  where?: QueryParams<Appointment>,
): Promise<ReturnList<Appointment>> {
  try {
    const params: QueryParams<Appointment> | undefined =
      page || where ? { ...(where ?? {}), page } : undefined
    const { items, count } = await fetchAppointments(params)
    return { response: items as Appointment[], count }
  } catch (e) {
    return {
      error: toNormalizedError(
        e instanceof Error ? e.message : 'Error unknown',
      ),
    }
  }
}

export async function registerAppointment(
  prev: InitialState<Appointment>,
  formData: FormData,
): Promise<InitialState<Appointment>> {
  try {
    const body = Object.fromEntries(formData.entries()) as JsonObject
    await createAppointment(body)
    return { ok: true, errors: {} }
  } catch (e) {
    return {
      errors: {
        request:
          e instanceof Error ? e.message : 'Failed to create appointment',
      },
    }
  }
}

export async function patchAppointment(
  id: string,
  prev: InitialState<Appointment>,
  formData: FormData,
): Promise<InitialState<Appointment>> {
  try {
    const body = Object.fromEntries(formData.entries()) as JsonObject
    await updateAppointment(id, body)
    return { ok: true, errors: {} }
  } catch (e) {
    return {
      errors: {
        request:
          e instanceof Error ? e.message : 'Failed to update appointment',
      },
    }
  }
}

export async function listAppointmentBarbers() {
  try {
    const users = await fetchAppointmentBarbers()
    return { response: users }
  } catch (e) {
    return {
      error: toNormalizedError(
        e instanceof Error ? e.message : 'Error unknown',
      ),
    }
  }
}
