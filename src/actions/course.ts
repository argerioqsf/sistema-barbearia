'use server'

import { formSchemaUpdateCourse } from '@/components/template/DetailCourses/schema'
import { formSchemaRegisterCourse } from '@/components/template/RegisterCourses/schema'
import { api } from '@/data/api'
import { Course, Errors, InitialState, ReturnList } from '@/types/general'
import { getTokenFromCookieServer } from '@/utils/cookieServer'
import { revalidateTag } from 'next/cache'

export async function listCourses(
  q?: string,
  page?: string,
): Promise<ReturnList<Course>> {
  try {
    const token = getTokenFromCookieServer()
    const response = await api(
      '/courses',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { tags: ['courses'], revalidate: 60 * 4 },
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
    const list = await response.json()
    return { response: list.courses.courses }
  } catch (error) {
    return { error: { request: 'Error unknown' } }
  }
}

export async function getCourse(id: string): Promise<ReturnList<Course>> {
  try {
    const token = getTokenFromCookieServer()
    const response = await api(`/course/${id}`, {
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
    const { course } = await response.json()
    return { response: course }
  } catch (error) {
    return { error: { request: 'Error unknown' } }
  }
}

export async function registerCourse(
  prevState: InitialState<Course>,
  formData: FormData,
): Promise<InitialState<Course>> {
  const validatedFields = formSchemaRegisterCourse.safeParse({
    name: formData.get('name'),
    active: formData.get('active'),
  })

  if (validatedFields.success) {
    try {
      const TOKEN_SIM = getTokenFromCookieServer()
      if (!TOKEN_SIM) {
        return {
          errors: { request: 'Erro de credenciais' },
        }
      }
      const response = await api(`/create/course`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN_SIM}`,
        },
        body: JSON.stringify({
          name: formData.get('name'),
          active: formData.get('active') === 'true',
        }),
      })
      if (!response.ok) {
        const errorMessage = await response.text()
        return {
          errors: { request: JSON.parse(errorMessage).message },
        }
      }
      revalidateTag('courses')
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
    const error = validatedFields.error.flatten().fieldErrors as Errors<Course>
    return {
      errors: { ...error },
    }
  } else {
    return { errors: { request: 'Error unknown' } }
  }
}

export async function updateCourse(
  prevState: InitialState<Course>,
  formData: FormData,
): Promise<InitialState<Course>> {
  const validatedFields = formSchemaUpdateCourse.safeParse({
    name: formData.get('name'),
    active: formData.get('active'),
  })

  if (validatedFields.success) {
    try {
      const TOKEN_SIM = getTokenFromCookieServer()
      if (!TOKEN_SIM) {
        return {
          errors: { request: 'Erro de credenciais' },
        }
      }
      const idCourse = formData.get('id')
      const response = await api(`update/course/${idCourse}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN_SIM}`,
        },
        body: JSON.stringify({
          name: formData.get('name'),
          active: formData.get('active') === '1',
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
    const error = validatedFields.error.flatten().fieldErrors as Errors<Course>
    return {
      errors: { ...error },
    }
  } else {
    return { errors: { request: 'Error unknown' } }
  }
}

export async function listSelectCourses(): Promise<ReturnList<Course>> {
  try {
    const token = getTokenFromCookieServer()
    const response = await api(`/course/select`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ['courses'], revalidate: 60 * 4 },
    })

    if (!response.ok) {
      const errorMessage = await response.text()
      return {
        error: { request: JSON.parse(errorMessage).message },
      }
    }
    const list = await response.json()
    return { response: list.courses }
  } catch (error) {
    return { error: { request: 'Error unknown' } }
  }
}
