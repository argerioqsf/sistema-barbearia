import { listSalesPaginate } from '@/actions/sale'
import {
  DataListLayout,
  DataListSearchForm,
  DataListPagination,
  DataListEmptyState,
} from '@/components/organisms/DataList'
import { cn } from '@/lib/utils'
import type { SearchParams as SearchParamsType } from '@/types/general'
import { ButtonStartNewSale } from '@/modules/sales-pos/ui/components/organisms/ButtonStartNewSale'
import { SalesTable } from './components/SalesTable'

const PER_PAGE = 10

type ListSalesProps = {
  searchParams?: SearchParamsType['searchParams']
}

export default async function ListSales({ searchParams }: ListSalesProps) {
  const currentPage = Number(searchParams?.page ?? '1') || 1
  const searchTerm = (searchParams?.q ?? '').toString().trim()

  const response = await listSalesPaginate(
    String(searchTerm ? 1 : currentPage),
    searchTerm ? { id: searchTerm } : undefined,
  )

  if (!response.ok) {
    return (
      <div
        className={cn('px-4 pb-8 pt-4', 'sm:pt-6 sm:px-6', 'lg:pt-10 lg:px-10')}
      >
        <DataListLayout
          label="Vendas"
          title="Vendas"
          description="Acompanhe, retome e finalize vendas da unidade."
          action={
            <ButtonStartNewSale className="mb-0 h-10 rounded-full px-4 text-sm font-semibold" />
          }
        >
          <DataListEmptyState
            title="Não foi possível carregar as vendas."
            description={
              response.error?.message ?? 'Tente novamente mais tarde.'
            }
          />
        </DataListLayout>
      </div>
    )
  }

  const {
    items: sales = [],
    count = sales.length,
    page,
    perPage,
  } = response.data

  const normalizedSearch = searchTerm.toLowerCase()
  const filteredSales = searchTerm
    ? sales.filter((sale) => {
        const clientName = sale.client?.name?.toLowerCase() ?? ''
        const saleId = sale.id.toLowerCase()
        const paymentStatus = sale.paymentStatus.toLowerCase()
        const status = sale.status.toLowerCase()
        return (
          clientName.includes(normalizedSearch) ||
          saleId.includes(normalizedSearch) ||
          paymentStatus.includes(normalizedSearch) ||
          status.includes(normalizedSearch)
        )
      })
    : sales

  const totalCount = searchTerm
    ? filteredSales.length
    : count ?? filteredSales.length
  const totalPages = Math.max(
    1,
    Math.ceil((totalCount ?? 0) / (perPage ?? PER_PAGE)),
  )

  const params = new URLSearchParams()
  if (searchTerm) params.set('q', searchTerm)

  const makeHref = (pageTarget: number) => {
    const nextParams = new URLSearchParams(params)
    nextParams.set('page', pageTarget.toString())
    return `?${nextParams.toString()}`
  }

  return (
    <div
      className={cn('px-4 pb-8 pt-4', 'sm:pt-6 sm:px-6', 'lg:pt-10 lg:px-10')}
    >
      <DataListLayout
        label="Vendas"
        title="Vendas"
        description="Acompanhe, retome e finalize vendas da unidade."
        action={
          <ButtonStartNewSale className="mb-0 h-10 rounded-full px-4 text-sm font-semibold" />
        }
      >
        <DataListSearchForm
          defaultValue={searchTerm}
          placeholder="Buscar por ID, cliente ou status"
          clearHref="?"
        />

        <SalesTable sales={filteredSales} searchTerm={searchTerm} />

        <DataListPagination
          currentPage={searchTerm ? 1 : page ?? currentPage}
          totalPages={searchTerm ? 1 : totalPages}
          totalCount={totalCount}
          makeHref={makeHref}
        />
      </DataListLayout>
    </div>
  )
}
