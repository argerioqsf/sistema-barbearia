'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import {
  DataListEmptyState,
  DataListTable,
  type DataListColumn,
} from '@/components/organisms/DataList'
import { buttonVariants } from '@/components/ui/button-variants'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { ZSale } from '@/features/sales/schemas'

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

const dateTimeFormatter = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})

const paymentStatusLabels: Record<ZSale['paymentStatus'], string> = {
  PENDING: 'Pendente',
  PAID: 'Pago',
}

const saleStatusLabels: Record<ZSale['status'], string> = {
  COMPLETED: 'Concluída',
  CANCELLED: 'Cancelada',
  CREATED: 'Criada',
  IN_PROGRESS: 'Em andamento',
}

const paymentStatusBadgeVariant: Record<
  ZSale['paymentStatus'],
  'default' | 'secondary' | 'destructive' | 'outline'
> = {
  PAID: 'default',
  PENDING: 'secondary',
}

const saleStatusBadgeVariant: Record<
  ZSale['status'],
  'default' | 'secondary' | 'destructive' | 'outline'
> = {
  COMPLETED: 'default',
  IN_PROGRESS: 'secondary',
  CREATED: 'secondary',
  CANCELLED: 'destructive',
}

type SalesTableProps = {
  sales: ZSale[]
  searchTerm?: string
}

export function SalesTable({ sales, searchTerm }: SalesTableProps) {
  const pathname = usePathname()
  const basePath = useMemo(() => {
    if (!pathname) return '/point-of-sale'
    const segments = pathname.split('/').filter(Boolean)
    const localeSegment = segments[0]
    return localeSegment ? `/${localeSegment}/point-of-sale` : '/point-of-sale'
  }, [pathname])

  const columns: DataListColumn<ZSale>[] = useMemo(
    () => [
      {
        key: 'createdAt',
        header: 'Abertura',
        render: (sale) => (
          <div className="flex flex-col">
            <span className="font-semibold text-slate-900">
              {dateTimeFormatter.format(new Date(sale.createdAt))}
            </span>
            <span className="font-mono text-xs text-slate-500">{sale.id}</span>
          </div>
        ),
      },
      {
        key: 'client',
        header: 'Cliente',
        render: (sale) => (
          <div className="flex flex-col">
            <span className="font-medium text-slate-900">
              {sale.client?.name ?? 'Cliente não informado'}
            </span>
            {sale.user?.name && (
              <span className="text-xs text-slate-500">
                Responsável: {sale.user.name}
              </span>
            )}
          </div>
        ),
      },
      {
        key: 'status',
        header: 'Status',
        hideOnMobile: true,
        render: (sale) => (
          <Badge variant={saleStatusBadgeVariant[sale.status]}>
            {saleStatusLabels[sale.status]}
          </Badge>
        ),
      },
      {
        key: 'paymentStatus',
        header: 'Pagamento',
        render: (sale) => (
          <Badge variant={paymentStatusBadgeVariant[sale.paymentStatus]}>
            {paymentStatusLabels[sale.paymentStatus]}
          </Badge>
        ),
      },
      {
        key: 'total',
        header: 'Total',
        align: 'right',
        render: (sale) => currencyFormatter.format(sale.total ?? 0),
      },
      {
        key: 'actions',
        header: 'Ações',
        align: 'right',
        render: (sale) => (
          <div className="flex flex-wrap items-center justify-end gap-2">
            <Link
              href={`${basePath}/${sale.id}`}
              className={cn(
                buttonVariants({ variant: 'outline', size: 'sm' }),
                'rounded-full',
              )}
            >
              Continuar
            </Link>
          </div>
        ),
      },
    ],
    [basePath],
  )

  if (sales.length === 0) {
    return (
      <DataListEmptyState
        title="Nenhuma venda encontrada."
        description={
          searchTerm
            ? 'Ajuste a busca ou limpe os filtros para ver todas as vendas.'
            : 'Inicie uma nova venda para registrá-la aqui.'
        }
      />
    )
  }

  return (
    <DataListTable
      items={sales}
      columns={columns}
      getRowId={(sale) => sale.id}
    />
  )
}
