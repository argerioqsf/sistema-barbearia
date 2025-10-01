import { listLeads, pegarLead } from '@/actions/lead'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import Search from '@/components/molecules/Search'
import Listing from '@/components/organisms/Listing'
import { SearchParams } from '@/types/general'
import { infoList } from './templates'
import ErrorState from '@/components/molecules/ErrorState'
import { getProfile } from '@/actions/profile'
import { notFound } from 'next/navigation'
import { checkUserPermissions } from '@/utils/checkUserPermissions'

export default async function ListNewLeads({ searchParams }: SearchParams) {
  const responseProfile = await getProfile()
  const profile = responseProfile?.response
  const errorRequestProfile = responseProfile.error?.message ?? null
  if (!profile) {
    notFound()
  }
  const response = await listLeads(searchParams?.page ?? '', {
    name: searchParams?.q ?? '',
    consultantId: 'null',
    archived: false,
    released: true,
  })

  if (checkUserPermissions('lead.pegar.set', profile.role)) {
    const getForId = infoList.listActions?.find((action) => action.id === 3)
    if (getForId === undefined) {
      infoList.listActions = [
        {
          id: 3,
          icon: 'Pointer',
          onclick: pegarLead,
          name: 'Pegar',
          alert: {
            title: 'Você deseja realmente pegar este lead?',
            description:
              'Assim que pegalo poderá velo na sua listagem de leads',
          },
          toast: {
            title: 'Lead pegado com sucesso!',
          },
        },
        ...(infoList.listActions ?? []),
      ]
    }
  }

  const list = response?.response ?? null
  const count = response?.count ?? null
  const errorRequest = response.error?.message ?? null
  if (errorRequest) {
    return (
      <ErrorState
        title="Erro ao carregar novos leads"
        message={String(errorRequest)}
      />
    )
  }

  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full h-full flex flex-col justify-start items-center gap-4">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        <div className="w-full mt-6">
          <Search errorRequest={errorRequest ?? errorRequestProfile} />
        </div>
        <div className="w-full mt-6 lg:mt-8">
          <Listing
            infoList={infoList}
            list={list}
            listActions={infoList.listActions}
            hrefButton="dashboard/leads/register"
            textButton={
              checkUserPermissions('lead.register', profile.role)
                ? 'Novo lead'
                : undefined
            }
            title="Novos Leads"
            count={count}
          />
        </div>
      </div>
    </ContainerDashboard>
  )
}
