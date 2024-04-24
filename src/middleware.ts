import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import {
  getRoleUserFromCookieRequest,
  getTokenFromCookieRequest,
} from './utils/cookieClient'
import { siteConfig } from './config/siteConfig'
import { verifyPageRole } from './utils/verifyPageRole'
import { Role } from './types/general'

const middlewareIntl = createMiddleware({
  locales: ['pt-BR'],
  defaultLocale: 'pt-BR',
})

export default function middleware(request: NextRequest) {
  const isLogged = !!getTokenFromCookieRequest(request)
  const isLoginPage = request.nextUrl.pathname.includes('/auth/signin')

  if (!isLogged) {
    if (isLoginPage) {
      return middlewareIntl(request)
    }
    return NextResponse.redirect(new URL('/pt-BR/auth/signin', request.url))
  }
  if (isLoginPage) {
    return NextResponse.redirect(new URL('/pt-BR/dashboard/home', request.url))
  } else {
    const roleUser = getRoleUserFromCookieRequest(request) as Role
    if (roleUser) {
      const havePermission = verifyPageRole(siteConfig, roleUser, request)
      if (havePermission === false) {
        return NextResponse.redirect(new URL('/pt-BR/auth/signin', request.url))
      } else if (havePermission === true) {
        return middlewareIntl(request)
      } else if (havePermission === null) {
        return middlewareIntl(request)
      }
    } else {
      return NextResponse.redirect(new URL('/pt-BR/auth/signin', request.url))
    }
  }
}

export const config = {
  matcher: ['/(de|pt-BR)/:path*'],
}
