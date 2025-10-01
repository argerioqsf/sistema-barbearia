import { handleUnauthorized } from '@/shared/auth/handleUnauthorized'

export async function onUnauthorizedDefault() {
  return await handleUnauthorized({
    loginPath: '/auth/signin',
    serverUsesLogoutRoute: true,
  })
}
