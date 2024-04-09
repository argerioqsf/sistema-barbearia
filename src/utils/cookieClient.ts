import Cookies from 'js-cookie'
import { NextRequest } from 'next/server'
import cookiesName from '@/constants/cookies_name.json'
import { EnumLike } from 'zod'
import { User } from '@/types/general'

type ContextCookie = 'client' | 'request'

const getCookie = (
  context: ContextCookie,
  name: string,
  request?: NextRequest,
  json?: boolean,
): string | EnumLike | User => {
  if (context === 'request') {
    let value = request?.cookies.get(name)?.value ?? ''
    if (value && json) {
      value = JSON.parse(value)
    }
    return value
  }

  if (context === 'client') {
    let value = Cookies.get(name)
    if (value && json) {
      value = JSON.parse(value)
    }
    return value ?? ''
  }

  return ''
}

const removeCookie = (context: ContextCookie, name: string) => {
  if (context === 'client') {
    Cookies.remove(name)
  }
}

export const getUserFromCookie = (): User => {
  return getCookie(
    'client',
    cookiesName.USER_SIM_COOKIE,
    undefined,
    true,
  ) as User
}

export const getRoleFromCookie = () => {
  const user = getUserFromCookie()
  return user?.profile?.role
}

export const getRolesFromCookie = (): EnumLike => {
  return getCookie(
    'client',
    cookiesName.ROLES_SIM_COOKIE,
    undefined,
    true,
  ) as EnumLike
}

export const getTokenFromCookieClient = () => {
  return getCookie('client', cookiesName.TOKEN_SIM_COOKIE)
}

export const removeTokenCookieClient = () => {
  removeCookie('client', cookiesName.TOKEN_SIM_COOKIE)
}

export const removeUserCookieClient = () => {
  removeCookie('client', cookiesName.USER_SIM_COOKIE)
}

export const removeRolesCookieClient = () => {
  removeCookie('client', cookiesName.ROLES_SIM_COOKIE)
}

export const getTokenFromCookieRequest = (request: NextRequest) => {
  return getCookie('request', cookiesName.TOKEN_SIM_COOKIE, request)
}

export const getUerFromCookieRequest = (request: NextRequest): User => {
  return getCookie(
    'request',
    cookiesName.USER_SIM_COOKIE,
    request,
    true,
  ) as User
}

export const getRoleUserFromCookieRequest = (request: NextRequest) => {
  const user = getUerFromCookieRequest(request)
  return user?.profile?.role
}
