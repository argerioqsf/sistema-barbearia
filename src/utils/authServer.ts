import { cookies } from 'next/headers'
import { getToken } from 'next-auth/jwt'
import { NextRequest } from 'next/server'
import { HttpError } from '@/shared/errors/httpError'

function createRequestFromCookies(): NextRequest | undefined {
  const all = cookies().getAll()
  if (all.length === 0) return undefined
  const cookieHeader = all.map((c) => `${c.name}=${c.value}`).join('; ')
  const req = new Request('http://local', { headers: { cookie: cookieHeader } })
  return new NextRequest(req)
}
// TODO: atualizar o next-auth para a v5 para nao precisar mais da funcao a baixo
export async function getBackendToken(): Promise<string | undefined> {
  const secret = process.env.NEXTAUTH_SECRET
  if (!secret) {
    throw new HttpError(500, 'NEXTAUTH_SECRET não está configurado.')
  }
  const req = createRequestFromCookies()
  if (!req) {
    throw new HttpError(500, 'Request não encontrada.')
  }
  const token = await getToken({
    req,
    secret,
    raw: false,
  })
  if (!token?.accessToken) {
    throw new HttpError(500, 'Token não encontrado.')
  }
  return token.accessToken
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
