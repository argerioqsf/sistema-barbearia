import { listIndicators } from '@/actions/user'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import Search from '@/components/molecules/Search'
import Listing from '@/components/organisms/Listing'
import { SearchParams } from '@/types/general'
import { infoList } from './templates'

infoList.listActions = [
  {
    id: 1,
    icon: 'Link',
    getClipBoard: async (id: string) => {
      'use server'
      return id
    },
    name: 'Link',
    toast: {
      title: 'Link copiado com sucesso!',
    },
  },
  ...(infoList.listActions ?? []),
]

export default async function ListIndicators({ searchParams }: SearchParams) {
  const response = await listIndicators(searchParams?.page ?? '', {
    name: searchParams?.q ?? '',
  })

  const list = response?.response ?? null
  const count = response?.count ?? null
  const errorRequest = response.error?.message ?? null

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
            list={list}
            infoList={infoList}
            listActions={infoList.listActions}
            hrefButton="dashboard/indicators/register"
            textButton="Novo indicador"
            title="Indicadores"
            count={count}
          />
        </div>
      </div>
    </ContainerDashboard>
  )
}
