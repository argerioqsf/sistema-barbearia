'use client'

import type { ZProduct } from '@/features/products/schemas'
import Link from 'next/link'
import { DeleteProductButton } from './DeleteProductButton'
import {
  DataListEmptyState,
  DataListTable,
  type DataListColumn,
} from '@/components/organisms/DataList'
import { buttonVariants } from '@/components/ui/button-variants'
import { cn } from '@/lib/utils'

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

const columns: DataListColumn<ZProduct>[] = [
  {
    key: 'name',
    header: 'Produto',
    render: (product) => (
      <div className="flex flex-col">
        <span className="font-semibold text-slate-900">{product.name}</span>
        {product.description && (
          <span className="truncate text-xs text-slate-500">
            {product.description}
          </span>
        )}
      </div>
    ),
  },
  {
    key: 'quantity',
    header: 'Quantidade',
    align: 'center',
  },
  {
    key: 'price',
    header: 'Preço',
    render: (product) => currencyFormatter.format(product.price ?? 0),
  },
  {
    key: 'cost',
    header: 'Custo',
    hideOnMobile: true,
    render: (product) => currencyFormatter.format(product.cost ?? 0),
  },
  {
    key: 'commissionPercentage',
    header: 'Comissão',
    hideOnMobile: true,
    render: (product) =>
      product.commissionPercentage ? `${product.commissionPercentage}%` : '-',
  },
  {
    key: 'actions',
    header: 'Ações',
    align: 'right',
    render: (product) => (
      <div className="flex flex-wrap items-center justify-end gap-2">
        <Link
          href={`/dashboard/products/detail/${product.id}`}
          className={cn(
            buttonVariants({ variant: 'outline', size: 'sm' }),
            'rounded-full',
          )}
        >
          Editar
        </Link>
        <DeleteProductButton productId={product.id} />
      </div>
    ),
  },
]

type ProductTableProps = {
  products: ZProduct[]
}

export function ProductTable({ products }: ProductTableProps) {
  if (products.length === 0) {
    return (
      <DataListEmptyState
        title="Nenhum produto encontrado."
        description="Use a busca ou cadastre um novo produto."
      />
    )
  }

  return (
    <DataListTable
      items={products}
      columns={columns}
      getRowId={(product) => product.id}
    />
  )
}
