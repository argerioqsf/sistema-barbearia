'use server'

import { formSchemaUpdateUnit } from '@/components/template/DetailUnits/schema'
import { formSchemaRegisterUnit } from '@/components/template/RegisterUnits/schema'
import { api } from '@/data/api'
import { InitialState, ReturnGet, ReturnList, Unit } from '@/types/general'
import { getTokenFromCookieServer } from '@/utils/cookieServer'
import { revalidateTag } from 'next/cache'

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
      const TOKEN_SIM = getTokenFromCookieServer()
      if (!TOKEN_SIM) {
        return {
          errors: { request: 'Erro de credenciais' },
        }
      }
      const response = await api(`/create/unit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN_SIM}`,
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

export async function updateUnit(
  id: string,
  prevState: InitialState<Unit>,
  formData: FormData,
): Promise<InitialState<Unit>> {
  const segments = JSON.parse(String(formData.get('segments')) ?? '[]')
  const courses = JSON.parse(String(formData.get('courses')) ?? '[]')
  const validatedFields = formSchemaUpdateUnit.safeParse({
    id,
    name: formData.get('name'),
    segments,
    courses,
  })

  if (validatedFields.success) {
    try {
      const TOKEN_SIM = getTokenFromCookieServer()
      if (!TOKEN_SIM) {
        return {
          errors: { request: 'Erro de credenciais' },
        }
      }
      const response = await api(`/unit/${id}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN_SIM}`,
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
      revalidateTag(id)
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

export async function getUnit(id: string): Promise<ReturnGet<Unit>> {
  try {
    const token = getTokenFromCookieServer()
    const response = await api(`/unit/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { tags: [id], revalidate: 60 * 4 },
    })

    if (!response.ok) {
      const errorMessage = await response.text()
      return {
        error: { request: JSON.parse(errorMessage).message },
      }
    }
    const list = await response.json()
    return { response: list }
  } catch (error) {
    return { error: { request: 'Error unknown' } }
  }
}

export async function listUnits(
  q: string,
  page: string,
): Promise<ReturnList<Unit>> {
  try {
    const token = getTokenFromCookieServer()
    const response = await api(
      '/units',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { tags: ['units'], revalidate: 60 * 4 },
      },
      page,
      q,
    )

    if (!response.ok) {
      const errorMessage = await response.text()
      return {
        error: { request: JSON.parse(errorMessage).message },
      }
    }
    const { units, count } = await response.json()
    return { response: units, count }
  } catch (error) {
    return { error: { request: 'Error unknown' } }
  }
}
