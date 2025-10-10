import { listUsersPaginatedAction } from '@/actions/user'
import {
  DataListLayout,
  DataListSearchForm,
  DataListPagination,
  DataListEmptyState,
} from '@/components/organisms/DataList'
import { buttonVariants } from '@/components/ui/button-variants'
import Link from 'next/link'
import { UserTable } from './components/UserTable'
import { cn } from '@/lib/utils'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth/options'
import { checkUserPermissions } from '@/utils/checkUserPermissions'
import { redirect } from 'next/navigation'

const PER_PAGE = 10

type ListUsersPageProps = {
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function ListUsersPage({
  searchParams,
}: ListUsersPageProps) {
  const session = await getServerSession(authOptions)
  const userRole = session?.user?.profile?.role?.name

  if (!checkUserPermissions('user.list', userRole)) {
    redirect('/dashboard/home')
  }

  const currentPage = Number(searchParams?.page ?? '1') || 1
  const searchTerm = (searchParams?.q ?? '').toString()

  const response = await listUsersPaginatedAction(String(currentPage), {
    name: searchTerm,
    withCount: true,
    perPage: PER_PAGE,
  })

  if (!response.ok) {
    return (
      <div
        className={cn('px-4 pb-8 pt-4', 'sm:pt-6 sm:px-6', 'lg:pt-10 lg:px-10')}
      >
        <DataListLayout
          label="Equipe"
          title="Usuários"
          description="Gerencie os usuários, permissões e status de acesso."
          action={
            <Link
              href="/users/register"
              className={buttonVariants({ size: 'sm' })}
            >
              Novo usuário
            </Link>
          }
        >
          <DataListEmptyState
            title="Não foi possível carregar os usuários."
            description={
              response.error?.message ?? 'Tente novamente mais tarde.'
            }
          />
        </DataListLayout>
      </div>
    )
  }

  const {
    items: users,
    count = users?.length || 0,
    page,
    perPage,
  } = response.data
  const totalPages = Math.max(
    1,
    Math.ceil((count ?? 0) / (perPage ?? PER_PAGE)),
  )

  const params = new URLSearchParams()
  if (searchTerm) params.set('q', searchTerm)

  const makeHref = (pageTarget: number) => {
    const nextParams = new URLSearchParams(params)
    nextParams.set('page', pageTarget.toString())
    return `?${nextParams.toString()}`
  }

  return (
    <div
      className={cn('px-4 pb-8 pt-4', 'sm:pt-6 sm:px-6', 'lg:pt-10 lg:px-10')}
    >
      <DataListLayout
        label="Equipe"
        title="Usuários"
        description="Gerencie os usuários, permissões e status de acesso."
        action={
          <Link
            href="/dashboard/users/register"
            className={buttonVariants({ size: 'sm' })}
          >
            Novo usuário
          </Link>
        }
      >
        <DataListSearchForm
          defaultValue={searchTerm}
          placeholder="Buscar por nome ou e-mail"
          clearHref="?"
        />

        {users.length === 0 ? (
          <DataListEmptyState
            title="Nenhum usuário encontrado."
            description="Use a busca ou cadastre um novo usuário."
          />
        ) : (
          <UserTable users={users} />
        )}

        <DataListPagination
          currentPage={page ?? currentPage}
          totalPages={totalPages}
          totalCount={count ?? users.length}
          makeHref={makeHref}
        />
      </DataListLayout>
    </div>
  )
}
