import { env } from '@/env'
import { clearAuthCookiesServer } from '@/utils/cookieServer'

export async function api<T>(
  path: string,
  init?: RequestInit,
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
  const hasRevalidate = Boolean(init?.next?.revalidate)
  const reqInit: RequestInit = { ...init }
  if (reqInit.cache === undefined && !hasRevalidate) {
    reqInit.cache = 'no-store'
  }

  let resp: Response
  try {
    resp = await fetch(url, reqInit)
  } catch (e) {
    // Network error: synthesize a JSON error response for consistent handling
    return new Response(
      JSON.stringify({
        message: 'Falha de conexão com o servidor. Verifique a API.',
      }),
      { status: 503, headers: { 'Content-Type': 'application/json' } },
    )
  }
  console.log(`API ${url} - ${resp.status}`)
  if (resp.status === 401) {
    // Clear cookies on the server to prevent stale auth; client-side will handle redirect.
    if (typeof window === 'undefined') {
      try {
        clearAuthCookiesServer()
      } catch {}
    }
  }
  return resp
}
