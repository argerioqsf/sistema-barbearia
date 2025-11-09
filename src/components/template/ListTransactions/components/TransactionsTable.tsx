'use client'

import type { ZTransaction } from '@/features/transactions/schemas'
import {
  DataListTable,
  type DataListColumn,
} from '@/components/organisms/DataList'
import { DataListEmptyState } from '@/components/organisms/DataList'
import { buildTransactionNarrative } from '@/features/transactions/formatters'
import { Store, UserCheck, UserCircle } from 'lucide-react'

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})

const columns: DataListColumn<ZTransaction>[] = [
  {
    key: 'description',
    header: 'Transação',
    render: (transaction) => {
      const narrative = buildTransactionNarrative(transaction)

      return (
        <div className="space-y-3">
          <span className="block text-sm font-semibold leading-tight text-slate-900">
            {narrative.reasonLabel}
          </span>
          {narrative.description && (
            <p className="text-xs text-slate-500">{narrative.description}</p>
          )}
        </div>
      )
    },
  },
  {
    key: 'user_affected',
    header: 'usuário impactado',
    render: (transaction) => {
      const narrative = buildTransactionNarrative(transaction)
      const affectedName = narrative.affectedUser?.name
      return (
        <div className="space-y-3">
          {affectedName ? (
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600">
              <UserCheck className="h-3.5 text-slate-400" />
              <span className="font-medium text-slate-600">{affectedName}</span>
            </span>
          ) : (
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600">
              <Store className="h-3.5 text-slate-400" />
              <span className="font-medium text-slate-600">
                Movimentação da unidade
              </span>
            </span>
          )}
        </div>
      )
    },
  },
  {
    key: 'responsible_user',
    header: 'Responsável',
    render: (transaction) => {
      const narrative = buildTransactionNarrative(transaction)
      const actorName = narrative.actor?.name
      const showFallback = !actorName

      return (
        <div className="space-y-2">
          {(actorName || showFallback) && (
            <div className="flex flex-col gap-1">
              {actorName && (
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600">
                  <UserCircle className="h-3.5 text-slate-400" />
                  <span className="font-medium text-slate-600">
                    {actorName}
                  </span>
                </span>
              )}
              {showFallback && (
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600">
                  <Store className="h-3.5 text-slate-400" />
                  <span className="font-medium text-slate-600">
                    Sem responsável definido
                  </span>
                </span>
              )}
            </div>
          )}
        </div>
      )
    },
  },
  {
    key: 'amount',
    header: 'Valor',
    align: 'right',
    render: (transaction) => {
      const narrative = buildTransactionNarrative(transaction)
      const hasAmount = typeof transaction.amount === 'number'
      const amountFormatted = hasAmount
        ? currencyFormatter.format(transaction.amount ?? 0)
        : '—'

      return (
        <div className="flex flex-col items-end gap-1 text-right">
          <span
            className={`text-sm font-semibold ${hasAmount ? (narrative.isAddition ? 'text-emerald-600' : 'text-rose-600') : 'text-slate-400'}`}
          >
            {amountFormatted}
          </span>
        </div>
      )
    },
  },
  {
    key: 'createdAt',
    header: 'Data',
    align: 'right',
    render: (transaction) => (
      <div className="flex flex-col items-end">
        <span className="text-sm text-slate-600">
          {transaction.createdAt
            ? dateFormatter.format(new Date(transaction.createdAt))
            : 'Sem data'}
        </span>
      </div>
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
