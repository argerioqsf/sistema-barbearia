import { activeUser, listUsers } from '@/actions/user'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import Search from '@/components/molecules/Search'
import Listing from '@/components/organisms/Listing'
import { SearchParams } from '@/types/general'
import { infoList } from './templates'


infoList.listActions = [
  {
    id: 3,
    icon: 'Unlock',
    onclick: activeUser,
    name: 'Ativar',
    alert: {
      title: 'Você deseja realmente ativar este usuário?',
    },
    toast: {
      title: 'Usuário ativado com sucesso!',
    },
  },
  ...(infoList.listActions ?? []),
]

export default async function ListUsersDisabled({ searchParams }: SearchParams) {
  const response = await listUsers(searchParams?.page ?? '', {
    name: searchParams?.q ?? '',
    active: false
  })
  const list = response?.response ?? null
  const count = response?.count ?? null
  const errorRequest = response.error?.request ?? null

  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full flex flex-col justify-start items-center gap-4">
        <div className="w-full">
          <Breadcrumb />
        </div>
        <div className="w-full mt-6">
          <Search errorRequest={errorRequest} />
        </div>
        <div className="w-full mt-6 lg:mt-8">
          <Listing
            infoList={infoList}
            list={list}
            listActions={infoList.listActions}
            hrefButton="dashboard/users/register"
            textButton="Novo usuário"
            title="Usuários"
            count={count}
          />
        </div>
      </div>
    </ContainerDashboard>
  )
}
