import { cookies } from "next/headers";
import cookies_name from "@/constants/cookies_name.json";

const getCookie = (name: string, json?: boolean) => {
    let value = cookies().get(name)?.value;
    if (value && json) {
        value = JSON.parse(value)
    }
    return value;
}

const setCookie = (name: string, value: any)=>{
    cookies().set(name, value);
}

export const getTokenFromCookieServer = ()=>{
    return getCookie(cookies_name.TOKEN_SIM_COOKIE)
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