'use server'

import { searchSchema } from '@/components/molecules/Search/schema'
import { formSchemaRegisterUserProfile } from '@/components/template/RegisterUser/schema'
import { Errors, InitialState, User } from '@/types/general'
import { getTokenFromCookieClient } from '@/utils/cookieClient'
import { getTokenFromCookieServer } from '@/utils/cookieServer'

export async function registerUserProfile(
  prevState: InitialState,
  formData: FormData,
): Promise<InitialState> {
  console.log('formData.get("active"): ', !!formData.get('active'))
  const validatedFields = formSchemaRegisterUserProfile.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    active: formData.get('active'),
    phone: formData.get('phone'),
    cpf: formData.get('cpf'),
    genre: formData.get('genre'),
    birthday: formData.get('birthday'),
    pix: formData.get('pix'),
    role: formData.get('role'),
  })

  if (validatedFields.success) {
    try {
      const TOKEN_SIM = getTokenFromCookieServer()
      if (!TOKEN_SIM) {
        return {
          errors: { request: 'Erro de credenciais' },
        }
      }
      const response = await fetch(`${process.env.URL_API}/create/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN_SIM}`,
        },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          password: formData.get('password'),
          active: formData.get('active') === 'sim',
          phone: formData.get('phone'),
          cpf: formData.get('cpf'),
          genre: formData.get('genre'),
          birthday: formData.get('birthday'),
          pix: formData.get('pix'),
          role: formData.get('role'),
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

export async function searchUsers(
  prevState: InitialState,
  formData: FormData,
): Promise<InitialState> {
  const validatedFields = searchSchema.safeParse({
    search: formData.get('search'),
  })

  if (validatedFields.success) {
    try {
      const value = getTokenFromCookieClient()
      const response = await fetch(`${process.env.URL_API}/api/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${value}`,
        },
      })
      if (!response.ok) {
        const errorMessage = await response.text()
        return {
          errors: { request: JSON.parse(errorMessage).message },
        }
      }
      const users = (await response.json()) as { users: User[] }
      return {
        errors: {},
        ok: true,
        resp: users.users,
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
