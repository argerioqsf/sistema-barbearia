import { env } from '@/env'
import { clearAuthCookiesServer } from '@/utils/cookieServer'
import { updateTokenFromResponse } from '@/shared/http'

type NextFetchOptions = {
  revalidate?: number
  tags?: string[]
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
  const hasRevalidate = Boolean(init?.next?.revalidate)
  const reqInit: ExtendedRequestInit = { ...init }
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
    } else {
      // Client: logout immediately and redirect to signin
      try {
        await fetch('/api/logout', { method: 'POST' })
      } catch {}
      try {
        const parts = window.location.pathname.split('/').filter(Boolean)
        const maybeLocale = parts[0] || 'pt-BR'
        // Avoid loop if already on signin
        if (!window.location.pathname.includes('/auth/signin')) {
          window.location.href = `/${maybeLocale}/auth/signin`
        }
      } catch {}
    }
  }
  // Update backend token if server sent a new one
  try {
    await updateTokenFromResponse(resp)
  } catch {}
  return resp
}
