import { listTransactionsAction } from '@/actions/transaction'
import {
  DataListLayout,
  DataListSearchForm,
  DataListPagination,
  DataListEmptyState,
} from '@/components/organisms/DataList'
import { buttonVariants } from '@/components/ui/button-variants'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { TransactionsTable } from './components/TransactionsTable'

const PER_PAGE = 10

type ListTransactionsPageProps = {
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function ListTransactionsPage({
  searchParams,
}: ListTransactionsPageProps) {
  const currentPage = Number(searchParams?.page ?? '1') || 1
  const searchTerm = (searchParams?.q ?? '').toString()

  const response = await listTransactionsAction(String(currentPage))

  if (!response.ok) {
    return (
      <div
        className={cn('px-4 pb-8 pt-4', 'sm:pt-6 sm:px-6', 'lg:pt-10 lg:px-10')}
      >
        <DataListLayout
          label="Financeiro"
          title="Transações"
          description="Gerencie todas as transações do sistema."
          action={
            <Link
              href="/dashboard/pay/transactions"
              className={buttonVariants({ size: 'sm' })}
            >
              Pagar Comissão
            </Link>
          }
        >
          <DataListEmptyState
            title="Não foi possível carregar as transações."
            description={
              response.error?.message ?? 'Tente novamente mais tarde.'
            }
          />
        </DataListLayout>
      </div>
    )
  }
  const transactions = response.data
  const page = 0
  const perPage = 0
  const count = transactions.length
  const totalPages = Math.max(
    1,
    Math.ceil((count ?? 0) / (perPage ?? PER_PAGE)),
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
        label="Financeiro"
        title="Transações"
        description="Gerencie todas as transações do sistema."
        action={
          <Link
            href="/dashboard/financial/pay-commission"
            className={buttonVariants({ size: 'sm' })}
          >
            Pagar Comissão
          </Link>
        }
      >
        <DataListSearchForm
          defaultValue={searchTerm}
          placeholder="Buscar por descrição ou ID"
          clearHref="?"
        />

        {transactions.length === 0 ? (
          <DataListEmptyState
            title="Nenhuma transação encontrada."
            description="Use a busca ou registre uma nova transação."
          />
        ) : (
          <TransactionsTable transactions={transactions} />
        )}

        <DataListPagination
          currentPage={page ?? currentPage}
          totalPages={totalPages}
          totalCount={count ?? transactions.length}
          makeHref={makeHref}
        />
      </DataListLayout>
    </div>
  )
}
