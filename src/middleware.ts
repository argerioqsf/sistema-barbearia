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
function verifyPublicPage(request: NextRequest, publicPages: string[]) {
  const { pathname } = request.nextUrl
  return publicPages.some((segment) => pathname.includes(segment))
}

function getLocale(request: NextRequestWithAuth): string {
  const seg = request.nextUrl.pathname.split('/').filter(Boolean)[0]
  return seg || defaultLocale
}

const appMiddleware = async (request: NextRequestWithAuth) => {
  const token = request.nextauth?.token
  const isLogged = !!token
  const publicPages = ['/auth/signin', 'sim/indicator']
  const isPublicPages = verifyPublicPage(request, publicPages)
  const isLoginPage = request.nextUrl.pathname.includes('/auth/signin')
  const roleUser: RoleName | undefined = token?.user?.profile?.role?.name
  const locale = getLocale(request)
  const pathname = request.nextUrl.pathname
  const mapRoleToInitialPath = (role?: RoleName): string => {
    switch (role) {
      case 'OWNER':
        return `/${locale}/dashboard/consultants/monitoring`
      case 'BARBER':
        return `/${locale}/dashboard/appointments`
      default:
        return `/${locale}/dashboard/home`
    }
  }

  // If accessing root or only locale segment, route appropriately
  if (pathname === '/' || pathname === `/${locale}`) {
    if (isLogged) {
      const path = mapRoleToInitialPath(roleUser)
      return NextResponse.redirect(new URL(path, request.url))
    } else {
      return NextResponse.redirect(
        new URL(`/${locale}/auth/signin`, request.url),
      )
    }
  }
  if (!isLogged) {
    if (isPublicPages) {
      return middlewareIntl(request)
    } else {
      return NextResponse.redirect(
        new URL(`/${locale}/auth/signin`, request.url),
      )
    }
  }

  if (isLoginPage) {
    const path = mapRoleToInitialPath(roleUser)
    return NextResponse.redirect(new URL(path, request.url))
  } else {
    if (isPublicPages) {
      return middlewareIntl(request)
    }

    if (roleUser) {
      const havePermission = verifyPageRole(siteConfig, roleUser, request)
      if (havePermission === false) {
        return NextResponse.redirect(new URL(`/${locale}/404`, request.url))
      } else if (havePermission === true) {
        return middlewareIntl(request)
      } else if (havePermission === null) {
        return middlewareIntl(request)
      }
    } else {
      return NextResponse.redirect(
        new URL(`/${locale}/auth/signin`, request.url),
      )
    }
  }
}

export default withAuth(appMiddleware, {
  callbacks: {
    authorized: () => true, // Use our own logic inside appMiddleware
  },
})

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
