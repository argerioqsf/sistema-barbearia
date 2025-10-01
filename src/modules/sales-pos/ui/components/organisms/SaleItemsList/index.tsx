'use client'

import { TitleForm } from '@/components/atoms'
import { SaleItem } from '../SaleItem'
import { useSale } from '@/modules/sales-pos/ui/hooks/useSale'
import { useBarbersCatalog } from '@/modules/sales-pos/ui/hooks/useCatalog'
import type { ZUser } from '@/features/users/schemas'

interface SaleItemsListProps {
  saleId: string
}

export function SaleItemsList({ saleId }: SaleItemsListProps) {
  const { sale } = useSale(saleId)
  const { data: barbersData } = useBarbersCatalog()
  const barbers = (barbersData?.items as ZUser[] | undefined) ?? []

  if (!sale || sale.items.length === 0) {
    return (
      <div className="p-4 border rounded-lg">
        <TitleForm title="Itens Selecionados" />
        <p className="mt-4">Nenhum item adicionado.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-4 shadow-2xl sm:p-6 lg:min-h-0">
      <TitleForm
        title="Itens Selecionados"
        className="text-xl sm:text-2xl text-foreground mb-4 sm:mb-6"
      />
      <div className="sm:flex-1 space-y-4 sm:max-h-96 overflow-y-auto pr-2">
        {sale.items.map((saleItem) => (
          <SaleItem
            key={saleItem.id}
            saleItem={saleItem}
            barbers={barbers}
            saleId={saleId}
          />
        ))}
      </div>
    </div>
  )
}
