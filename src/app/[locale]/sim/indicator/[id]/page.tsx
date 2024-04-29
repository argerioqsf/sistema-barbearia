import { RegisterLeadsPublic } from '@/components/template/RegisterLeadsPublic'
import { ParamsProp } from '@/types/general'
import { getTranslations } from 'next-intl/server'

interface PageProps {
  params: { id: string }
}

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

export default function Page({ params: { id } }: PageProps) {
  return <RegisterLeadsPublic id={id} />
}
