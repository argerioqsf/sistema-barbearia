// src/shared/auth/handle-unauthorized.ts
/**
 * Centraliza o fluxo de "deslogar e enviar para a tela de login"
 * em qualquer ambiente (Client ou Server) no App Router.
 *
 * - Client: next-auth/react -> signOut({ callbackUrl })
 * - Server: redirect() para /logout (rota que limpa cookies e redireciona ao login)
 *
 * Personalize via options:
 *  - loginPath: caminho da sua página de login (default: "/auth/signin")
 *  - serverUsesLogoutRoute: se true, redireciona para "/logout" (default: true)
 *    -> útil se você quer limpar cookies no server antes de ir ao login
 *    -> se false, vai direto para loginPath
 */

type HandleUnauthorizedOptions = {
  loginPath?: string
  serverUsesLogoutRoute?: boolean
}

function resolveBaseUrl() {
  if (typeof window !== 'undefined') {
    return window.location.origin
  }
  return (
    process.env.NEXT_PUBLIC_BASE_URL ??
    process.env.BASE_URL ??
    process.env.NEXTAUTH_URL ??
    ''
  )
}

function resolveLoginUrl(loginPath: string) {
  const baseUrl = resolveBaseUrl()
  if (!baseUrl) return loginPath
  try {
    return new URL(loginPath, baseUrl).toString()
  } catch {
    return loginPath
  }
}

export async function handleUnauthorized(
  options?: HandleUnauthorizedOptions,
): Promise<never | void> {
  const loginPath = options?.loginPath ?? '/auth/signin'
  const loginUrl = resolveLoginUrl(loginPath)
  const useLogoutRoute = options?.serverUsesLogoutRoute ?? true

  // CLIENT
  if (typeof window !== 'undefined') {
    const { signOut } = await import('next-auth/react')
    await signOut({ redirect: true, callbackUrl: loginUrl })
    return
  }

  // SERVER (Server Component / Route Handler / Server Action)
  const { redirect } = await import('next/navigation')
  if (useLogoutRoute) {
    redirect('/api/logout')
  } else {
    redirect(loginUrl)
  }
}
