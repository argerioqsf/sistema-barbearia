'use server'

import { formSchemaSignIn } from '@/components/template/SingIn/schema'
import { api } from '@/data/api'
import { Errors, InitialState, User } from '@/types/general'
import {
  setRolesInCookieServer,
  setTokenInCookieServer,
  setUserInCookieServer,
} from '@/utils/cookieServer'

export async function loginUser(
  prevState: InitialState<User>,
  formData: FormData,
): Promise<InitialState<User>> {
  const validatedFields = formSchemaSignIn.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (validatedFields.success) {
    try {
      const response = await api(`/sessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.get('email'),
          password: formData.get('password'),
        }),
      })
      if (!response.ok) {
        const errorMessage = await response.text()
        return {
          errors: { request: JSON.parse(errorMessage).message },
        }
      }
      const resp = await response.json()
      const token = resp?.token
      const user = resp?.user as User
      const roles = resp?.roles
      setTokenInCookieServer(token)
      setUserInCookieServer(user)
      setRolesInCookieServer(roles)
      return {
        errors: {},
        ok: true,
        resp: user
      }
    } catch (error) {
      return {
        errors: { request: 'Failed to Login' },
      }
    }
  } else if (validatedFields.error) {
    const error = validatedFields.error.flatten().fieldErrors as Errors<User>
    return {
      errors: { ...error },
    }
  } else {
    return { errors: { request: 'Error unknown' } }
  }
}

export async function actionDefault<T>(
  prevState: InitialState<T>,
  formData: FormData,
): Promise<InitialState<T>> {
  console.log('prevState: ', prevState)
  console.log('formData: ', formData)
  return {
    errors: {},
    ok: true,
  }
}
