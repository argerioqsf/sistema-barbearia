import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

const middlewareIntl = createMiddleware({
  locales: ["pt-BR"],
  defaultLocale: "pt-BR",
});

export default function middleware(request: NextRequest) {
  const is_logged = !!request.cookies.get("token_SIM")?.value;
  const is_LoginPage = request.nextUrl.pathname.includes("/auth/signin");
  if (!is_logged) {
    if (is_LoginPage) {
      return middlewareIntl(request);
    }
    return NextResponse.redirect(new URL("/pt-BR/auth/signin", request.url));
  }
  if (is_LoginPage) {
    return NextResponse.redirect(new URL("/pt-BR/dashboard/home", request.url));
  }

  return middlewareIntl(request);
}

export const config = {
  matcher: ["/auth/signin", "/(de|pt-BR)/:path*"],
};
