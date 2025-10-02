import NotFoundPage from '@/components/template/NotFoundPage/page'
import { unstable_setRequestLocale as unstableSetRequestLocale } from 'next-intl/server'
import { defaultLocale } from '@/locales'

export default function NotFound() {
  const locale = defaultLocale
  unstableSetRequestLocale(locale)
  return <NotFoundPage href={`/${locale}/dashboard/home`} absolute={true} />
}
