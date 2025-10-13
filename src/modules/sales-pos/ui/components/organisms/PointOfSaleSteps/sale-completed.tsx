import { ButtonStartNewSale } from '@/modules/sales-pos/ui/components/organisms/ButtonStartNewSale'
import type { GetSaleOutput } from '@/modules/sales/application/queries/get-sale'
import { CheckCircle2, Receipt } from 'lucide-react'
import { InfoTile } from './info-tile'
import { SummaryTile } from './summary-tile'
import { CelebrationOverlay } from './celebration-overlay'
import { Button } from '@/components/atoms'

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

const paymentMethodLabel: Record<
  NonNullable<GetSaleOutput['sale']['method']>,
  string
> = {
  PIX: 'PIX',
  CASH: 'Dinheiro',
  CREDIT_CARD: 'Cartão de crédito',
  DEBIT_CARD: 'Cartão de débito',
}

type SaleCompletedProps = {
  sale?: GetSaleOutput['sale']
  totals?: GetSaleOutput['totals']
  redirectBasePath: string
  goToDetails: () => void
}

export function SaleCompleted({
  sale,
  totals,
  redirectBasePath,
  goToDetails,
}: SaleCompletedProps) {
  const total = currencyFormatter.format(sale?.total ?? totals?.net ?? 0)
  const discount = currencyFormatter.format(totals?.discount ?? 0)
  const gross = currencyFormatter.format(
    totals?.gross ?? sale?.gross_value ?? 0,
  )
  const itemsCount = sale?.items?.length ?? totals?.itemCount ?? 0
  const clientName = sale?.client?.name ?? 'Cliente não informado'
  const paymentMethod = sale?.method
    ? paymentMethodLabel[sale.method]
    : 'Método não informado'

  return (
    <section className="relative z-0 flex min-h-0 flex-col overflow-hidden rounded-3xl border border-emerald-200/60 bg-white/90 shadow-xl shadow-emerald-500/10 backdrop-blur">
      <CelebrationOverlay />
      <div className="relative z-10 flex flex-col gap-6 px-6 py-8 text-slate-900 sm:px-10">
        <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:items-start sm:text-left">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/40">
            <CheckCircle2 className="h-8 w-8" />
          </span>
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-500">
              Venda Concluída
            </p>
            <h2 className="text-2xl font-semibold text-slate-900">
              Pagamento registrado com sucesso!
            </h2>
            <p className="text-sm text-slate-500">
              A venda foi finalizada e os dados financeiros foram atualizados.
              Confira um resumo rápido abaixo ou inicie uma nova venda.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200/80 bg-white/90 px-5 py-6 shadow-inner">
          <div className="grid gap-6 sm:grid-cols-2">
            <InfoTile label="Total recebido" value={total} highlight />
            <InfoTile label="Método de pagamento" value={paymentMethod} />
            <InfoTile
              label="Itens vendidos"
              value={`${itemsCount} ${itemsCount === 1 ? 'item' : 'itens'}`}
            />
            <InfoTile label="Cliente" value={clientName} />
          </div>
          <div className="my-6 h-px w-full bg-slate-200/80" />
          <div className="grid gap-4 sm:grid-cols-3">
            <SummaryTile
              label="Subtotal"
              value={gross}
              description="Valor bruto antes dos descontos"
            />
            <SummaryTile
              label="Descontos"
              value={discount}
              description="Cupons, promoções e ajustes"
            />
            <SummaryTile
              label="Total líquido"
              value={total}
              description="Valor final creditado"
              emphasize
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Receipt className="h-4 w-4 text-slate-400" />
            <span>
              ID da venda: <strong>{sale?.id ?? '--'}</strong>
            </span>
          </div>
          <ButtonStartNewSale
            redirectBasePath={redirectBasePath}
            className="mb-0 w-full max-w-xs py-3 text-base sm:text-lg"
          />
          <Button
            className="mb-0 w-full max-w-xs py-3 text-base sm:text-lg"
            onClick={goToDetails}
            variant="ghost"
          >
            ver detalhes
          </Button>
        </div>
      </div>
    </section>
  )
}
