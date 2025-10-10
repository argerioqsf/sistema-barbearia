import { listProductsPaginated } from '@/actions/product'
import {
  DataListLayout,
  DataListSearchForm,
  DataListPagination,
} from '@/components/organisms/DataList'
import { buttonVariants } from '@/components/ui/button-variants'
import type { SearchParams } from '@/types/general'
import Link from 'next/link'
import { ProductTable } from './components/ProductTable'
import { cn } from '@/lib/utils'

const PER_PAGE = 10

type ListProductsPageProps = {
  searchParams?: SearchParams['searchParams']
}

export default async function ListProductsPage({
  searchParams,
}: ListProductsPageProps) {
  const currentPage = Number(searchParams?.page ?? '1') || 1
  const searchTerm = (searchParams?.q ?? '').toString()

  const response = await listProductsPaginated(String(currentPage), {
    name: searchTerm,
    withCount: true,
    perPage: PER_PAGE,
  })

  const products = response.response ?? []
  const totalCount = response.count ?? products.length
  const totalPages = Math.max(1, Math.ceil(totalCount / PER_PAGE))

  const params = new URLSearchParams()
  if (searchTerm) params.set('q', searchTerm)

  const makeHref = (page: number) => {
    const nextParams = new URLSearchParams(params)
    nextParams.set('page', page.toString())
    return `?${nextParams.toString()}`
  }

  return (
    <div
      className={cn('px-4 pb-8 pt-4', 'sm:pt-6 sm:px-6', 'lg:pt-10 lg:px-10')}
    >
      <DataListLayout
        label="Estoque"
        title="Produtos"
        description="Gerencie o cadastro e visibilidade dos produtos da unidade."
        action={
          <Link
            href="/dashboard/products/register"
            className={buttonVariants({ size: 'sm' })}
          >
            Novo produto
          </Link>
        }
      >
        <DataListSearchForm
          defaultValue={searchTerm}
          placeholder="Buscar por nome do produto"
          clearHref="?"
        />

        <ProductTable products={products} />

        <DataListPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={totalCount}
          makeHref={makeHref}
        />
      </DataListLayout>
    </div>
  )
}
