import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  locales: ['pt-BR'],
 
  defaultLocale: 'pt-BR'
});
 
export const config = {
  matcher: ['/', '/(de|pt-BR)/:path*']
};