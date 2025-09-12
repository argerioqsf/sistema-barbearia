import { cookies } from 'next/headers'
import { getToken } from 'next-auth/jwt'
import { NextRequest } from 'next/server'
import cookiesName from '@/constants/cookies_name.json'

export async function POST(req: Request) {
  // Wrap the Fetch API Request into a NextRequest to satisfy next-auth types
  const nextReq = new NextRequest(req)
  const token = await getToken({
    req: nextReq,
    secret: process.env.NEXTAUTH_SECRET,
  })
  if (!token) return new Response('Unauthorized', { status: 401 })

  const jar = cookies()
  try {
    const backendToken = token.accessToken as string | undefined
    const user = token.user as unknown
    const roles = token.roles as unknown
    if (backendToken) {
      jar.set({
        name: cookiesName.TOKEN_SIM_COOKIE,
        value: backendToken,
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
      })
    }
    if (user) {
      jar.set({
        name: cookiesName.USER_SIM_COOKIE,
        value: JSON.stringify(user),
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
      })
    }
    if (roles) {
      jar.set({
        name: cookiesName.ROLES_SIM_COOKIE,
        value: JSON.stringify(roles),
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
      })
    }
  } catch {}
  return new Response(null, { status: 204 })
}
