'use server'

import {
  fetchBarbers,
  fetchBarber,
  createBarber,
  updateBarber,
  deleteBarber,
} from '@/features/barbers/api'
import type { ZBarber as Barber } from '@/features/barbers/schemas'
import type { InitialState, ReturnList } from '@/types/general'
import type { JsonObject, QueryParams } from '@/types/http'
import { revalidateTag } from 'next/cache'
import { toNormalizedError } from '@/shared/errors/to-normalized-error'

export async function listBarbers(
  page?: string,
  where?: QueryParams<Barber>,
): Promise<ReturnList<Barber>> {
  try {
    const { users, count } = await fetchBarbers(page, where)
    return { response: users as Barber[], count }
  } catch (e) {
    return {
      error: toNormalizedError(
        e instanceof Error ? e.message : 'Error unknown',
      ),
    }
  }
}

export async function getBarber(id: string) {
  try {
    const user = await fetchBarber(id)
    return { response: user }
  } catch (e) {
    return {
      error: toNormalizedError(
        e instanceof Error ? e.message : 'Error unknown',
      ),
    }
  }
}

export async function registerBarber(
  prev: InitialState<Barber>,
  formData: FormData,
) {
  try {
    const body = Object.fromEntries(formData.entries()) as JsonObject
    await createBarber(body)
    revalidateTag('barbers')
    return { ok: true, errors: {} }
  } catch (e) {
    return {
      errors: {
        request: e instanceof Error ? e.message : 'Failed to create barber',
      },
    }
  }
}

export async function patchBarber(
  id: string,
  prev: InitialState<Barber>,
  formData: FormData,
) {
  try {
    const body = Object.fromEntries(formData.entries()) as JsonObject
    await updateBarber(id, body)
    revalidateTag('barbers')
    revalidateTag(id)
    return { ok: true, errors: {} }
  } catch (e) {
    return {
      errors: {
        request: e instanceof Error ? e.message : 'Failed to update barber',
      },
    }
  }
}

export async function removeBarber(id?: string) {
  if (!id) return { errors: { request: 'Id undefined' } }
  try {
    await deleteBarber(id)
    revalidateTag('barbers')
    return { ok: true, errors: {} }
  } catch (e) {
    return {
      errors: {
        request: e instanceof Error ? e.message : 'Failed to delete barber',
      },
    }
  }
}
