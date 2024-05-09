import { deleteUnit, listUnits } from '@/actions/unit'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import Search from '@/components/molecules/Search'
import Listing from '@/components/organisms/Listing'
import { SearchParams } from '@/types/general'
import { infoList } from './templates'

infoList.listActions = [
  {
    id: 1,
    icon: 'Trash',
    onclick: deleteUnit,
    name: 'Deletar',
    alert: {
      title: 'Você deseja realmente apagar esta unidade?',
      description: 'Essa ação será irreversível',
    },
    toast: {
      title: 'Unidade deletada com sucesso!',
    },
  },
  ...(infoList.listActions ?? []),
]

export default async function ListUnits({ searchParams }: SearchParams) {
  const response = await listUnits(
    searchParams?.q ?? '',
    searchParams?.page ?? '',
  )
  const list = response?.response ?? null
  const count = response?.count ?? null
  const errorRequest = response.error?.request ?? null

  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full flex flex-col justify-start items-center gap-4 mb-6">
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
            hrefButton="dashboard/units/register"
            textButton="Nova Unidade"
            title="Unidades"
            count={count}
          />
        </div>
      </div>
    </ContainerDashboard>
  )
}
