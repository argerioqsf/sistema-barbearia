'use server'

import { formSchemaUpdateSegment } from '@/components/template/DetailSegments/schema'
import { formSchemaRegisterSegment } from '@/components/template/RegisterSegments/schema'
import { api } from '@/data/api'
import {
  Errors,
  InitialState,
  ReturnGet,
  ReturnList,
  Segment,
} from '@/types/general'
import { getTokenFromCookieServer } from '@/utils/cookieServer'
import { revalidateTag } from 'next/cache'

export async function registerSegment(
  prevState: InitialState<Segment>,
  formData: FormData,
): Promise<InitialState<Segment>> {
  const courses = JSON.parse(String(formData.get('courses')) ?? '[]')
  const validatedFields = formSchemaRegisterSegment.safeParse({
    name: formData.get('name'),
    courses,
  })

  if (validatedFields.success) {
    try {
      const TOKEN_SIM = getTokenFromCookieServer()
      if (!TOKEN_SIM) {
        return {
          errors: { request: 'Erro de credenciais' },
        }
      }
      const response = await api(`/create/segment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN_SIM}`,
        },
        body: JSON.stringify({
          name: formData.get('name'),
          courses: courses ?? [],
        }),
      })
      if (!response.ok) {
        const errorMessage = await response.text()
        return {
          errors: { request: JSON.parse(errorMessage).message },
        }
      }
      revalidateTag('segments')
      return {
        errors: {},
        ok: true,
      }
    } catch (error) {
      return {
        errors: { request: 'Falha ao criar Segmento' },
      }
    }
  } else if (validatedFields.error) {
    const error = validatedFields.error.flatten().fieldErrors as Errors<Segment>
    return {
      errors: { ...error },
    }
  } else {
    return { errors: { request: 'Error unknown' } }
  }
}

export async function updateSegment(
  id: string,
  prevState: InitialState<Segment>,
  formData: FormData,
): Promise<InitialState<Segment>> {
  const courses = JSON.parse(String(formData.get('courses')) ?? '[]')
  const validatedFields = formSchemaUpdateSegment.safeParse({
    id,
    name: formData.get('name'),
    courses,
  })

  if (validatedFields.success) {
    try {
      const TOKEN_SIM = getTokenFromCookieServer()
      if (!TOKEN_SIM) {
        return {
          errors: { request: 'Erro de credenciais' },
        }
      }
      const response = await api(`/segment/${id}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN_SIM}`,
        },
        body: JSON.stringify({
          name: formData.get('name'),
          courses: courses ?? [],
        }),
      })
      if (!response.ok) {
        const errorMessage = await response.text()
        return {
          errors: { request: JSON.parse(errorMessage).message },
        }
      }
      revalidateTag('segments')
      revalidateTag(id)
      return {
        errors: {},
        ok: true,
      }
    } catch (error) {
      return {
        errors: { request: 'Falha ao atualizar o  Seguimento' },
      }
    }
  } else if (validatedFields.error) {
    const error = validatedFields.error.flatten().fieldErrors as Errors<Segment>
    return {
      errors: { ...error },
    }
  } else {
    return { errors: { request: 'Error unknown' } }
  }
}

export async function getSegment(id: string): Promise<ReturnGet<Segment>> {
  try {
    const token = getTokenFromCookieServer()
    const response = await api(`/segment/${id}`, {
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
    const { segment } = await response.json()
    return { response: segment }
  } catch (error) {
    return { error: { request: 'Error unknown' } }
  }
}

export async function listSelectSegments(): Promise<ReturnList<Segment>> {
  try {
    const token = getTokenFromCookieServer()
    const response = await api('/segment/select', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ['segments'], revalidate: 60 * 4 },
    })

    if (!response.ok) {
      const errorMessage = await response.text()
      return {
        error: { request: JSON.parse(errorMessage).message },
      }
    }

    const list = await response.json()
    return { response: list.segments }
  } catch (error) {
    return { error: { request: 'Error unknown' } }
  }
}

export async function listSegments(
  q?: string,
  page?: string,
): Promise<ReturnList<Segment>> {
  try {
    const token = getTokenFromCookieServer()
    const response = await api(
      '/segments',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { tags: ['segments'], revalidate: 60 * 4 },
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

    const { segments, count } = await response.json()
    return { response: segments, count }
  } catch (error) {
    return { error: { request: 'Error unknown' } }
  }
}
