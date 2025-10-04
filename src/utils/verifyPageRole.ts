import { ItemMenu } from '@/config/siteConfig'
import { NextRequest } from 'next/server'
import { checkUserPermissions } from './checkUserPermissions'
import { RoleName } from '@/features/roles/schemas'

function getCurrentPage(
  items: ItemMenu[],
  request: NextRequest,
): ItemMenu | undefined {
  let pathname = request.nextUrl.pathname
  pathname = pathname.includes('/')
    ? pathname.substring(pathname.indexOf('/', pathname.indexOf('/') + 1))
    : ''

  let currentPage: ItemMenu | undefined

  items.forEach((item) => {
    if (item.href) {
      if (item.absolutePath && pathname.includes(item?.href)) {
        currentPage = currentPage ?? item
      } else if (item.href.includes(pathname)) {
        currentPage = currentPage ?? item
      }
    } else if (item.subMenuList) {
      item.subMenuList.forEach((subItem) => {
        if (subItem.href) {
          if (subItem.absolutePath && pathname.includes(subItem?.href)) {
            currentPage = currentPage ?? subItem
          } else if (subItem.href.includes(pathname)) {
            currentPage = currentPage ?? subItem
          }
        }
      })
    }
  })

  return currentPage
}

export const verifyPageRole = (
  items: ItemMenu[],
  roleUser: RoleName,
  request: NextRequest,
): boolean | null => {
  const currentPage = getCurrentPage(items, request)
  if (currentPage) {
    if (checkUserPermissions(currentPage.userAction, roleUser)) {
      return true
    } else {
      return false
    }
  } else {
    return null
  }
}
