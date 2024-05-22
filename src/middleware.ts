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
function verifyPublicPage(request: NextRequest, publicPages: string[]) {
  let isPublic = false
  for (let i = 0; i < publicPages.length; i++) {
    isPublic = request.nextUrl.pathname.includes(publicPages[i])
    if (isPublic) break
  }
  return isPublic
}

export default function middleware(request: NextRequest) {
  const isLogged = !!getTokenFromCookieRequest(request)
  const publicPages = ['/auth/signin', 'sim/indicator']
  const isPublicPages = verifyPublicPage(request, publicPages)
  const isLoginPage = request.nextUrl.pathname.includes('/auth/signin')
  const roleUser = getRoleUserFromCookieRequest(request) as Role

  if (!isLogged) {
    if (isPublicPages) {
      return middlewareIntl(request)
    } else {
      return NextResponse.redirect(new URL('/pt-BR/auth/signin', request.url))
    }
  }

  if (isLoginPage) {
    if (roleUser === 'indicator') {
      return NextResponse.redirect(
        new URL('/pt-BR/dashboard/indicators/monitoring', request.url),
      )
    } else if (roleUser === 'consultant') {
      return NextResponse.redirect(
        new URL('/pt-BR/dashboard/consultants/monitoring', request.url),
      )
    } else {
      return NextResponse.redirect(
        new URL('/pt-BR/dashboard/home', request.url),
      )
    }
  } else {
    if (isPublicPages) {
      return middlewareIntl(request)
    }

    if (roleUser) {
      const havePermission = verifyPageRole(siteConfig, roleUser, request)
      if (havePermission === false) {
        return NextResponse.redirect(new URL('/pt-BR/404', request.url))
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
