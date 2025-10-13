'use client'

import type { ZTransaction } from '@/features/transactions/schemas'
import {
  DataListTable,
  type DataListColumn,
} from '@/components/organisms/DataList'
import { DataListEmptyState } from '@/components/organisms/DataList'

const columns: DataListColumn<ZTransaction>[] = [
  {
    key: 'id',
    header: 'ID',
    render: (transaction) => (
      <span className="font-mono text-xs text-slate-500">{transaction.id}</span>
    ),
  },
  {
    key: 'type',
    header: 'Tipo',
    render: (transaction) => (
      <span className="font-semibold">{transaction.type}</span>
    ),
  },
  {
    key: 'amount',
    header: 'Valor',
    align: 'right',
    render: (transaction) => (
      <span>
        {transaction.amount
          ? new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(transaction.amount)
          : '-'}
      </span>
    ),
  },
  {
    key: 'createdAt',
    header: 'Data',
    render: (transaction) => (
      <span>
        {transaction.createdAt
          ? new Date(transaction.createdAt).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })
          : '-'}
      </span>
    ),
  },
]

type TransactionsTableProps = {
  transactions: ZTransaction[]
}

export function TransactionsTable({ transactions }: TransactionsTableProps) {
  if (transactions.length === 0) {
    return (
      <DataListEmptyState
        title="Nenhuma transação encontrada."
        description="Use a busca ou registre uma nova transação."
      />
    )
  }

  return (
    <DataListTable
      items={transactions}
      columns={columns}
      getRowId={(transaction) => transaction.id}
    />
  )
}
