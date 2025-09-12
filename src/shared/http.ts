// Helpers for HTTP JSON and token refresh
import cookiesName from '@/constants/cookies_name.json'
// next/headers is server-only; we'll require it dynamically inside the function.

export type JsonLike =
  | Record<string, unknown>
  | unknown[]
  | string
  | number
  | boolean
  | null

export async function safeJson(res: Response): Promise<JsonLike> {
  try {
    return await res.json()
  } catch {
    return {}
  }
}

export async function readMessage(res: Response): Promise<string> {
  try {
    const j = (await res.json()) as { message?: unknown } | unknown
    if (
      j &&
      typeof j === 'object' &&
      'message' in (j as { message?: unknown })
    ) {
      const m = (j as { message?: unknown }).message
      return typeof m === 'string' ? m : 'Request failed'
    }
    return 'Request failed'
  } catch {
    return 'Request failed'
  }
}

// Update backend token from response header (x-new-token), both server and client.
export async function updateTokenFromResponse(res: Response): Promise<void> {
  const raw = res.headers.get('x-new-token') || res.headers.get('X-New-Token')
  const header = raw?.startsWith('Bearer ') ? raw.slice(7) : raw
  if (!header) return
  if (typeof window !== 'undefined') {
    try {
      await fetch('/api/token-sync', {
        method: 'POST',
        headers: { 'x-new-token': header },
      }).catch(() => {})
    } catch {}
    return
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { cookies } = await import('next/headers')
    const jar = cookies()
    jar.set({
      name: cookiesName.TOKEN_SIM_COOKIE,
      value: header,
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
    })
  } catch {
    // no-op if headers API is unavailable
  }
}
