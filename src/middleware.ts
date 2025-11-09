import createMiddleware from 'next-intl/middleware'
import { NextResponse, NextRequest } from 'next/server'
import { withAuth, type NextRequestWithAuth } from 'next-auth/middleware'
import { siteConfig } from './config/siteConfig'
import { verifyPageRole } from './utils/verifyPageRole'
import { defaultLocale, locales } from './locales'
import { RoleName } from './features/roles/schemas'

const middlewareIntl = createMiddleware({
  locales: [...locales],
  defaultLocale,
})

const PUBLIC_PATHS = ['/auth/signin', '/sim/indicator'] as const

function getLocale(request: NextRequestWithAuth): string {
  const seg = request.nextUrl.pathname.split('/').filter(Boolean)[0]
  if (!seg) return defaultLocale
  return (locales as readonly string[]).includes(seg) ? seg : defaultLocale
}

function isPublicPath(pathname: string, locale: string): boolean {
  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`
  return PUBLIC_PATHS.some((segment) => {
    const normalizedSegment = segment.startsWith('/') ? segment : `/${segment}`
    return (
      normalizedPath === normalizedSegment ||
      normalizedPath === `/${locale}${normalizedSegment}`
    )
  })
}

function mapRoleToInitialPath(locale: string, role?: RoleName): string {
  switch (role) {
    case 'OWNER':
      return `/${locale}/dashboard/consultants/monitoring`
    case 'BARBER':
      return `/${locale}/dashboard/appointments`
    default:
      return `/${locale}/dashboard/home`
  }
}

function redirectTo(request: NextRequest, targetPath: string) {
  const currentUrl = request.nextUrl
  const destination = new URL(targetPath, request.url)

  if (currentUrl.href === destination.href) {
    return middlewareIntl(request)
  }

  return NextResponse.redirect(destination)
}

const appMiddleware = async (request: NextRequestWithAuth) => {
  const token = request.nextauth?.token
  const isLogged = !!token
  const locale = getLocale(request)
  const pathname = request.nextUrl.pathname
  const roleUser: RoleName | undefined = token?.user?.profile?.role?.name

  const isRoot = pathname === '/' || pathname === `/${locale}`
  const isLoginPage =
    pathname === '/auth/signin' || pathname === `/${locale}/auth/signin`
  const isPublic = isPublicPath(pathname, locale)

  if (isRoot) {
    if (isLogged) {
      return redirectTo(request, mapRoleToInitialPath(locale, roleUser))
    }
    return redirectTo(request, `/${locale}/auth/signin`)
  }

  if (!isLogged) {
    if (isPublic) {
      return middlewareIntl(request)
    }
    return redirectTo(request, `/${locale}/auth/signin`)
  }

  if (isLoginPage) {
    return redirectTo(request, mapRoleToInitialPath(locale, roleUser))
  }

  if (isPublic) {
    return middlewareIntl(request)
  }

  if (!roleUser) {
    return middlewareIntl(request)
  }

  const havePermission = verifyPageRole(siteConfig, roleUser, request)
  if (havePermission === false) {
    return redirectTo(request, `/${locale}/404`)
  }

  return middlewareIntl(request)
}

export default withAuth(appMiddleware, {
  callbacks: {
    authorized: () => true,
  },
})

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
