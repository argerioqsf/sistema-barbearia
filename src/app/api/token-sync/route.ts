import { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import cookiesName from '@/constants/cookies_name.json'

export async function POST(req: NextRequest) {
  const token = req.headers.get('x-new-token')
  if (!token) return new Response('Missing token', { status: 400 })
  const jar = cookies()
  jar.set({
    name: cookiesName.TOKEN_SIM_COOKIE,
    value: token,
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
  })
  return new Response(null, { status: 204 })
}
