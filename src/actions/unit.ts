'use server'

import { formSchemaUpdateUnit } from '@/components/template/DetailUnits/schema'
import { api } from '@/data/api'
import { Errors, InitialState } from '@/types/general'
import { getTokenFromCookieServer } from '@/utils/cookieServer'

export async function registerUnit(
  prevState: InitialState,
  formData: FormData,
): Promise<InitialState> {
  const validatedFields = formSchemaUpdateUnit.safeParse({
    name: formData.get('name'),
    // courses: formData.get('email'),
    // segments: formData.get('password'),
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
          // courses: formData.get('courses'),
          // segments: formData.get('segments'),
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
    const error = validatedFields.error.flatten().fieldErrors as Errors
    return {
      errors: { ...error },
    }
  } else {
    return { errors: { request: 'Error unknown' } }
  }
}

export async function updateUnit(
  prevState: InitialState,
  formData: FormData,
): Promise<InitialState> {
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
    const error = validatedFields.error.flatten().fieldErrors as Errors
    return {
      errors: { ...error },
    }
  } else {
    return { errors: { request: 'Error unknown' } }
  }
}
