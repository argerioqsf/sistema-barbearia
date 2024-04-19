'use server'

import { formSchemaUpdateUserProfile } from '@/components/template/DetailUsers/schema'
import { formSchemaRegisterUserProfile } from '@/components/template/RegisterUser/schema'
import { api } from '@/data/api'
import { Errors, InitialState, Profile, Roles, User } from '@/types/general'
import {
  getRoleUserFromCookieServer,
  getTokenFromCookieServer,
} from '@/utils/cookieServer'
import { verifyPermissionUser } from '@/utils/verifyPermissionUser'
import { revalidateTag } from 'next/cache'

export async function registerUserProfile(
  prevState: InitialState<Profile | User>,
  formData: FormData,
): Promise<InitialState<User>> {
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

      const role = formData.get('role') as keyof Roles
      if (role === 'indicator') {
        revalidateTag('indicators')
      } else if (role === 'consultant') {
        revalidateTag('consultants')
      } else {
        revalidateTag('users')
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
    const error = validatedFields.error.flatten().fieldErrors as Errors<User>
    return {
      errors: { ...error },
    }
  } else {
    return { errors: { request: 'Error unknown' } }
  }
}

export async function updateUserProfile(
  prevState: InitialState<Profile | User>,
  formData: FormData,
): Promise<InitialState<Profile | User>> {
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
    const error = validatedFields.error.flatten().fieldErrors as Errors<
      Profile & User
    >
    return {
      errors: { ...error },
    }
  } else {
    console.log('Error unknown: ')
    return { errors: { request: 'Error unknown' } }
  }
}
