import { api } from '@/data/api'
import { getBackendToken } from '@/utils/authServer'
import { safeJson, readMessage } from '@/shared/http'
import type { JsonObject, QueryParams } from '@/types/http'
import {
  AppointmentSchema,
  AppointmentsListResponseSchema,
  BarbersListResponseSchema,
  ListUnpaidAppointmentsResponseSchema,
  type ZAppointment,
} from './schemas'
import { HttpError } from '@/shared/errors/httpError'
import { ValidationError } from '@/shared/errors/validationError'
import { logger } from '@/shared/logger'

export async function fetchAppointments(
  params?: QueryParams<ZAppointment>,
): Promise<ZAppointment[]> {
  const token = await getBackendToken()
  const response = await api(
    '/appointments',
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
      next: { tags: ['appointments'], revalidate: 60 * 4 },
    },
    String(params?.page ?? ''),
    params,
  )
  if (!response.ok) {
    const message = await readMessage(response)
    throw new HttpError(response.status, message)
  }
  const json = await safeJson(response)
  const parsed = AppointmentsListResponseSchema.safeParse(json)
  if (!parsed.success) {
    throw ValidationError.fromZod(
      parsed.error,
      'Invalid response list appointments',
    )
  }
  return parsed.data
}

export async function createAppointment(body: JsonObject) {
  const token = await getBackendToken()
  const response = await api('/create/appointment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })
  if (!response.ok) throw new Error(await readMessage(response))
  return AppointmentSchema.parse(await safeJson(response))
}

export async function updateAppointment(id: string, body: JsonObject) {
  const token = await getBackendToken()
  const response = await api(`/appointments/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })
  if (!response.ok) throw new Error(await readMessage(response))
  return AppointmentSchema.parse(await safeJson(response))
}

export async function fetchAppointmentBarbers() {
  const token = await getBackendToken()
  const response = await api('/appointment-barbers', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!response.ok) throw new Error(await readMessage(response))
  const json = await safeJson(response)
  if (Array.isArray(json)) return json
  return BarbersListResponseSchema.parse(json).users
}

export async function fetchUnpaidAppointments(id: string) {
  const token = await getBackendToken()
  const response = await api(
    `/collaborators/${id}/pending-commission-appointments`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
      next: {
        tags: [`pending-commission-sale-items-${id}`, 'sales'],
        revalidate: 60 * 2,
      },
    },
  )

  if (!response.ok) {
    const message = await readMessage(response)
    throw new HttpError(response.status, message)
  }

  const json = await safeJson(response)
  const parsed = ListUnpaidAppointmentsResponseSchema.safeParse(json)

  if (!parsed.success) {
    logger.debug(
      { errors: parsed.error },
      'errors parsed fetchUnpaidAppointments',
    )
    throw ValidationError.fromZod(
      parsed.error,
      `Invalid response when list unpaid appointments for collaborator ${id}`,
    )
  }
  return parsed.data
}
