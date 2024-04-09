'use server'

import { formSchemaSignIn } from '@/components/template/SingIn/schema'
import { Errors, InitialState } from '@/types/general'
import {
  setRolesInCookieServer,
  setTokenInCookieServer,
  setUserInCookieServer,
} from '@/utils/cookieServer'

export async function loginUser(
  prevState: InitialState,
  formData: FormData,
): Promise<InitialState> {
  const validatedFields = formSchemaSignIn.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (validatedFields.success) {
    try {
      const response = await fetch(`${process.env.URL_API}/sessions`, {
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
      const user = resp?.user
      const roles = resp?.roles
      setTokenInCookieServer(token)
      setUserInCookieServer(user)
      setRolesInCookieServer(roles)
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
