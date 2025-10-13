import { cn } from '@/lib/utils'
import { ArrowDownCircle, ArrowUpCircle, Store, UserCircle } from 'lucide-react'
import type { ZTransaction } from '@/features/transactions/schemas'

const defaultCurrencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

const defaultDateFormatter = new Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'short',
  timeStyle: 'short',
})

type TransactionTimelineProps = {
  transactions?: ZTransaction[] | null
  currencyFormatter?: Intl.NumberFormat
  dateFormatter?: Intl.DateTimeFormat
  emptyMessage?: string
  className?: string
  withContextBadge?: boolean
}

export function TransactionTimeline({
  transactions,
  currencyFormatter = defaultCurrencyFormatter,
  dateFormatter = defaultDateFormatter,
  emptyMessage = 'Nenhuma transação encontrada.',
  className,
  withContextBadge = true,
}: TransactionTimelineProps) {
  const data = transactions ?? []
  const hasTransactions = data.length > 0

  return (
    <div className={cn('space-y-4', className)}>
      {hasTransactions ? (
        data.map((transaction) => {
          const isAddition = transaction.type === 'ADDITION'
          const Icon = isAddition ? ArrowUpCircle : ArrowDownCircle
          const amount = currencyFormatter.format(transaction.amount ?? 0)
          const formattedDate = transaction.createdAt
            ? dateFormatter.format(new Date(transaction.createdAt))
            : 'Sem data'
          const affectedUser = transaction.affectedUserId

          return (
            <div
              key={transaction.id}
              className="rounded-2xl border border-slate-200/80 bg-white px-4 py-4 shadow-sm"
            >
              <div className="grid gap-3 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center">
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${isAddition ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {transaction.description ?? 'Movimentação'}
                    </p>
                    <p className="text-xs text-slate-500">{formattedDate}</p>
                    {withContextBadge && (
                      <div className="mt-2 flex items-center gap-1 text-xs text-slate-500">
                        {affectedUser ? (
                          <UserCircle className="h-4 w-4 text-slate-400" />
                        ) : (
                          <Store className="h-4 w-4 text-slate-400" />
                        )}
                        <span>{affectedUser ? 'Usuário' : 'Unidade'}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-start gap-1 sm:items-end">
                  <span
                    className={`text-base font-semibold ${isAddition ? 'text-emerald-600' : 'text-rose-600'}`}
                  >
                    {amount}
                  </span>
                  <span className="text-xs uppercase tracking-wide text-slate-400">
                    {isAddition ? 'Entrada' : 'Saída'}
                  </span>
                </div>
              </div>
            </div>
          )
        })
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-200 px-4 py-10 text-center text-sm text-slate-500">
          {emptyMessage}
        </div>
      )}
    </div>
  )
}
