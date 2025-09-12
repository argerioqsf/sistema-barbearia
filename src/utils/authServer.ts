import { cookies } from 'next/headers'
import { getToken } from 'next-auth/jwt'
import type { IncomingMessage } from 'http'

// Minimal union member of GetTokenParams['req'] used by next-auth to read cookies.
type RequestWithCookies = IncomingMessage & {
  cookies: Partial<Record<string, string>>
}

function createRequestFromCookies(): RequestWithCookies | undefined {
  const all = cookies().getAll()
  if (all.length === 0) return undefined
  const cookieMap: Record<string, string> = Object.fromEntries(
    all.map((c) => [c.name, c.value]),
  )
  const cookieHeader = all.map((c) => `${c.name}=${c.value}`).join('; ')
  return {
    headers: { cookie: cookieHeader },
    cookies: cookieMap,
  } as unknown as RequestWithCookies
}

export async function getBackendToken(): Promise<string | undefined> {
  const secret = process.env.NEXTAUTH_SECRET
  if (!secret) return undefined

  const req = createRequestFromCookies()
  if (!req) return undefined
  const jwt = await getToken({ req, secret })
  return jwt?.accessToken
}

export async function buildAuthHeaders(
  extra?: HeadersInit,
): Promise<HeadersInit> {
  const token = await getBackendToken()
  return {
    ...(extra || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

export async function getAuthHeader(): Promise<string | undefined> {
  const token = await getBackendToken()
  return token ? `Bearer ${token}` : undefined
}
