'use server'

import { ReturnGet, ReturnList, InitialState } from '@/types/general'
import type { ZService as Service } from '@/features/services/schemas'
import { fetchService, fetchServices } from '@/features/services/api'
import type { QueryParams } from '@/types/http'
import { api } from '@/data/api'
import { getTokenFromCookieServer } from '@/utils/cookieServer'
import { revalidateTag } from 'next/cache'
import { toNormalizedError } from '@/shared/errors/to-normalized-error'

export async function listServices(
  page?: string,
  where?: QueryParams<Service>,
): Promise<ReturnList<Service>> {
  try {
    const services = await fetchServices(page, where)
    return { response: services, count: 0 }
  } catch (error) {
    return { error: toNormalizedError('Error unknown') }
  }
}

export async function getService(id: string): Promise<ReturnGet<Service>> {
  try {
    const service = await fetchService(id)
    return { response: service }
  } catch (error) {
    return { error: toNormalizedError('Error unknown') }
  }
}

export async function registerService(
  prevState: InitialState<Service>,
  formData: FormData,
): Promise<InitialState<Service>> {
  try {
    const token = getTokenFromCookieServer()
    const json = Object.fromEntries(formData.entries())
    const response = await api('/create/service', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(json),
    })
    if (!response.ok) {
      const errorMessage = await response.text()
      return { errors: { request: JSON.parse(errorMessage).message } }
    }
    revalidateTag('services')
    return { ok: true, errors: {} }
  } catch {
    return { errors: { request: 'Failed to register service' } }
  }
}

export async function updateService(
  id: string,
  prevState: InitialState<Service>,
  formData: FormData,
): Promise<InitialState<Service>> {
  try {
    const token = getTokenFromCookieServer()
    const json = Object.fromEntries(formData.entries())
    const response = await api(`/services/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(json),
    })
    if (!response.ok) {
      const errorMessage = await response.text()
      return { errors: { request: JSON.parse(errorMessage).message } }
    }
    revalidateTag('services')
    revalidateTag(id)
    return { ok: true, errors: {} }
  } catch {
    return { errors: { request: 'Failed to update service' } }
  }
}

export async function deleteService(
  id: string,
): Promise<InitialState<Service>> {
  try {
    const token = getTokenFromCookieServer()
    const response = await api(`/services/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!response.ok) {
      const errorMessage = await response.text()
      return { errors: { request: JSON.parse(errorMessage).message } }
    }
    revalidateTag('services')
    return { ok: true, errors: {} }
  } catch {
    return { errors: { request: 'Failed to delete service' } }
  }
}
