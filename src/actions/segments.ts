'use server'

import { formSchemaUpdateSegment } from '@/components/template/DetailSegments/schema'
import { formSchemaRegisterSegment } from '@/components/template/RegisterSegments/schema'
import { api } from '@/data/api'
import {
  Course,
  Errors,
  InitialState,
  ReturnGet,
  ReturnList,
  Segment,
} from '@/types/general'
import { getTokenFromCookieServer } from '@/utils/cookieServer'
import { revalidateTag } from 'next/cache'
import {
  fetchSegment,
  fetchSegments,
  fetchSegmentsSelect,
} from '@/features/segments/api'

export async function registerSegment(
  prevState: InitialState<Segment | Course>,
  formData: FormData,
): Promise<InitialState<Segment | Course>> {
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
    const error = validatedFields.error.flatten().fieldErrors as Errors<
      Segment | Course
    >
    return {
      errors: { ...error },
    }
  } else {
    return { errors: { request: 'Error unknown' } }
  }
}

export async function updateSegment(
  id: string,
  prevState: InitialState<Segment | Course>,
  formData: FormData,
): Promise<InitialState<Segment | Course>> {
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
        errors: { request: 'Falha ao atualizar o  Segmento' },
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
    const segment = await fetchSegment(id)
    return { response: segment as unknown as Segment }
  } catch (error) {
    return { error: { request: 'Error unknown' } }
  }
}

export async function deleteSegment(
  id?: string,
): Promise<InitialState<Segment>> {
  try {
    if (!id) return { errors: { request: 'Id undefined' } }
    const token = getTokenFromCookieServer()
    const response = await api(`/segment/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) {
      const errorMessage = await response.text()
      return {
        errors: { request: JSON.parse(errorMessage).message },
      }
    }
    revalidateTag('segments')
    revalidateTag('units')
    return {
      ok: true,
    }
  } catch (error) {
    return { errors: { request: 'Error unknown' } }
  }
}

export async function listSelectSegments(): Promise<ReturnList<Segment>> {
  try {
    const segments = await fetchSegmentsSelect()
    return { response: segments as unknown as Segment[] }
  } catch (error) {
    return { error: { request: 'Error unknown' } }
  }
}

export async function listSegments(
  page?: string,
  where?: Partial<Segment>,
): Promise<ReturnList<Segment>> {
  try {
    const { segments, count } = await fetchSegments(
      page,
      where as Record<string, unknown>,
    )
    return { response: segments as unknown as Segment[], count }
  } catch (error) {
    return { error: { request: 'Error unknown' } }
  }
}
