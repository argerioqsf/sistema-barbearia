'use client'

import { useEffect, useState } from 'react'
import { TitleForm } from '@/components/atoms'
import { ZSale } from '@/features/sales/schemas'
import { ZUser } from '@/features/users/schemas'
import { SaleItem } from '@/components/molecules/SaleItem'
import { listUsersAllAction } from '@/actions/user'
import { onUnauthorizedDefault } from '@/shared/errors/onUnauthorized'

interface SaleItemsListProps {
  sale: ZSale
}

export function SaleItemsList({ sale }: SaleItemsListProps) {
  const [barbers, setBarbers] = useState<ZUser[]>([])
  useEffect(() => {
    async function fetchBarbers() {
      const result = await listUsersAllAction()
      console.log('result fetchBarbers:', result)
      if (!result.ok) {
        if (result.error.type === 'http' && result.error.status === 401) {
          onUnauthorizedDefault()
        }
      } else {
        setBarbers(result.data)
      }
    }
    fetchBarbers()
  }, [])

  console.log('sale:', sale)
  if (sale.items.length === 0) {
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
            saleId={sale.id}
          />
        ))}
      </div>
    </div>
  )
}
