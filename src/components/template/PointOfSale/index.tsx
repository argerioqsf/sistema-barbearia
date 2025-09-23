import { getSale } from '@/actions/sale'
import { Steps } from './components/steps'
import { SaleSummary } from './components/sale-summary'
import { SaleItemsList } from '@/components/organisms/SaleItemsList'
import { ErrorRequestHandler } from '@/components/organisms/ErrorRequestHandler'

interface PointOfSaleProps {
  id: string
}

export default async function PointOfSale({ id }: PointOfSaleProps) {
  const saleId = id
  const result = await getSale(saleId)
  if (!result.ok) {
    return <ErrorRequestHandler result={result} />
  }
  const sale = result.data
  return (
    <div className="flex lg:h-screen flex-col bg-white p-8 pt-[calc(var(--navbar-height)+2rem)] text-foreground">
      <div className="grid max-w-7xl flex-1 grid-cols-1 gap-4 overflow-hidden lg:grid-cols-12 lg:gap-8">
        <Steps sale={sale} />
        <div className="lg:col-span-4 flex flex-col lg:h-[calc(100vh-var(--navbar-height)-4rem)] gap-6">
          <SaleSummary sale={sale} />
          <SaleItemsList sale={sale} />
        </div>
      </div>
    </div>
  )
}
