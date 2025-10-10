'use server'

import { ReturnGet, InitialState, ReturnRequest } from '@/types/general'
import type { ZService as Service, ZService } from '@/features/services/schemas'
import {
  createService as apiCreateService,
  fetchService,
  fetchServices,
  fetchServicesPaginated,
  updateService as apiUpdateService,
} from '@/features/services/api'
import type { QueryParams, ReturnListPaginated } from '@/types/http'
import { api } from '@/data/api'
import { revalidateTag } from 'next/cache'
import { toNormalizedError } from '@/shared/errors/to-normalized-error'
import { getBackendToken } from '@/utils/authServer'
import { handleRequestError } from '@/shared/errors/handlerRequestError'

export async function listServicesPaginated(
  page?: string,
  where?: QueryParams<ZService, true>,
): Promise<ReturnRequest<ReturnListPaginated<Service>>> {
  try {
    const serviceList = await fetchServicesPaginated(page, where)
    return { ok: true, data: serviceList }
  } catch (error) {
    const normalized = handleRequestError(error, {
      rethrow: false,
    })
    return { ok: false, error: normalized }
  }
}

export async function listServicesAll(
  page?: string,
  where?: QueryParams<ZService, true>,
): Promise<ReturnRequest<ZService[]>> {
  try {
    const serviceList = await fetchServices(page, where)
    return { ok: true, data: serviceList }
  } catch (error) {
    const normalized = handleRequestError(error, {
      rethrow: false,
    })
    return { ok: false, error: normalized }
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
): Promise<ReturnRequest<Service>> {
  try {
    const rawData = {
      name: formData.get('name') as string,
      description: (formData.get('description') as string) || '',
      cost: Number(formData.get('cost')),
      price: Number(formData.get('price')),
      defaultTime: Number(formData.get('defaultTime')) || undefined,
      commissionPercentage:
        Number(formData.get('commissionPercentage')) || undefined,
      categoryId: formData.get('categoryId') as string,
      image: formData.get('image'),
    }

    const data = await apiCreateService(rawData)
    revalidateTag('services')
    return { ok: true, data }
  } catch (e) {
    const normalized = handleRequestError(e, {
      rethrow: false,
    })
    return { ok: false, error: normalized }
  }
}

export async function updateService(
  id: string,
  prevState: InitialState<Service>,
  formData: FormData,
): Promise<ReturnRequest<Service>> {
  try {
    const rawData = {
      name: formData.get('name') as string,
      description: (formData.get('description') as string) || '',
      cost: Number(formData.get('cost')),
      price: Number(formData.get('price')),
      defaultTime: Number(formData.get('defaultTime')) || undefined,
      commissionPercentage:
        Number(formData.get('commissionPercentage')) || undefined,
      categoryId: formData.get('categoryId') as string,
    }

    const data = await apiUpdateService(id, rawData)
    revalidateTag('services')
    revalidateTag(id)
    return { ok: true, data }
  } catch (e) {
    const normalized = handleRequestError(e, {
      rethrow: false,
    })
    return { ok: false, error: normalized }
  }
}

export async function deleteService(id: string): Promise<ReturnRequest<void>> {
  try {
    const token = await getBackendToken()
    const response = await api(`/services/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!response.ok) {
      const errorMessage = await response.text()
      throw new Error(errorMessage)
    }
    revalidateTag('services')
    return { ok: true, data: undefined }
  } catch (e) {
    const normalized = handleRequestError(e, {
      rethrow: false,
    })
    return { ok: false, error: normalized }
  }
}
