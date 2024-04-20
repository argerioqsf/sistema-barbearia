import { ItemMenu, siteConfig } from '@/config/siteConfig'
import { NextRequest } from 'next/server'
import { getRoleUserFromCookieRequest } from './cookieClient'
import { Role } from '@/types/general'
import { UserAction, verifyPermissionUser } from './verifyPermissionUser'

export const verifyPageRole = (
  items: ItemMenu[],
  request: NextRequest,
): boolean => {
  const roleUser = getRoleUserFromCookieRequest(request) as Role
  let havePermission = false
  if (roleUser) {
    for (let i = 0; i < items.length; i++) {
      const href = items[i].href ?? null
      const userAction: UserAction = items[i].userAction
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
          if (verifyPermissionUser(userAction, roleUser)) {
            havePermission = true
            break
          } else {
            havePermission = false
            break
          }
        }
      } else {
        const subMenuList = siteConfig[i].subMenuList
        if (subMenuList) {
          const pathRedirect = verifyPageRole(subMenuList, request)
          if (pathRedirect) {
            havePermission = pathRedirect
            break
          } else {
            continue
          }
        }
      }
    }
  } else {
    havePermission = true
  }
  return havePermission
}
