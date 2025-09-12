import { api } from '@/data/api'
import { getBackendToken } from '@/utils/authServer'
import {
  SegmentsListResponseSchema,
  SegmentDetailResponseSchema,
  SegmentsSelectResponseSchema,
} from './schemas'
// TODO: Remover segments do projeto
export async function fetchSegments(
  page?: string,
  where?: Record<string, unknown>,
) {
  const token = await getBackendToken()
  const response = await api(
    '/segments',
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
      next: { tags: ['segments'], revalidate: 60 * 4 },
    },
    page,
    where,
  )
  if (!response.ok) throw new Error((await response.json()).message)
  const parsed = SegmentsListResponseSchema.safeParse(await response.json())
  if (!parsed.success) throw new Error('Invalid segments list response')
  return parsed.data
}

export async function fetchSegment(id: string) {
  const token = await getBackendToken()
  const response = await api(`/segment/${id}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
    next: { tags: [id, 'courses'], revalidate: 60 * 4 },
  })
  if (!response.ok) throw new Error((await response.json()).message)
  const parsed = SegmentDetailResponseSchema.safeParse(await response.json())
  if (!parsed.success) throw new Error('Invalid segment response')
  return parsed.data.segment
}

export async function fetchSegmentsSelect() {
  const token = await getBackendToken()
  const response = await api('/segment/select', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
    next: { tags: ['segments'], revalidate: 60 * 4 },
  })
  if (!response.ok) throw new Error((await response.json()).message)
  const parsed = SegmentsSelectResponseSchema.safeParse(await response.json())
  if (!parsed.success) throw new Error('Invalid segments select response')
  return parsed.data.segments
}
