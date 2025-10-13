import { QueryClient, dehydrate } from '@tanstack/react-query'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button-variants'
import { Badge } from '@/components/ui/badge'
import { PageCard, PageCardContent } from '@/components/ui/page-card'
import { ButtonStartNewSale } from '@/modules/sales-pos/ui/components/organisms/ButtonStartNewSale'
import { getSale } from '@/modules/sales/application'
import type { SaleDTO } from '@/modules/sales/domain'
import { qk } from '@/shared/query-keys'
import { Steps } from '@/modules/sales-pos/ui/components/organisms/PointOfSaleSteps'
import { SaleSummary } from '@/modules/sales-pos/ui/components/organisms/SaleSummary'
import { POSHydrate } from './POSHydrate'

const paymentStatusLabels: Record<SaleDTO['paymentStatus'], string> = {
  PENDING: 'Pendente',
  PAID: 'Pago',
}

const paymentStatusBadgeVariant: Record<
  SaleDTO['paymentStatus'],
  'default' | 'secondary' | 'destructive' | 'outline'
> = {
  PAID: 'default',
  PENDING: 'secondary',
}

const saleStatusLabels: Record<SaleDTO['status'], string> = {
  COMPLETED: 'Concluída',
  CANCELLED: 'Cancelada',
  CREATED: 'Criada',
  IN_PROGRESS: 'Em andamento',
}

const saleStatusBadgeVariant: Record<
  SaleDTO['status'],
  'default' | 'secondary' | 'destructive' | 'outline'
> = {
  COMPLETED: 'default',
  IN_PROGRESS: 'secondary',
  CREATED: 'secondary',
  CANCELLED: 'destructive',
}

interface PointOfSaleProps {
  id?: string
  locale?: string
}

