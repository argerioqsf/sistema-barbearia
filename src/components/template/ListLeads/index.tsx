import { arquivarLead, listLeads } from '@/actions/lead'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import Search from '@/components/molecules/Search'
import Listing from '@/components/organisms/Listing'
import { SearchParams } from '@/types/general'
import { infoList } from './templates'

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

export default async function ListLeads({ searchParams }: SearchParams) {
  const response = await listLeads(searchParams?.page ?? '', {
    name: searchParams?.q ?? '',
  })
  const list = response?.response ?? null
  const count = response?.count ?? null
  const errorRequest = response.error?.request ?? null

  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full h-full flex flex-col justify-start items-center gap-4">
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
            hrefButton="dashboard/leads/register"
            textButton="Novo lead"
            title="Leads"
            count={count}
          />
        </div>
      </div>
    </ContainerDashboard>
  )
}
