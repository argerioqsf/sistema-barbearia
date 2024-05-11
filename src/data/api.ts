import { env } from '@/env'

export function api(
  path: string,
  init?: RequestInit,
  page?: string,
  query?: string,
  indicatorId?: string,
) {
  const baseUrl = env.API_BASE_URL
  const queryQ = query && `q=${query}&`
  const queryPage = page && `page=${page}&`
  const queryInd = indicatorId && `indicatorId=${indicatorId}`
  path = `${path}?${queryQ ?? ''}${queryPage ?? ''}${queryInd ?? ''}`
  const url = new URL(path, baseUrl)
  return fetch(url, init)
}
