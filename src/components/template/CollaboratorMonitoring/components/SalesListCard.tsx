import { PageCard, PageCardContent } from '@/components/ui/page-card'
import { SectionHeader } from '@/components/ui/section-header'
import type { PreparedSaleItem } from '../utils'

type Props = {
  items: PreparedSaleItem[]
  currencyFormatter: Intl.NumberFormat
}

export default function SalesListCard({ items, currencyFormatter }: Props) {
  const hasItems = items.length > 0

  return (
    <PageCard>
      <PageCardContent>
        <SectionHeader
          label="Vendas"
          title="Itens vendidos"
          description="Resumo agregado dos produtos e serviços atribuídos a você."
        />

        <div className="mt-6 min-w-0 overflow-x-auto">
          <div className="min-w-[520px] overflow-hidden rounded-2xl border border-slate-200/80">
            <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)] gap-2 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <span>Item</span>
              <span className="text-right">Quantidade</span>
              <span className="text-right">Total</span>
            </div>
            {hasItems ? (
              <div className="divide-y divide-slate-200/80">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)] items-center gap-2 px-4 py-3 text-sm text-slate-600"
                  >
                    <span className="truncate font-medium text-slate-900">
                      {item.name}
                    </span>
                    <span className="text-right font-medium text-slate-600">
                      {item.quantity}
                    </span>
                    <span className="text-right font-semibold text-slate-900">
                      {currencyFormatter.format(item.total ?? 0)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-4 py-6 text-sm text-slate-500">
                Nenhum item vendido encontrado.
              </div>
            )}
          </div>
        </div>
      </PageCardContent>
    </PageCard>
  )
}
