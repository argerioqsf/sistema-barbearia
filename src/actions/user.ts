'use server'

import { formSchemaUpdateUserProfile } from '@/components/template/DetailUsers/schema'
import { formSchemaRegisterIndicatorProfile } from '@/components/template/RegisterIndicators/schema'
import { formSchemaRegisterUserProfile } from '@/components/template/RegisterUser/schema'
import { api } from '@/data/api'
import {
  Errors,
  InitialState,
  Profile,
  ReturnGet,
  ReturnList,
  Roles,
  User,
} from '@/types/general'
import { getTokenFromCookieServer } from '@/utils/cookieServer'
import { revalidateTag } from 'next/cache'

export async function getUser(id: string): Promise<ReturnGet<User>> {
  try {
    const token = getTokenFromCookieServer()
    const response = await api(`/user/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const errorMessage = await response.text()
      return {
        error: { request: JSON.parse(errorMessage).message },
      }
    }
    const user = await response.json()
    return { response: user }
  } catch (error) {
    return { error: { request: 'Error unknown' } }
  }
}

export async function listUsers(
  q: string,
  page: string,
): Promise<ReturnList<User>> {
  try {
    const token = getTokenFromCookieServer()
    const response = await api(
      '/users',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: {
          tags: ['users', 'indicators', 'consultants'],
          revalidate: 60 * 4,
        },
      },
      page,
      q,
    )

    if (!response.ok) {
      const errorMessage = await response.text()
      return {
        error: { request: JSON.parse(errorMessage).message },
      }
    }
    const { users, count } = await response.json()
    return { response: users, count }
  } catch (error) {
    return { error: { request: 'Error unknown' } }
  }
}

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
          active: formData.get('active') === 'true',
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

export async function registerIndicatorProfile(
  prevState: InitialState<Profile | User>,
  formData: FormData,
): Promise<InitialState<User>> {
  const validatedFields = formSchemaRegisterIndicatorProfile.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    active: formData.get('active'),
    phone: formData.get('phone'),
    cpf: formData.get('cpf'),
    genre: formData.get('genre'),
    birthday: formData.get('birthday'),
    pix: formData.get('pix'),
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
          active: formData.get('active') === 'true',
          phone: formData.get('phone'),
          cpf: formData.get('cpf'),
          genre: formData.get('genre'),
          birthday: formData.get('birthday'),
          pix: formData.get('pix'),
          role: 'indicator',
        }),
      })

      if (!response.ok) {
        const errorMessage = await response.text()
        return {
          errors: { request: JSON.parse(errorMessage).message },
        }
      }

      revalidateTag('indicators')

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

export async function getIndicator(id: string): Promise<ReturnGet<User>> {
  try {
    const token = getTokenFromCookieServer()
    const response = await api(`/indicator/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        revalidate: 15,
      },
    })

    if (!response.ok) {
      const errorMessage = await response.text()
      return {
        error: { request: JSON.parse(errorMessage).message },
      }
    }
    const user = await response.json()
    return { response: user }
  } catch (error) {
    return { error: { request: 'Error unknown' } }
  }
}

export async function listIndicators(
  q?: string,
  page?: string,
): Promise<ReturnList<User>> {
  try {
    const token = getTokenFromCookieServer()
    const response = await api(
      '/indicators',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { tags: ['indicators'], revalidate: 60 * 4 },
      },
      page,
      q,
    )

    if (!response.ok) {
      const errorMessage = await response.text()
      return {
        error: { request: JSON.parse(errorMessage).message },
      }
    }
    const { users, count } = await response.json()
    return { response: users, count }
  } catch (error) {
    return { error: { request: 'Error unknown' } }
  }
}

export async function updateUserProfile(
  id: string,
  prevState: InitialState<Profile | User>,
  formData: FormData,
): Promise<InitialState<Profile | User>> {
  const role = formData.get('profile.role')
  const validatedFields = formSchemaUpdateUserProfile.safeParse({
    id,
    name: formData.get('name'),
    email: formData.get('email'),
    'profile.active': formData.get('active'),
    'profile.phone': formData.get('profile.phone'),
    'profile.cpf': formData.get('profile.cpf'),
    'profile.genre': formData.get('profile.genre'),
    'profile.birthday': formData.get('profile.birthday'),
    'profile.pix': formData.get('profile.pix'),
    'profile.role': formData.get('profile.role'),
    'profile.city': formData.get('profile.city'),
  })

  if (validatedFields.success) {
    try {
      const TOKEN_SIM = getTokenFromCookieServer()

      if (!TOKEN_SIM) {
        return {
          errors: { request: 'Erro de credenciais' },
        }
      }
      const response = await api(`/profile/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN_SIM}`,
        },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          active: formData.get('active') === 'true',
          phone: formData.get('profile.phone'),
          cpf: formData.get('profile.cpf'),
          genre: formData.get('profile.genre'),
          birthday: formData.get('profile.birthday'),
          pix: formData.get('profile.pix'),
          role,
          city: formData.get('profile.city'),
        }),
      })
      if (!response.ok) {
        const errorMessage = await response.text()
        return {
          errors: { request: JSON.parse(errorMessage).message },
        }
      }
      revalidateTag('users')
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
    return { errors: { request: 'Error unknown' } }
  }
}
