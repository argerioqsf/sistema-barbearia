import DetailCourses from '@/components/template/DetailCourses'
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

const page = ({ params: { id } }: { params: { id: string } }) => {
  return <DetailCourses id={id} />
}

export default page
