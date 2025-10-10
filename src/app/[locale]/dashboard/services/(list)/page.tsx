import ListServicesPage from '@/components/template/ListServices/ListServicesPage'
import type { ParamsProp, SearchParams } from '@/types/general'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({
  params: { locale },
}: {
  params: ParamsProp
}) {
  const meta = await getTranslations({
    locale,
    namespace: 'metadata.dashboard.services',
  }).catch(async () =>
    getTranslations({
      locale,
      namespace: 'metadata.dashboard.profile',
    }),
  )
  return {
    title: meta('title'),
    description: meta('description'),
  }
}

export default async function ServicesListPage({ searchParams }: SearchParams) {
  return <ListServicesPage searchParams={searchParams} />
}
