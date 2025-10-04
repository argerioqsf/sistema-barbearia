import { cookies } from 'next/headers'
import cookiesName from '@/constants/cookies_name.json'
import { logger } from '@/shared/logger'

// TODO: atualizar next-auth para nao precisar mais limpar
// os cookie manualmente no logout
export async function clearAuthCookiesServer() {
  const jar = await cookies()
  try {
    jar.delete(cookiesName.TOKEN_SIM_COOKIE)
    jar.delete(cookiesName.USER_SIM_COOKIE)
    jar.delete(cookiesName.ROLES_SIM_COOKIE)
    jar.delete('next-auth.session-token')
    jar.delete('__Secure-next-auth.session-token')
    jar.delete('next-auth.csrf-token')
  } catch (e) {
    logger.debug(e, 'Erro clearAuthCookiesServer')
  }
}
