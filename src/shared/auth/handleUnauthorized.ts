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

export async function handleUnauthorized(options?: {
  loginPath?: string
  serverUsesLogoutRoute?: boolean
}): Promise<never | void> {
  const loginPath = options?.loginPath ?? '/auth/signin'
  const useLogoutRoute = options?.serverUsesLogoutRoute ?? true

  // CLIENT
  if (typeof window !== 'undefined') {
    console.log('Unauthorized Client')
    const { signOut } = await import('next-auth/react')
    await signOut({ redirect: true, callbackUrl: loginPath })
    return
  }

  // SERVER (Server Component / Route Handler / Server Action)
  const { redirect } = await import('next/navigation')
  console.log('Unauthorized Server')
  if (useLogoutRoute) {
    redirect('/api/logout') // sua rota que apaga cookies e já redireciona ao login
  } else {
    redirect(loginPath)
  }
}
