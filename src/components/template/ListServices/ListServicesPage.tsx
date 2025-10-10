import { listServicesPaginated } from '@/actions/service'
import {
  DataListLayout,
  DataListSearchForm,
  DataListPagination,
  DataListEmptyState,
} from '@/components/organisms/DataList'
import { buttonVariants } from '@/components/ui/button-variants'
import Link from 'next/link'
import { ServiceTable } from './components/ServiceTable'
import { cn } from '@/lib/utils'
import { ErrorRequestHandler } from '@/components/organisms/ErrorRequestHandler'

const PER_PAGE = 10

export type ListServicesPageProps = {
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function ListServicesPage({
  searchParams,
}: ListServicesPageProps) {
  const currentPage = Number(searchParams?.page ?? '1') || 1
  const searchTerm = (searchParams?.q ?? '').toString()

  const response = await listServicesPaginated(String(currentPage), {
    name: searchTerm,
    withCount: true,
    perPage: PER_PAGE,
  })
  if (!response.ok) {
    return <ErrorRequestHandler result={{ ok: false, error: response.error }} />
  }

  const services = response.data.items ?? []
  const totalCount = response.data.count ?? services.length
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
        label="Catálogo"
        title="Serviços"
        description="Gerencie o cadastro e visibilidade dos serviços disponíveis."
        action={
          <Link
            href="/dashboard/services/register"
            className={buttonVariants({ size: 'sm' })}
          >
            Novo serviço
          </Link>
        }
      >
        <DataListSearchForm
          defaultValue={searchTerm}
          placeholder="Buscar por nome do serviço"
          clearHref="?"
        />
        {services.length === 0 ? (
          <DataListEmptyState
            title="Nenhum serviço encontrado."
            description="Use a busca ou cadastre um novo serviço."
          />
        ) : (
          <ServiceTable services={services} />
        )}

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
