'use server'

import type { ZAppointment as Appointment } from '@/features/appointments/schemas'
import {
  createAppointment,
  fetchAppointmentBarbers,
  fetchAppointments,
  updateAppointment,
} from '@/features/appointments/api'
import type { InitialState, ReturnList } from '@/types/general'

export async function listAppointments(
  page?: string,
  where?: Partial<Appointment>,
): Promise<ReturnList<Appointment>> {
  try {
    const { items, count } = await fetchAppointments({
      page,
      ...(where as Record<string, unknown>),
    })
    return { response: items as Appointment[], count }
  } catch (e) {
    return {
      error: { request: e instanceof Error ? e.message : 'Error unknown' },
    }
  }
}

export async function registerAppointment(
  prev: InitialState<Appointment>,
  formData: FormData,
): Promise<InitialState<Appointment>> {
  try {
    const body = Object.fromEntries(formData.entries())
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
    const body = Object.fromEntries(formData.entries())
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
      error: { request: e instanceof Error ? e.message : 'Error unknown' },
    }
  }
}
