'use server'

import { searchSchema } from '@/components/molecules/Search/schema'
import { formSchemaUpdateUserProfile } from '@/components/template/DetailUsers/schema'
import { formSchemaRegisterUserProfile } from '@/components/template/RegisterUser/schema'
import { api } from '@/data/api'
import { Errors, InitialState, User } from '@/types/general'
import { getTokenFromCookieClient } from '@/utils/cookieClient'
import {
  getRoleUserFromCookieServer,
  getTokenFromCookieServer,
} from '@/utils/cookieServer'
import { verifyPermissionUser } from '@/utils/verifyPermissionUser'

export async function registerUserProfile(
  prevState: InitialState,
  formData: FormData,
): Promise<InitialState> {
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
      const response = await api(`/create/user`, {
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

export async function updateUserProfile(
  prevState: InitialState,
  formData: FormData,
): Promise<InitialState> {
  const validatedFields = formSchemaUpdateUserProfile.safeParse({
    id: formData.get('id'),
    name: formData.get('name'),
    email: formData.get('email'),
    active: formData.get('active'),
    phone: formData.get('profile.phone'),
    cpf: formData.get('profile.cpf'),
    genre: formData.get('profile.genre'),
    birthday: formData.get('profile.birthday'),
    pix: formData.get('profile.pix'),
    role: formData.get('profile.role'),
  })

  if (validatedFields.success) {
    try {
      const TOKEN_SIM = getTokenFromCookieServer()
      const roleUser = getRoleUserFromCookieServer()
      if (!TOKEN_SIM) {
        return {
          errors: { request: 'Erro de credenciais' },
        }
      }
      const idUser = formData.get('id')
      const response = await api(`/update/user/${idUser}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN_SIM}`,
        },
        body: JSON.stringify({
          name: formData.get('user.name'),
          email: formData.get('user.email'),
          active: formData.get('user.active') === 'true',
          phone: formData.get('phone'),
          cpf: formData.get('cpf'),
          genre: formData.get('genre'),
          birthday: formData.get('birthday'),
          pix: formData.get('pix'),
          role:
            verifyPermissionUser('setRole', roleUser) ?? formData.get('role'),
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
        errors: { request: 'Failed to update User' },
      }
    }
  } else if (validatedFields.error) {
    const error = validatedFields.error.flatten().fieldErrors as Errors
    return {
      errors: { ...error },
    }
  } else {
    console.log('Error unknown: ')
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
      const response = await api(`/api/users`, {
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
