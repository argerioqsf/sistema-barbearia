import { cookies } from "next/headers";
import cookies_name from "@/constants/cookies_name.json";
import { User } from "@/types/general";
import { EnumLike } from "zod";

const getCookie = (name: string, json?: boolean): string | EnumLike | User | undefined => {
    let value = cookies().get(name)?.value;
    if (value && json) {
        value = JSON.parse(value)
        return value;
    }
    return value;
}

const setCookie = (name: string, value: any)=>{
    cookies().set(name, value);
}

export const getTokenFromCookieServer = ()=>{
    return getCookie(cookies_name.TOKEN_SIM_COOKIE)
}

export const getUserCookieServer = ():User=>{
    return getCookie(cookies_name.USER_SIM_COOKIE, true) as User
}

export const getRoleUserFromCookieServer = ()=>{
    const user = getUserCookieServer()
    return user?.profile?.role
}

export const setTokenInCookieServer = (token: string)=>{    
    setCookie(cookies_name.TOKEN_SIM_COOKIE, token);
}

export const setUserInCookieServer = (user: Object)=>{
    setCookie(cookies_name.USER_SIM_COOKIE, JSON.stringify(user));
}

export const setRolesInCookieServer = (roles: Object)=>{
    setCookie(cookies_name.ROLES_SIM_COOKIE, JSON.stringify(roles));
}