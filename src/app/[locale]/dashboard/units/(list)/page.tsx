import ListUnits from '@/components/template/ListUnits'
import { ParamsProp } from '@/types/general'
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
  return {
    title: meta('title'),
    description: meta('description'),
  }
}

type Props = {
  params: { locale: string }
  searchParams: { q: string; page: string }
}
const page = ({ searchParams }: Props) => {
  return <ListUnits searchParams={searchParams} />
}

export default page
