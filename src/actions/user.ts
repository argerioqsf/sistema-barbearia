'use server'

import { formSchemaUpdateIndicator } from '@/components/template/DetailIndicators/schema'
import { formSchemaUpdateUserProfile } from '@/components/template/DetailUsers/schema'
import { formSchemaRegisterIndicatorProfile } from '@/components/template/RegisterIndicators/schema'
import { formSchemaRegisterIndicatorPublic } from '@/components/template/RegisterIndicatorsPublic/schema'
import { formSchemaRegisterUserProfile } from '@/components/template/RegisterUser/schema'
import { api } from '@/data/api'
import {
  Errors,
  InitialState,
  Profile,
  ReturnGet,
  ReturnList,
  Roles,
  Unit,
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
      next: {
        tags: [id],
        revalidate: 60 * 4,
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
  page: string,
  where?: Partial<User>,
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
      where,
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
  prevState: InitialState<Profile | User | Unit>,
  formData: FormData,
): Promise<InitialState<User>> {
  const units = JSON.parse(String(formData.get('units')) ?? '[]')
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
    city: formData.get('city'),
    units,
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
          city: formData.get('city'),
          unitsIds: units,
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
  id: string,
  prevState: InitialState<Profile | User | Unit>,
  formData: FormData,
): Promise<InitialState<Profile | User>> {
  const role = formData.get('profile.role')
  const units = JSON.parse(String(formData.get('profile.units')) ?? '[]')
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
    'profile.units': units,
  })

  if (validatedFields.success) {
    try {
      const TOKEN_SIM = getTokenFromCookieServer()

      if (!TOKEN_SIM) {
        return {
          errors: { request: 'Erro de credenciais' },
        }
      }
      const data = {
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
        unitsIds: units,
      }
      console.log('data:', data)
      const response = await api(`/profile/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN_SIM}`,
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        const errorMessage = await response.text()
        return {
          errors: { request: JSON.parse(errorMessage).message },
        }
      }
      revalidateTag(id)
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

// Indicador

export async function registerIndicatorProfile(
  prevState: InitialState<User | Profile>,
  formData: FormData,
): Promise<InitialState<User | Profile>> {
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
    city: formData.get('city'),
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
          city: formData.get('city'),
        }),
      })

      if (!response.ok) {
        const errorMessage = await response.text()
        return {
          errors: { request: JSON.parse(errorMessage).message },
        }
      }

      revalidateTag('indicators')
      revalidateTag('users')
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

export async function registerIndicatorProfilePublic(
  prevState: InitialState<User | Profile>,
  formData: FormData,
): Promise<InitialState<User>> {
  const validatedFields = formSchemaRegisterIndicatorPublic.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    'profile.phone': formData.get('profile.phone'),
    'profile.cpf': formData.get('profile.cpf'),
    'profile.genre': formData.get('profile.genre'),
    'profile.birthday': formData.get('profile.birthday'),
    'profile.pix': formData.get('profile.pix'),
  })

  if (validatedFields.success) {
    try {
      const response = await api(`/create/indicator`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          password: formData.get('password'),
          phone: formData.get('profile.phone'),
          cpf: formData.get('profile.cpf'),
          genre: formData.get('profile.genre'),
          birthday: formData.get('profile.birthday'),
          pix: formData.get('profile.pix'),
        }),
      })

      if (!response.ok) {
        const errorMessage = await response.text()
        return {
          errors: { request: JSON.parse(errorMessage).message },
        }
      }

      revalidateTag('indicators')
      revalidateTag('users')
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
        tags: [id],
        revalidate: 60 * 4,
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
  page?: string,
  where?: Partial<User>,
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
      where,
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

export async function updateUserProfileIndicator(
  id: string,
  prevState: InitialState<Profile | User>,
  formData: FormData,
): Promise<InitialState<Profile | User>> {
  const validatedFields = formSchemaUpdateIndicator.safeParse({
    id,
    name: formData.get('name'),
    email: formData.get('email'),
    'profile.active': formData.get('active'),
    'profile.phone': formData.get('profile.phone'),
    'profile.cpf': formData.get('profile.cpf'),
    'profile.genre': formData.get('profile.genre'),
    'profile.birthday': formData.get('profile.birthday'),
    'profile.pix': formData.get('profile.pix'),
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
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        active: formData.get('active') === 'true',
        phone: formData.get('profile.phone'),
        cpf: formData.get('profile.cpf'),
        genre: formData.get('profile.genre'),
        birthday: formData.get('profile.birthday'),
        pix: formData.get('profile.pix'),
        role: 'indicator',
        city: formData.get('profile.city'),
      }
      const response = await api(`/profile/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN_SIM}`,
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        const errorMessage = await response.text()
        return {
          errors: { request: JSON.parse(errorMessage).message },
        }
      }
      revalidateTag('users')
      revalidateTag('indicators')
      revalidateTag(id)
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