export async function PointOfSale({ id, locale }: PointOfSaleProps) {
  const dashboardHref = createDashboardHref(locale)
  const pointOfSaleBaseHref = createPointOfSaleBaseHref(locale)

  if (!id) {
    return (
      <PointOfSaleLanding
        dashboardHref={dashboardHref}
        redirectBasePath={pointOfSaleBaseHref}
      />
    )
  }

  const queryClient = new QueryClient()
  const result = await getSale(id)

  if (!result.ok) {
    return (
      <PointOfSaleLanding
        dashboardHref={dashboardHref}
        redirectBasePath={pointOfSaleBaseHref}
        errorMessage={result.error.message}
      />
    )
  }

  const sale = result.value.sale
  const itemsCount = result.value.totals.itemCount ?? sale.items?.length ?? 0
  const nameUnit = sale.unit?.name ?? 'Unidade'
  const nameClient = sale.client?.name ?? 'Cliente'
  const isPaid = sale.paymentStatus === 'PAID'

  queryClient.setQueryData(qk.sales.byId(id), result.value)
  const dehydratedState = dehydrate(queryClient)

  return (
    <POSHydrate state={dehydratedState}>
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-100 via-white to-slate-100 text-foreground">
        <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col gap-6 px-4 pb-16 pt-12 sm:px-6 lg:px-10">
          <div
            className={cn(
              'grid min-h-0 flex-1 gap-6',
              !isPaid && 'lg:grid-cols-[minmax(0,1.65fr)_minmax(340px,1fr)]',
              !isPaid && 'xl:grid-cols-[minmax(0,1.8fr)_minmax(360px,1fr)]',
            )}
          >
            <Steps
              isPaid={isPaid}
              saleId={sale.id}
              redirectBasePath={pointOfSaleBaseHref}
            />
            {!isPaid && (
              <aside className="lg:sticky lg:top-12">
                <SaleSummary saleId={sale.id} />
              </aside>
            )}
          </div>

          <PageCard>
            <PageCardContent className="space-y-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-400">
                    Detalhes da venda
                  </p>
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
                      {nameUnit}
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Cliente:{' '}
                      <span className="font-medium text-slate-700">
                        {nameClient}
                      </span>
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 font-mono text-xs text-slate-500">
                    <span className="font-semibold uppercase tracking-[0.28em] text-slate-400">
                      ID
                    </span>
                    <span className="truncate">{sale.id}</span>
                  </div>
                </div>

                <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-end lg:w-auto">
                  <ButtonStartNewSale
                    redirectBasePath={pointOfSaleBaseHref}
                    className="mb-0 w-full rounded-full px-6 py-3 text-base font-semibold sm:w-auto"
                  />
                  <Link
                    href={createHref('/dashboard/sales')}
                    className={cn(
                      buttonVariants({ variant: 'ghost', size: 'sm' }),
                      'w-full justify-center rounded-full border border-transparent px-6 py-3 text-sm font-semibold text-slate-500 transition hover:border-slate-200 hover:text-slate-700 sm:w-auto',
                    )}
                  >
                    Ir para o dashboard
                  </Link>
                </div>
              </div>

              <dl className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-4 shadow-sm shadow-slate-200/40">
                  <dt className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                    Status
                  </dt>
                  <dd className="mt-3">
                    <Badge
                      variant={saleStatusBadgeVariant[sale.status]}
                      className="px-3 py-1 text-xs font-semibold uppercase tracking-widest"
                    >
                      {saleStatusLabels[sale.status]}
                    </Badge>
                  </dd>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-4 shadow-sm shadow-slate-200/40">
                  <dt className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                    Pagamento
                  </dt>
                  <dd className="mt-3">
                    <Badge
                      variant={paymentStatusBadgeVariant[sale.paymentStatus]}
                      className="px-3 py-1 text-xs font-semibold uppercase tracking-widest"
                    >
                      {paymentStatusLabels[sale.paymentStatus]}
                    </Badge>
                  </dd>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-4 shadow-sm shadow-slate-200/40">
                  <dt className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                    Criada em
                  </dt>
                  <dd className="mt-3 text-sm font-semibold text-slate-800">
                    {new Date(sale.createdAt).toLocaleString('pt-BR', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </dd>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-4 shadow-sm shadow-slate-200/40">
                  <dt className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                    Itens adicionados
                  </dt>
                  <dd className="mt-3 text-2xl font-semibold text-slate-900">
                    {itemsCount}
                    <span className="ml-2 text-sm font-normal text-slate-500">
                      {itemsCount === 1 ? 'item' : 'itens'}
                    </span>
                  </dd>
                </div>
              </dl>
            </PageCardContent>
          </PageCard>
        </div>
      </div>
    </POSHydrate>
  )
}

function PointOfSaleLanding({
  dashboardHref,
  redirectBasePath,
  errorMessage,
}: {
  dashboardHref: string
  redirectBasePath: string
  errorMessage?: string
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-100 via-white to-slate-100 text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-10">
        <PageCard>
          <PageCardContent className="flex flex-col items-center gap-6 text-center sm:gap-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
              Ponto de Venda
            </p>
            <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
              Inicie uma nova venda
            </h1>
            <p className="max-w-xl text-sm text-slate-500 sm:text-base">
              Selecione um cliente para começar um atendimento rápido no POS.
            </p>

            {errorMessage && (
              <div className="w-full rounded-2xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {errorMessage}
              </div>
            )}

            <div className="flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <ButtonStartNewSale
                redirectBasePath={redirectBasePath}
                className="mb-0 w-full rounded-full px-8 py-3 text-base font-semibold sm:w-auto"
              />
              <Link
                href={dashboardHref}
                className={cn(
                  buttonVariants({ variant: 'ghost', size: 'sm' }),
                  'text-slate-500 hover:text-slate-700',
                )}
              >
                Ir para o dashboard
              </Link>
            </div>
          </PageCardContent>
        </PageCard>
      </div>
    </div>
  )
}

function createDashboardHref(locale?: string, path = '/dashboard/home') {
  return createHref(path, locale)
}

function createHref(path: string, locale?: string) {
  if (!locale) {
    return path
  }
  return `/${locale}${path}`
}

function createPointOfSaleBaseHref(locale?: string) {
  if (!locale) {
    return '/point-of-sale'
  }
  return `/${locale}/point-of-sale`
}
