import { ItemMenu, Role, siteConfig } from '@/components/config/siteConfig'
import { NextRequest } from 'next/server'
import { getRoleUserFromCookieRequest } from './cookieClient'

export const verifyPageRole = (
  items: ItemMenu[],
  request: NextRequest,
): string | null => {
  const roleUser = getRoleUserFromCookieRequest(request) as Role
  for (let i = 0; i < items.length; i++) {
    const href = items[i].href ?? null
    const roles = items[i].roles ?? []
    const absolutePath = items[i].absolutePath ?? false
    let pathname = request.nextUrl.pathname
    pathname = pathname.includes('/')
      ? pathname.substring(pathname.indexOf('/', pathname.indexOf('/') + 1))
      : ''

    if (href) {
      const isPage = absolutePath
        ? pathname.includes(href)
        : href.includes(pathname)
      if (isPage) {
        if (roles.includes(roleUser)) {
          return null
        } else {
          return '/pt-BR/dashboard/home'
        }
      }
    } else {
      const subMenuList = siteConfig.items_side_menu[i].subMenuList
      if (subMenuList) {
        const pathRedirect = verifyPageRole(subMenuList, request)
        if (pathRedirect) {
          return pathRedirect
        } else {
          continue
        }
      }
    }
  }
  return null
}
