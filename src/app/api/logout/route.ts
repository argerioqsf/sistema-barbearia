// src/app/api/logout/route.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import cookiesName from '@/constants/cookies_name.json'

// TODO: Modernizar a lógica de logout para uma Server Action dedicada.
// Atualmente, o logout é frequentemente acionado por uma chamada de cliente para uma API Route
// customizada em `/api/logout`, que então executa a limpeza de cookies.
//
// O plano de melhoria é o seguinte:
// 1.  **Criar uma Server Action `manualLogoutAction`** que encapsulará a lógica de `clearAuthCookiesServer`.
// 2.  **Substituir as chamadas diretas** a `/api/logout` no lado do cliente para que usem a nova `manualLogoutAction`.
// 3.  **Manter a `clearAuthCookiesAndRedirect`** para casos de uso no lado do servidor (como em `try-catch` de chamadas de API)
//     onde um redirecionamento é necessário após a limpeza dos cookies.
// 4.  **Avaliar e remover a API Route `/api/logout`** se ela se tornar redundante após a migração.
//
// Esta mudança alinhará o fluxo de logout com as melhores práticas do App Router,
// centralizando a lógica no servidor e simplificando as chamadas do cliente.

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
