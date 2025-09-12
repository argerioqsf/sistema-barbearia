import { listProducts } from '@/actions/product'
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

export default async function ListProducts({ searchParams }: SearchParams) {
  const response = await listProducts(searchParams?.page ?? '', {
    name: searchParams?.q ?? '',
    withCount: true,
    perPage: 10,
  })

  const list = response?.response ?? null
  const count = response?.count ?? null
  const errorRequest = response.error?.request ?? null
  if (errorRequest) {
    return (
      <ErrorState
        title="Erro ao carregar produtos"
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
          <Search errorRequest={errorRequest} />
        </div>
        <div className="w-full mt-6 lg:mt-8">
          <Listing
            list={list}
            infoList={infoList}
            listActions={infoList.listActions}
            hrefButton="dashboard/products/register"
            textButton="Novo produto"
            title="Produtos"
            count={count}
          />
        </div>
      </div>
    </ContainerDashboard>
  )
}
