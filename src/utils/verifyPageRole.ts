import { ItemMenu, Role, siteConfig } from "@/components/config/siteConfig";
import { NextRequest } from "next/server";
import { getRoleUserFromCookieRequest } from "./cookieClient";

export const verifyPageRole = (items:ItemMenu[], request: NextRequest): string | null=> {
    const role_user = getRoleUserFromCookieRequest(request) as Role
    for (let i = 0; i < items.length; i++) {
     const href = items[i].href??null
     const roles = items[i].roles??[]
     let pathname = request.nextUrl.pathname
     pathname = pathname.includes('/') ? pathname.substring(pathname.indexOf('/', pathname.indexOf('/') + 1)) : '';

     if (href) {
       const is_page = href.includes(pathname);
       if (is_page) {
         if (roles.includes(role_user)) {
           return null
         }else{
           return "/pt-BR/dashboard/home"
         }
       }
     }else{
       const subMenuList = siteConfig.items_side_menu[i].subMenuList
       if (subMenuList) {
        const path_redirect = verifyPageRole(subMenuList, request)
        if (path_redirect) {
          return path_redirect;
        }else{
          continue;
        }
       }
     }
    }
    return null
}