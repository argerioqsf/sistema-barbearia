'use client'

import type { ZService } from '@/features/services/schemas'
import {
  DataListEmptyState,
  DataListTable,
  type DataListColumn,
} from '@/components/organisms/DataList'
import { buttonVariants } from '@/components/ui/button-variants'
import Link from 'next/link'
import { DeleteServiceButton } from './DeleteServiceButton'

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

const columns: DataListColumn<ZService>[] = [
  {
    key: 'name',
    header: 'Serviço',
    render: (service) => (
      <div className="flex flex-col">
        <span className="font-semibold text-slate-900">{service.name}</span>
        {service.description && (
          <span className="truncate text-xs text-slate-500">
            {service.description}
          </span>
        )}
      </div>
    ),
  },
  {
    key: 'defaultTime',
    header: 'Duração',
    align: 'center',
    render: (service) =>
      service.defaultTime ? `${service.defaultTime} min` : '—',
  },
  {
    key: 'price',
    header: 'Preço',
    render: (service) => currencyFormatter.format(service.price ?? 0),
  },
  {
    key: 'cost',
    header: 'Custo',
    hideOnMobile: true,
    render: (service) => currencyFormatter.format(service.cost ?? 0),
  },
  {
    key: 'commissionPercentage',
    header: 'Comissão',
    hideOnMobile: true,
    render: (service) =>
      service.commissionPercentage ? `${service.commissionPercentage}%` : '-',
  },
  {
    key: 'actions',
    header: 'Ações',
    align: 'right',
    render: (service) => (
      <div className="flex flex-wrap items-center justify-end gap-2">
        <Link
          href={`/dashboard/services/detail/${service.id}`}
          className={
            (buttonVariants({ variant: 'outline', size: 'sm' }), 'rounded-full')
          }
        >
          Editar
        </Link>
        <DeleteServiceButton serviceId={service.id} />
      </div>
    ),
  },
]

type ServiceTableProps = {
  services: ZService[]
}

export function ServiceTable({ services }: ServiceTableProps) {
  if (services.length === 0) {
    return (
      <DataListEmptyState
        title="Nenhum serviço encontrado."
        description="Use a busca ou cadastre um novo serviço."
      />
    )
  }

  return (
    <DataListTable
      items={services}
      columns={columns}
      getRowId={(service) => service.id}
    />
  )
}
