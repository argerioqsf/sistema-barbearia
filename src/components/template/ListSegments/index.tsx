import { deleteSegment, listSegments } from '@/actions/segments'
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
    icon: 'Trash',
    onclick: deleteSegment,
    name: 'Deletar',
    alert: {
      title: 'Você deseja realmente apagar este segmento?',
      description: 'Essa ação será irreversível',
    },
    toast: {
      title: 'Segmento deletado com sucesso!',
    },
  },
  ...(infoList.listActions ?? []),
]

export default async function ListSegments({ searchParams }: SearchParams) {
  const response = await listSegments(searchParams?.page ?? '', {
    name: searchParams?.q ?? '',
  })
  const list = response?.response ?? null
  const count = response?.count ?? null
  const errorRequest = response.error?.message ?? null
  if (errorRequest) {
    return (
      <ErrorState
        title="Erro ao carregar segmentos"
        message={String(errorRequest)}
      />
    )
  }

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
            list={list}
            infoList={infoList}
            listActions={infoList.listActions}
            hrefButton="dashboard/segments/register"
            textButton="Novo Segmento"
            title="Segmentos"
            count={count}
          />
        </div>
      </div>
    </ContainerDashboard>
  )
}
