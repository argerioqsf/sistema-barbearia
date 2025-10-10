import CollaboratorMonitoring from '@/components/template/CollaboratorMonitoring'
import { ParamsProp } from '@/types/general'
import { getTranslations } from 'next-intl/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth/options'
import { notFound } from 'next/navigation'
import { checkUserPermissions } from '@/utils/checkUserPermissions'

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

export default async function Page() {
  const session = await getServerSession(authOptions)
  const role = session?.user?.profile?.role?.name
  const allowed = checkUserPermissions('collaborator.monitoring.view', role)
  if (!allowed) notFound()
  return <CollaboratorMonitoring />
}
