// src/app/api/logout/route.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import cookiesName from '@/constants/cookies_name.json'

// nomes padrão do NextAuth (jwt sessions em cookies)
const NEXTAUTH_COOKIES = [
  'next-auth.session-token',
  '__Secure-next-auth.session-token',
  'next-auth.csrf-token',
  '__Host-next-auth.csrf-token',
]

// se você tiver outras chaves próprias, adicione aqui
const CUSTOM_COOKIES = [
  cookiesName.TOKEN_SIM_COOKIE,
  cookiesName.USER_SIM_COOKIE,
  cookiesName.ROLES_SIM_COOKIE,
].filter(Boolean)

function clearAllCookies() {
  const jar = cookies()
  for (const name of [...NEXTAUTH_COOKIES, ...CUSTOM_COOKIES]) {
    try {
      // garante path=/ para cobrir o escopo completo
      jar.delete({ name, path: '/' })
    } catch {
      // noop
    }
  }
}

function redirectToSignin(req: Request) {
  // usa a origem da própria requisição para construir a URL absoluta
  const url = new URL('/auth/signin', req.url)
  const res = NextResponse.redirect(url, { status: 302 })
  res.headers.set('Cache-Control', 'no-store')
  return res
}

export async function GET(req: Request) {
  clearAllCookies()
  return redirectToSignin(req)
}

export async function POST(req: Request) {
  clearAllCookies()
  return redirectToSignin(req)
}
