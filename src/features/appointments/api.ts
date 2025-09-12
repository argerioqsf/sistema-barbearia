import { api } from '@/data/api'
import { getBackendToken } from '@/utils/authServer'
import { safeJson, readMessage } from '@/shared/http'
import type { JsonObject, QueryParams } from '@/types/http'
import {
  AppointmentSchema,
  AppointmentsListResponseSchema,
  BarbersListResponseSchema,
  type ZAppointment,
} from './schemas'

export async function fetchAppointments(params?: QueryParams): Promise<{
  items: ZAppointment[]
  count?: number
  page?: number
  perPage?: number
}> {
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
  if (!response.ok) throw new Error(await readMessage(response))
  const json = await safeJson(response)
  if (Array.isArray(json))
    return { items: json.map((i) => AppointmentSchema.parse(i)) }
  return AppointmentsListResponseSchema.parse(json)
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
