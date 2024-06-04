import { env } from '@/env'

export function api<T>(
  path: string,
  init?: RequestInit,
  page?: string,
  where?: Partial<T>,
) {
  const baseUrl = env.API_BASE_URL
  const queryPage = page && `page=${page}&`
  path = `${path}?${queryPage ?? ''}`
  if (where) {
    for (const key in where) {
      path = `${path}${key}=${where[key]}&`
    }
  }
  const url = new URL(path, baseUrl)
  return fetch(url, init)
}
