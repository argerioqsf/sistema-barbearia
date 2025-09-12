import { cookies } from 'next/headers'
import { getToken } from 'next-auth/jwt'
import { NextRequest } from 'next/server'
import cookiesName from '@/constants/cookies_name.json'

function createRequestFromCookies(): NextRequest | undefined {
  const all = cookies().getAll()
  if (all.length === 0) return undefined
  const cookieHeader = all.map((c) => `${c.name}=${c.value}`).join('; ')
  const req = new Request('http://local', { headers: { cookie: cookieHeader } })
  return new NextRequest(req)
}

export async function getBackendToken(): Promise<string | undefined> {
  const secret = process.env.NEXTAUTH_SECRET
  if (!secret) return undefined
  // Prefer cookie set by updateTokenFromResponse (fresh token), fallback to NextAuth JWT
  const tokenCookie = cookies().get(cookiesName.TOKEN_SIM_COOKIE)?.value as
    | string
    | undefined
  if (tokenCookie) return tokenCookie
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
