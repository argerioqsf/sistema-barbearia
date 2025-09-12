import ListAppointments from '@/components/template/ListAppointments'
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

export default function Page({ searchParams }: SearchParams) {
  return <ListAppointments searchParams={searchParams} />
}
