import { arquivarLead, listLeads } from '@/actions/lead'
import { getProfile } from '@/actions/profile'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import Search from '@/components/molecules/Search'
import Listing from '@/components/organisms/Listing'
import { SearchParams } from '@/types/general'
import { checkUserPermissions } from '@/utils/checkUserPermissions'
import { notFound } from 'next/navigation'
import { infoList } from './templates'
import ErrorState from '@/components/molecules/ErrorState'

export default async function ListFirstContactLeads({
  searchParams,
}: SearchParams) {
  const responseProfile = await getProfile()
  const profile = responseProfile?.response
  const errorRequestProfile = responseProfile.error?.message ?? null
  if (errorRequestProfile) {
    return (
      <ErrorState
        title="Erro ao carregar perfil"
        message={String(errorRequestProfile)}
      />
    )
  }
  if (!profile) {
    notFound()
  }

  if (checkUserPermissions('lead.form.archived', profile.role)) {
    const getForId = infoList.listActions?.find((action) => action.id === 1)
    if (getForId === undefined) {
      infoList.listActions = [
        {
          id: 1,
          icon: 'Archive',
          onclick: arquivarLead,
          name: 'Arquivar',
          alert: {
            title: 'Você deseja realmente arquivar este lead?',
            description: 'Você ainda podera velo na tela de leads arquivados',
          },
          toast: {
            title: 'Lead arquivado com sucesso!',
          },
        },
        ...(infoList.listActions ?? []),
      ]
    }
  }

  const response = await listLeads(searchParams?.page ?? '', {
    name: searchParams?.q ?? '',
    archived: false,
    consultantId: 'null',
  })
  const list = response?.response ?? null
  const count = response?.count ?? null
  const errorRequest = response.error?.message ?? null
  if (errorRequest) {
    return (
      <ErrorState
        title="Erro ao carregar leads"
        message={String(errorRequest)}
      />
    )
  }

  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full h-full flex flex-col justify-start items-center gap-4">
        <div className="w-full">
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
            title="Leads"
            count={count}
          />
        </div>
      </div>
    </ContainerDashboard>
  )
}
