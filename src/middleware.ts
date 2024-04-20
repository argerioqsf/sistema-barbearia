import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { getTokenFromCookieRequest } from './utils/cookieClient'
import { siteConfig } from './config/siteConfig'
import { verifyPageRole } from './utils/verifyPageRole'

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
    const havePermission = verifyPageRole(siteConfig, request)
    if (!havePermission) {
      return NextResponse.redirect(
        new URL('/pt-BR/dashboard/home', request.url),
      )
    } else {
      return middlewareIntl(request)
    }
  }
}

export const config = {
  matcher: ['/auth/signin', '/(de|pt-BR)/:path*'],
}
