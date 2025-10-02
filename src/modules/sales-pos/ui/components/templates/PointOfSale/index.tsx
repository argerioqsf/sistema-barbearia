import { QueryClient, dehydrate } from '@tanstack/react-query'
import { ErrorRequestHandler } from '@/components/organisms/ErrorRequestHandler'
import { getSale } from '@/modules/sales/application'
import { qk } from '@/shared/query-keys'
import { Steps } from '@/modules/sales-pos/ui/components/organisms/PointOfSaleSteps'
import { SaleSummary } from '@/modules/sales-pos/ui/components/organisms/SaleSummary'
import { POSHydrate } from './POSHydrate'

interface PointOfSaleProps {
  id: string
}

export async function PointOfSale({ id }: PointOfSaleProps) {
  const saleId = id
  const queryClient = new QueryClient()
  const result = await getSale(saleId)

  if (!result.ok) {
    return <ErrorRequestHandler result={{ ok: false, error: result.error }} />
  }

  const sale = result.value.sale
  const itemsCount = sale.items?.length ?? 0
  const nameUnit = sale.unit?.name ?? 'Unidade'
  const nameClient = sale.client?.name ?? 'Cliente'
  queryClient.setQueryData(qk.sales.byId(saleId), result.value)
  const dehydratedState = dehydrate(queryClient)

  return (
    <POSHydrate state={dehydratedState}>
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-100 via-white to-slate-100 text-foreground">
        <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col gap-8 px-4 pb-12 pt-[calc(var(--navbar-height)+2.4rem)] sm:px-6 lg:px-10">
          <div className="flex flex-wrap items-end justify-between gap-4 rounded-3xl border border-slate-200/70 bg-white/80 px-6 py-5 shadow-xl shadow-slate-900/5 backdrop-blur">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                Ponto de Venda
              </p>
              <h1 className="mt-2 text-2xl font-semibold text-slate-900 lg:text-3xl">
                {nameUnit}
              </h1>
              <p className="mt-1 max-w-xl text-sm text-slate-500">
                Cliente: {nameClient}
              </p>
            </div>
            <div className="flex flex-col items-start gap-1 rounded-2xl bg-slate-900 px-4 py-3 text-white shadow-md shadow-slate-900/20 sm:flex-row sm:items-center sm:gap-3">
              <span className="text-xs font-medium uppercase tracking-widest text-white/70">
                Itens adicionados
              </span>
              <span className="text-2xl font-semibold leading-none">
                {itemsCount}
              </span>
            </div>
          </div>

          <div className="grid min-h-0 flex-1 gap-6 lg:grid-cols-[minmax(0,1.65fr)_minmax(340px,1fr)] xl:grid-cols-[minmax(0,1.8fr)_minmax(360px,1fr)]">
            <Steps saleId={saleId} />
            <aside className="lg:sticky lg:top-[calc(var(--navbar-height)+3rem)]">
              <SaleSummary saleId={saleId} />
            </aside>
          </div>
        </div>
      </div>
    </POSHydrate>
  )
}
