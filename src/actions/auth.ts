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
        resp: user,
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function actionDefault<T>(
  _prevState: InitialState<T>, // eslint-disable-line @typescript-eslint/no-unused-vars
  _formData: FormData, // eslint-disable-line @typescript-eslint/no-unused-vars
): Promise<InitialState<T>> {
  return {
    errors: {},
    ok: true,
  }
}
