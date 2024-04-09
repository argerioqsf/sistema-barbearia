import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { getTokenFromCookieRequest } from './utils/cookieClient'
import { siteConfig } from './components/config/siteConfig'
import { verifyPageRole } from './utils/verifyPageRole'

const middlewareIntl = createMiddleware({
  locales: ['pt-BR'],
  defaultLocale: 'pt-BR',
})

export default function middleware(request: NextRequest) {
  const isLogged = !!getTokenFromCookieRequest(request)
  const isLoginPage = request.nextUrl.pathname.includes('/auth/signIn')
  if (!isLogged) {
    if (isLoginPage) {
      return middlewareIntl(request)
    }
    return NextResponse.redirect(new URL('/pt-BR/auth/signIn', request.url))
  }
  if (isLoginPage) {
    return NextResponse.redirect(new URL('/pt-BR/dashboard/home', request.url))
  } else {
    const pathRedirect = verifyPageRole(siteConfig.items_side_menu, request)
    if (pathRedirect) {
      return NextResponse.redirect(new URL(pathRedirect, request.url))
    } else {
      return middlewareIntl(request)
    }
  }
}

export const config = {
  matcher: ['/auth/signIn', '/(de|pt-BR)/:path*'],
}
