import { env } from '@/env'

export function api(
  path: string,
  init?: RequestInit,
  page?: string,
  query?: string,
  indicatorId?: string,
  consultantId?: string,
) {
  const baseUrl = env.API_BASE_URL
  const queryQ = query && `q=${query}&`
  const queryPage = page && `page=${page}&`
  const queryInd = indicatorId && `indicatorId=${indicatorId}`
  const queryConsu = consultantId && `consultantId=${consultantId}`
  path = `${path}?${queryQ ?? ''}${queryPage ?? ''}${queryInd ?? ''}${queryConsu ?? ''}`
  const url = new URL(path, baseUrl)
  return fetch(url, init)
}
