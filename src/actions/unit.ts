'use server'

import { formSchemaUpdateUnit } from '@/components/template/DetailUnits/schema'
import { formSchemaRegisterUnit } from '@/components/template/RegisterUnits/schema'
import { api } from '@/data/api'
import { InitialState, Unit } from '@/types/general'
import { getTokenFromCookieServer } from '@/utils/cookieServer'

export async function registerUnit(
  prevState: InitialState<Unit>,
  formData: FormData,
): Promise<InitialState<Unit & { request?: string }>> {
  console.log('formData: ', formData)
  const segments = JSON.parse(String(formData.get('segments')) ?? '[]')
  const courses = JSON.parse(String(formData.get('courses')) ?? '[]')
  console.log('segments: ', segments)
  console.log('courses: ', courses)
  const validatedFields = formSchemaRegisterUnit.safeParse({
    name: formData.get('name'),
    segments,
    courses,
  })

  console.log('validatedFields: ', validatedFields)
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
      console.log('response: ', response)
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

    console.log('validatedFields error: ', error)
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
): Promise<InitialState<Unit & { request?: string }>> {
  const validatedFields = formSchemaUpdateUnit.safeParse({
    name: formData.get('name'),
    // courses: formData.get('email'),
    // segments: formData.get('password'),
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
