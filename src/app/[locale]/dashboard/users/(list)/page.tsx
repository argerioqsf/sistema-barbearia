import ListUsersPage from '@/components/template/ListUsers/ListUsersPage'
import type { ParamsProp, SearchParams } from '@/types/general'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({
  params: { locale },
}: {
  params: ParamsProp
}) {
  const meta = await getTranslations({
    locale,
    namespace: 'metadata.dashboard.users',
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

export default async function UsersListPage({ searchParams }: SearchParams) {
  return <ListUsersPage searchParams={searchParams} />
}
