import Home from '@/components/template/Home'
import { ParamsProp } from '@/types/general'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({
  params: { locale },
}: {
  params: ParamsProp
}) {
  const meta = await getTranslations({
    locale,
    namespace: 'metadata.dashboard.home',
  })
  return {
    title: meta('title'),
    description: meta('description'),
  }
}

const page = () => {
  return <Home />
}

export default page
