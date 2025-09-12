import NotFoundPage from '@/components/template/NotFoundPage/page'
import { getLocale } from 'next-intl/server'

export default async function NotFound() {
  const locale = await getLocale()
  return <NotFoundPage href={`/${locale}/dashboard/home`} absolute={true} />
}
