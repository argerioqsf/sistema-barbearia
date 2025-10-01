import ListSales from '@/components/template/ListSales'
import { ParamsProp, SearchParams } from '@/types/general'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({
  params: { locale },
}: {
  params: ParamsProp
}) {
  const meta = await getTranslations({
    locale,
    namespace: 'metadata.dashboard.profile',
  })
  return { title: meta('title'), description: meta('description') }
}

export default function ListSalesPage({ searchParams }: SearchParams) {
  return <ListSales searchParams={searchParams} />
}
