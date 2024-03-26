import Cookies from "js-cookie";
import { NextRequest } from "next/server";
import cookies_name from "@/constants/cookies_name.json";
import { EnumLike } from "zod";

type ContextCookie = 'client' | 'request'

const getCookie = (context: ContextCookie, name: string, request?:NextRequest, json?: boolean): string | EnumLike => {
    if (context === 'request') {
        return request?.cookies.get(name)?.value??''
    }
    
    if (context === 'client') {
        let value = Cookies.get(name);
        if (value && json) {
            value = JSON.parse(value)
        }
        return value?? ''
    }

    return ''
}

const removeCookie = (context: ContextCookie, name: string)=>{
    if (context === 'client') {
        Cookies.remove(name);
    }
}

 export const getUserFromCookie = ()=>{
    return getCookie('client',cookies_name.USER_SIM_COOKIE,undefined,true)
}

export const getRolesFromCookie = (): EnumLike =>{
    return getCookie('client',cookies_name.ROLES_SIM_COOKIE,undefined,true) as EnumLike
}

export const getTokenFromCookieRequest = (request: NextRequest)=>{
    return getCookie('request',cookies_name.TOKEN_SIM_COOKIE,request)
}

export const getTokenFromCookieClient = ()=>{
    return getCookie('client',cookies_name.TOKEN_SIM_COOKIE)
}

export const removeTokenCookieClient = ()=>{
    removeCookie('client',cookies_name.TOKEN_SIM_COOKIE);
}

export const removeUserCookieClient = ()=>{
    removeCookie('client',cookies_name.USER_SIM_COOKIE);
}

export const removeRolesCookieClient = ()=>{
    removeCookie('client',cookies_name.ROLES_SIM_COOKIE);
}