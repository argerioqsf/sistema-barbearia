'use server'

import { formSchemaUpdateCourse } from '@/components/template/DetailCourses/schema'
import { formSchemaRegisterCourse } from '@/components/template/RegisterCourses/schema'
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
  fetchCourse,
  fetchCourses,
  fetchCoursesSelect,
} from '@/features/courses/api'
import type { QueryParams } from '@/types/http'

export async function listCourses(
  page?: string,
  where?: Partial<Course>,
): Promise<ReturnList<Course>> {
  try {
    const { courses, count } = await fetchCourses(page, where as QueryParams)
    return { response: courses as Course[], count }
  } catch (error) {
    return { error: { request: 'Error unknown' } }
  }
}

export async function getCourse(id: string): Promise<ReturnGet<Course>> {
  try {
    const course = await fetchCourse(id)
    return { response: course as Course }
  } catch (error) {
    return { error: { request: 'Error unknown' } }
  }
}

export async function deleteCourse(id?: string): Promise<InitialState<Course>> {
  try {
    if (!id) return { errors: { request: 'Id undefined' } }
    const token = getTokenFromCookieServer()
    const response = await api(`/course/delete/${id}`, {
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
    revalidateTag('courses')
    revalidateTag('units')
    revalidateTag('segments')
    return {
      ok: true,
    }
  } catch (error) {
    return { errors: { request: 'Error unknown' } }
  }
}

export async function registerCourse(
  prevState: InitialState<Course | Segment | { image: string }>,
  formData: FormData,
): Promise<InitialState<Course | Segment>> {
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
  id: string,
  prevState: InitialState<Course>,
  formData: FormData,
): Promise<InitialState<Course>> {
  const validatedFields = formSchemaUpdateCourse.safeParse({
    id,
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
      const response = await api(`course/${id}/update`, {
        method: 'PUT',
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
      revalidateTag(id)
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
    const courses = await fetchCoursesSelect()
    return { response: courses as Course[] }
  } catch (error) {
    return { error: { request: 'Error unknown' } }
  }
}
