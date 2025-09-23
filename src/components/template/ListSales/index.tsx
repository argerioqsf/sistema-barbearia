import { listSalesPaginate } from '@/actions/sale'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import Listing from '@/components/organisms/Listing'
import { SearchParams } from '@/types/general'
import { ButtonStartNewSale } from '@/components/molecules/ButtonStartNewSale'
import { infoListSales } from '@/features/pos/constants'
import { ErrorRequestHandler } from '@/components/organisms/ErrorRequestHandler'

export default async function ListSales({ searchParams }: SearchParams) {
  const result = await listSalesPaginate(searchParams?.page || '1')
  if (!result.ok) {
    return <ErrorRequestHandler result={result} />
  }
  const sales = result.data.items
  const count = result.data.count

  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full h-full flex flex-col justify-start items-center gap-4">
        <div className="w-full">
          <Breadcrumb />
        </div>
        <ButtonStartNewSale />
        <div className="w-full mt-6 lg:mt-8">
          <Listing
            infoList={infoListSales}
            list={sales}
            listActions={infoListSales.listActions}
            title="Vendas"
            count={count}
          />
        </div>
      </div>
    </ContainerDashboard>
  )
}
