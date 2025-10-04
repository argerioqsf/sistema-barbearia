import { NextRequest } from 'next/server'
import cookiesName from '@/constants/cookies_name.json'
import { User } from '@/types/general'
import { RoleName } from '@/features/roles/schemas'

export const getTokenFromRequest = (request: NextRequest) => {
  return request.cookies.get(cookiesName.TOKEN_SIM_COOKIE)?.value ?? ''
}

export const getUserFromRequest = (request: NextRequest): User | undefined => {
  const raw = request.cookies.get(cookiesName.USER_SIM_COOKIE)?.value
  if (!raw) return undefined
  try {
    return JSON.parse(raw) as User
  } catch {
    return undefined
  }
}

export const getRoleFromRequest = (
  request: NextRequest,
): RoleName | undefined => {
  const user = getUserFromRequest(request)
  return user?.profile?.role as RoleName | undefined
}
