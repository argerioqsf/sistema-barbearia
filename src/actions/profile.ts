'use server'

import { formSchemaUpdateProfileUser } from '@/components/template/ProfileDetail/schema'
import { api } from '@/data/api'
import { Errors, InitialState, Profile, ReturnGet, User } from '@/types/general'
import {
  getTokenFromCookieServer,
  clearAuthCookiesServer,
} from '@/utils/cookieServer'
import { revalidateTag } from 'next/cache'
import { getBackendToken, getAuthHeader } from '@/utils/authServer'
import { redirect } from 'next/navigation'
import { toNormalizedError } from '@/shared/errors/to-normalized-error'

export async function updateProfileUser(
  prevState: InitialState<Profile | User>,
  formData: FormData,
): Promise<InitialState<Profile | User>> {
  const validatedFields = formSchemaUpdateProfileUser.safeParse({
    'user.name': formData.get('user.name'),
    'user.email': formData.get('user.email'),
    'user.active': formData.get('user.active'),
    phone: formData.get('phone'),
    cpf: formData.get('cpf'),
    genre: formData.get('genre'),
    birthday: formData.get('birthday'),
    pix: formData.get('pix'),
    city: formData.get('city'),
  })

  if (validatedFields.success) {
    try {
      const TOKEN_SIM = (await getBackendToken()) ?? getTokenFromCookieServer()

      if (!TOKEN_SIM) {
        return {
          errors: { request: 'Erro de credenciais' },
        }
      }
      const response = await api(`/profile`, {
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
          city: formData.get('city'),
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

export async function getProfile(): Promise<ReturnGet<Profile>> {
  try {
    const authorization = await getAuthHeader()
    const response = await api('/profile', {
      method: 'GET',
      headers: authorization ? { Authorization: authorization } : {},
      next: { tags: ['users', 'leads'], revalidate: 60 * 4 },
    })

    if (!response.ok) {
      if (response.status === 401) {
        clearAuthCookiesServer()
        redirect('/auth/signin')
      }
      const errorMessage = await response.text()
      return {
        error: toNormalizedError(
          JSON.parse(errorMessage).message,
          response.status,
        ),
      }
    }
    const json = await response.json()
    const { profile, openingHours } = json
    return { response: { ...profile, openingHours } }
  } catch (error) {
    return { error: toNormalizedError('Error unknown') }
  }
}

// Work Hours
export async function registerWorkHour(
  profileId: string,
  prev: InitialState<Record<string, unknown>>,
  formData: FormData,
): Promise<InitialState<Record<string, unknown>>> {
  try {
    const token = await getBackendToken()
    const raw = Object.fromEntries(formData.entries()) as Record<
      string,
      unknown
    >
    const payload = {
      ...raw,
      weekDay: Number(raw.weekDay ?? 0),
    }
    const response = await api(`/profile/${profileId}/work-hours`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
    if (!response.ok) {
      if (response.status === 401) {
        clearAuthCookiesServer()
        redirect('/auth/signin')
      }
      const errorMessage = await response.text()
      return { errors: { request: JSON.parse(errorMessage).message } }
    }
    revalidateTag('users')
    return { ok: true, errors: {} }
  } catch {
    return { errors: { request: 'Failed to create work-hour' } }
  }
}

export async function deleteWorkHour(
  profileId: string,
  id: string,
): Promise<InitialState<Record<string, unknown>>> {
  try {
    const token = await getBackendToken()
    const response = await api(`/profile/${profileId}/work-hours/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!response.ok) {
      if (response.status === 401) {
        clearAuthCookiesServer()
        redirect('/auth/signin')
      }
      const errorMessage = await response.text()
      return { errors: { request: JSON.parse(errorMessage).message } }
    }
    revalidateTag('users')
    return { ok: true, errors: {} }
  } catch {
    return { errors: { request: 'Failed to delete work-hour' } }
  }
}

// Blocked Hours
export async function registerBlockedHour(
  profileId: string,
  prev: InitialState<Record<string, unknown>>,
  formData: FormData,
): Promise<InitialState<Record<string, unknown>>> {
  try {
    const token = await getBackendToken()
    const body = Object.fromEntries(formData.entries()) as Record<
      string,
      unknown
    >
    // Suporte a criação em lote (intervalo de dias)
    if (body.batch) {
      const list = JSON.parse(String(body.batch)) as Array<{
        startHour: string
        endHour: string
      }>
      for (const item of list) {
        const resp = await api(`/profile/${profileId}/blocked-hours`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(item),
        })
        if (!resp.ok) {
          if (resp.status === 401) {
            clearAuthCookiesServer()
            redirect('/auth/signin')
          }
          const errorMessage = await resp.text()
          return { errors: { request: JSON.parse(errorMessage).message } }
        }
      }
    } else {
      const response = await api(`/profile/${profileId}/blocked-hours`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      })
      if (!response.ok) {
        if (response.status === 401) {
          clearAuthCookiesServer()
          redirect('/auth/signin')
        }
        const errorMessage = await response.text()
        return { errors: { request: JSON.parse(errorMessage).message } }
      }
    }
    revalidateTag('users')
    return { ok: true, errors: {} }
  } catch {
    return { errors: { request: 'Failed to create blocked-hour' } }
  }
}

export async function deleteBlockedHour(
  profileId: string,
  id: string,
): Promise<InitialState<Record<string, unknown>>> {
  try {
    const token = await getBackendToken()
    const response = await api(`/profile/${profileId}/blocked-hours/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!response.ok) {
      if (response.status === 401) {
        clearAuthCookiesServer()
        redirect('/auth/signin')
      }
      const errorMessage = await response.text()
      return { errors: { request: JSON.parse(errorMessage).message } }
    }
    revalidateTag('users')
    return { ok: true, errors: {} }
  } catch {
    return { errors: { request: 'Failed to delete blocked-hour' } }
  }
}

export async function updateBlockedHour(
  profileId: string,
  id: string,
  _prev: InitialState<Record<string, unknown>>,
  formData: FormData,
): Promise<InitialState<Record<string, unknown>>> {
  try {
    const token = await getBackendToken()
    const body = Object.fromEntries(formData.entries())
    const response = await api(`/profile/${profileId}/blocked-hours/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })
    if (!response.ok) {
      const errorMessage = await response.text()
      return { errors: { request: JSON.parse(errorMessage).message } }
    }
    revalidateTag('users')
    return { ok: true, errors: {} }
  } catch {
    return { errors: { request: 'Failed to update blocked-hour' } }
  }
}
