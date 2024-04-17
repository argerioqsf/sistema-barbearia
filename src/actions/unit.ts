'use server'

import { formSchemaUpdateUnit } from '@/components/template/DetailUnits/schema'
import { formSchemaRegisterUnit } from '@/components/template/RegisterUnits/schema'
import { api } from '@/data/api'
import { InitialState, Unit } from '@/types/general'
import { getTokenFromCookieServer } from '@/utils/cookieServer'

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
  prevState: InitialState<Unit>,
  formData: FormData,
): Promise<InitialState<Unit>> {
  const segments = JSON.parse(String(formData.get('segments')) ?? '[]')
  const courses = JSON.parse(String(formData.get('courses')) ?? '[]')
  const validatedFields = formSchemaUpdateUnit.safeParse({
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
      const response = await api(`/update/unit`, {
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
