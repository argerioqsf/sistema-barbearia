import { env } from '@/env'
import { updateTokenFromResponse } from '@/shared/http'

type NextFetchOptions = {
  revalidate?: number | false
  tags?: string[]
  // TODO: ver se é uma boa pratica a tipagem a baixoe se faz sentido
  [key: string]: unknown
}

type ExtendedRequestInit = RequestInit & { next?: NextFetchOptions }

export async function api<T>(
  path: string,
  init?: ExtendedRequestInit,
  page?: string,
  where?: Partial<T>,
): Promise<Response> {
  const baseUrl = env.API_BASE_URL
  const url = new URL(path, baseUrl)

  const params = new URLSearchParams()
  if (page) params.set('page', String(page))
  if (where) {
    Object.entries(where).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, String(value))
      }
    })
  }
  const search = params.toString()
  if (search) url.search = search

  // Avoid serving stale protected content by default.
  // If the caller specifies revalidate via Next.js fetch options (init.next.revalidate),
  // do not force cache: 'no-store' to avoid the Next.js warning about mixed caching.
  const revalidateOption = (init?.next as NextFetchOptions | undefined)
    ?.revalidate
  const hasRevalidate = revalidateOption !== undefined
  const reqInit: ExtendedRequestInit = { ...init }
  if (reqInit.cache === undefined && !hasRevalidate) {
    reqInit.cache = 'no-store'
  }

  try {
    const resp = await fetch(url, reqInit)
    console.log(`API ${reqInit?.method ?? 'GET'} ${url} - ${resp.status}`)

    try {
      await updateTokenFromResponse(resp)
    } catch (e) {
      console.warn('updateTokenFromResponse failed:', e)
    }

    return resp
  } catch (err) {
    console.log('error fetching API:', err)
    throw err // repassa para seu handler global
  }
}
