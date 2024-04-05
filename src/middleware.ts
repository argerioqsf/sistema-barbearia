import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { getTokenFromCookieRequest } from "./utils/cookieClient";
import { siteConfig } from "./components/config/siteConfig";
import { verifyPageRole } from "./utils/verifyPageRole";

const middlewareIntl = createMiddleware({
  locales: ["pt-BR"],
  defaultLocale: "pt-BR",
});

export default function middleware(request: NextRequest) {
  const is_logged = !!getTokenFromCookieRequest(request);
  const is_LoginPage = request.nextUrl.pathname.includes("/auth/signin");
  if (!is_logged) {
    if (is_LoginPage) {
      return middlewareIntl(request);
    }
    return NextResponse.redirect(new URL("/pt-BR/auth/signin", request.url));
  }
  if (is_LoginPage) {
    return NextResponse.redirect(new URL("/pt-BR/dashboard/home", request.url));
  }else{
    const  path_redirect = verifyPageRole(siteConfig.items_side_menu, request)
    if (path_redirect) {
      return NextResponse.redirect(new URL(path_redirect, request.url));
    }else{
      return middlewareIntl(request);
    }
  }
}

export const config = {
  matcher: ["/auth/signin", "/(de|pt-BR)/:path*"],
};
