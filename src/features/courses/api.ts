import { api } from '@/data/api'
import { getBackendToken } from '@/utils/authServer'
import {
  CoursesListResponseSchema,
  CourseDetailResponseSchema,
  CoursesSelectResponseSchema,
} from './schemas'
import type { QueryParams } from '@/types/http'
// TODO: Remover courses do projeto
export async function fetchCourses(page?: string, where?: QueryParams) {
  const token = await getBackendToken()
  const response = await api(
    '/courses',
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
      next: { tags: ['courses'], revalidate: 60 * 4 },
    },
    page,
    where,
  )
  if (!response.ok) throw new Error((await response.json()).message)
  const parsed = CoursesListResponseSchema.safeParse(await response.json())
  if (!parsed.success) throw new Error('Invalid courses list response')
  return parsed.data
}

export async function fetchCourse(id: string) {
  const token = await getBackendToken()
  const response = await api(`/course/${id}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
    next: { tags: [id], revalidate: 60 * 4 },
  })
  if (!response.ok) throw new Error((await response.json()).message)
  const parsed = CourseDetailResponseSchema.safeParse(await response.json())
  if (!parsed.success) throw new Error('Invalid course response')
  return parsed.data.course
}

export async function fetchCoursesSelect() {
  const token = await getBackendToken()
  const response = await api(`/course/select`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
    next: { tags: ['courses'], revalidate: 60 * 4 },
  })
  if (!response.ok) throw new Error((await response.json()).message)
  const parsed = CoursesSelectResponseSchema.safeParse(await response.json())
  if (!parsed.success) throw new Error('Invalid courses select response')
  return parsed.data.courses
}
