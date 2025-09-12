import { cookies } from 'next/headers'
import cookiesName from '@/constants/cookies_name.json'

export async function POST() {
  const jar = cookies()
  try {
    jar.delete(cookiesName.TOKEN_SIM_COOKIE)
    jar.delete(cookiesName.USER_SIM_COOKIE)
    jar.delete(cookiesName.ROLES_SIM_COOKIE)
  } catch {}
  return new Response(null, { status: 204 })
}
