import { QueryClient, dehydrate } from '@tanstack/react-query'
import { ErrorRequestHandler } from '@/components/organisms/ErrorRequestHandler'
import { getSale } from '@/modules/sales/application'
import { qk } from '@/shared/query-keys'
import { Steps } from '@/modules/sales-pos/ui/components/organisms/PointOfSaleSteps'
import { SaleSummary } from '@/modules/sales-pos/ui/components/organisms/SaleSummary'
import { SaleItemsList } from '@/modules/sales-pos/ui/components/organisms/SaleItemsList'
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
  queryClient.setQueryData(qk.sales.byId(saleId), result.value)
  const dehydratedState = dehydrate(queryClient)

  return (
    <POSHydrate state={dehydratedState}>
      <div className="flex lg:h-screen flex-col bg-white p-8 pt-[calc(var(--navbar-height)+2rem)] text-foreground">
        <div className="grid max-w-7xl flex-1 grid-cols-1 gap-4 overflow-hidden lg:grid-cols-12 lg:gap-8">
          <Steps saleId={saleId} />
          <div className="lg:col-span-4 flex flex-col lg:h-[calc(100vh-var(--navbar-height)-4rem)] gap-6">
            <SaleSummary saleId={saleId} />
            <SaleItemsList saleId={saleId} />
          </div>
        </div>
      </div>
    </POSHydrate>
  )
}
