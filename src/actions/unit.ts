'use server'

import { formSchemaRegisterUnit } from '@/components/template/RegisterUnits/schema'
import { api } from '@/data/api'
import { InitialState, ReturnList, ReturnRequest, Unit } from '@/types/general'
import { revalidateTag } from 'next/cache'
import { fetchUnit, fetchUnits, fetchUnitsSelect } from '@/features/units/api'
import { toNormalizedError } from '@/shared/errors/to-normalized-error'
import { getBackendToken } from '@/utils/authServer'
import { ZUnit } from '@/features/units/schemas'
import { handleRequestError } from '@/shared/errors/handlerRequestError'

export async function registerUnit(
  prevState: InitialState<Unit>,
  formData: FormData,
): Promise<InitialState<Unit>> {
  const segments = JSON.parse(String(formData.get('segments')) ?? '[]')
  const courses = JSON.parse(String(formData.get('courses')) ?? '[]')
  const validatedFields = formSchemaRegisterUnit.safeParse({
    name: formData.get('name'),
    segments,
    courses,
  })

  if (validatedFields.success) {
    try {
      const token = await getBackendToken()
      if (!token) {
        return {
          errors: { request: 'Erro de credenciais' },
        }
      }
      const response = await api(`/create/unit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.get('name'),
          segments: segments ?? [],
          courses: courses ?? [],
        }),
      })
      if (!response.ok) {
        const errorMessage = await response.text()
        return {
          errors: { request: JSON.parse(errorMessage).message },
        }
      }
      revalidateTag('units')
      return {
        errors: {},
        ok: true,
      }
    } catch (error) {
      return {
        errors: { request: 'Failed to Login' },
      }
    }
  } else if (validatedFields.error) {
    const error = validatedFields.error.flatten().fieldErrors as Partial<Unit>

    return {
      errors: { ...error },
    }
  } else {
    return { errors: { request: 'Error unknown' } }
  }
}

export async function getUnit(id: string): Promise<ReturnRequest<ZUnit>> {
  try {
    const unit = await fetchUnit(id)
    return { ok: true, data: unit }
  } catch (error) {
    const normalized = handleRequestError(error, {
      rethrow: false,
    })
    return { ok: false, error: normalized }
  }
}

export async function deleteUnit(id?: string): Promise<InitialState<Unit>> {
  try {
    if (!id) return { errors: { request: 'Id undefined' } }
    const token = await getBackendToken()
    const response = await api(`/unit/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) {
      const errorMessage = await response.text()
      return {
        errors: { request: JSON.parse(errorMessage).message },
      }
    }
    revalidateTag('units')
    return {
      ok: true,
    }
  } catch (error) {
    return { errors: { request: 'Error unknown' } }
  }
}

export async function listUnits(
  page: string,
  where?: Partial<Unit>,
): Promise<ReturnList<Unit>> {
  try {
    const units = await fetchUnits(page, where)
    return { response: units, count: 0 }
  } catch (error) {
    return { error: toNormalizedError('Error unknown') }
  }
}

export async function listSelectUnits(): Promise<ReturnList<Unit>> {
  try {
    const units = await fetchUnitsSelect()
    return { response: units as unknown as Unit[] }
  } catch (error) {
    return { error: toNormalizedError('Error unknown') }
  }
}
