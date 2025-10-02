'use client'

import { TitleForm } from '@/components/atoms'
import { SaleItem } from '../SaleItem'
import { useSale } from '@/modules/sales-pos/ui/hooks/useSale'
import { useBarbersCatalog } from '@/modules/sales-pos/ui/hooks/useCatalog'
import type { ZUser } from '@/features/users/schemas'
import { cn } from '@/lib/utils'

interface SaleItemsListProps {
  saleId: string
  className?: string
}

export function SaleItemsList({ saleId, className }: SaleItemsListProps) {
  const { sale } = useSale(saleId)
  const { data: barbersData } = useBarbersCatalog()
  const barbers = (barbersData?.items as ZUser[] | undefined) ?? []
  const items = sale?.items ?? []

  if (!sale || items.length === 0) {
    return (
      <section
        className={cn(
          'flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white/90 p-6 text-slate-500 shadow-lg shadow-slate-900/10 backdrop-blur',
          className,
        )}
      >
        <div>
          <TitleForm
            title="Itens Selecionados"
            className="text-2xl font-semibold text-slate-900"
          />
          <p className="mt-2 text-sm text-slate-500">
            Adicione produtos ou serviços para visualizar o carrinho da venda.
          </p>
        </div>
        <div className="mt-10 flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/70 px-6 py-10 text-center text-sm">
          Nenhum item adicionado ainda.
        </div>
      </section>
    )
  }

  return (
    <section
      className={cn(
        'flex min-h-0 flex-col rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-lg shadow-slate-900/10 backdrop-blur',
        className,
      )}
    >
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <TitleForm
            title="Itens Selecionados"
            className="text-2xl font-semibold text-slate-900"
          />
          <p className="mt-1 text-xs uppercase tracking-wide text-slate-400">
            Ajuste quantidades, valores e colaboradores rapidamente.
          </p>
        </div>
        <span className="rounded-full bg-slate-900/5 px-3 py-1 text-xs font-medium text-slate-600">
          {items.length} {items.length === 1 ? 'item' : 'itens'}
        </span>
      </header>

      <div className="relative -mx-2 mt-4 flex-1 overflow-hidden">
        <div className="h-full space-y-4 overflow-y-auto px-2 pb-2">
          {items.map((saleItem) => (
            <SaleItem
              key={saleItem.id}
              saleItem={saleItem}
              barbers={barbers}
              saleId={saleId}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
