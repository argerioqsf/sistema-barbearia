import { cookies } from 'next/headers'
import cookiesName from '@/constants/cookies_name.json'
import { User } from '@/types/general'
import { EnumLike } from 'zod'

const getCookie = (
  name: string,
  json?: boolean,
): string | EnumLike | User | undefined => {
  let value = cookies().get(name)?.value
  if (value && json) {
    value = JSON.parse(value)
    return value
  }
  return value
}

const setCookie = (name: string, value: string) => {
  cookies().set(name, value)
}

export const getTokenFromCookieServer = () => {
  return getCookie(cookiesName.TOKEN_SIM_COOKIE)
}

export const getUserCookieServer = (): User => {
  return getCookie(cookiesName.USER_SIM_COOKIE, true) as User
}

export const getRoleUserFromCookieServer = () => {
  const user = getUserCookieServer()
  return user?.profile?.role
}

export const setTokenInCookieServer = (token: string) => {
  setCookie(cookiesName.TOKEN_SIM_COOKIE, token)
}

export const setUserInCookieServer = (user: User) => {
  setCookie(cookiesName.USER_SIM_COOKIE, JSON.stringify(user))
}

export const setRolesInCookieServer = (roles: EnumLike) => {
  setCookie(cookiesName.ROLES_SIM_COOKIE, JSON.stringify(roles))
}
