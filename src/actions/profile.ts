'use server'

import { formSchemaEditProfile } from '@/components/template/ProfileDetail/schema'
import { api } from '@/data/api'
import { Errors, InitialState, Profile } from '@/types/general'
import {
  setRolesInCookieServer,
  setTokenInCookieServer,
  setUserInCookieServer,
} from '@/utils/cookieServer'

export async function editProfile(
  prevState: InitialState<Profile>,
  formData: FormData,
): Promise<InitialState<Profile>> {
  const validatedFields = formSchemaEditProfile.safeParse({
    name: formData.get('name'),
    phone: formData.get('phone'),
    cpf: formData.get('cpf'),
    pix: formData.get('pix'),
    email: formData.get('email'),
    city: formData.get('city'),
    status: formData.get('status'),
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
    const error = validatedFields.error.flatten().fieldErrors as Errors<Profile>
    return {
      errors: { ...error },
    }
  } else {
    return { errors: { request: 'Error unknown' } }
  }
}
