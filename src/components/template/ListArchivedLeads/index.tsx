import { desarquivarLead, listLeads } from '@/actions/lead'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import Search from '@/components/molecules/Search'
import Listing from '@/components/organisms/Listing'
import { SearchParams } from '@/types/general'
import { infoList } from './templates'
import ErrorState from '@/components/molecules/ErrorState'

infoList.listActions = [
  {
    id: 1,
    icon: 'ArchiveRestore',
    onclick: desarquivarLead,
    name: 'Desarquivar',
    alert: {
      title: 'Você deseja realmente desarquivar este lead?',
      description: 'Você podera velo na tela de leads',
    },
    toast: {
      title: 'Lead desarquivado com sucesso!',
    },
  },
  ...(infoList.listActions ?? []),
]

export default async function ListArchivedLeads({
  searchParams,
}: SearchParams) {
  const response = await listLeads(searchParams?.page ?? '', {
    name: searchParams?.q ?? '',
    archived: true,
  })
  const list = response?.response ?? null
  const count = response?.count ?? null
  const errorRequest = response.error?.message ?? null
  if (errorRequest) {
    return (
      <ErrorState
        title="Erro ao carregar leads arquivados"
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
        <div className="w-full mt-6 flex flex-col md:flex-row gap-1">
          <Search errorRequest={errorRequest} placeholder="Nome do lead" />
        </div>
        <div className="w-full mt-6 lg:mt-8">
          <Listing
            infoList={infoList}
            list={list}
            listActions={infoList.listActions}
            hrefButton="dashboard/leads/register"
            title="Leads Arquivados"
            count={count}
          />
        </div>
      </div>
    </ContainerDashboard>
  )
}
