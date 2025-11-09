import { cn } from '@/lib/utils'
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Store,
  UserCircle,
  UserCheck,
} from 'lucide-react'
import type { ZTransaction } from '@/features/transactions/schemas'
import { buildTransactionNarrative } from '@/features/transactions/formatters'

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
          const narrative = buildTransactionNarrative(transaction)
          const actorName = narrative.actor?.name
          const affectedName = narrative.affectedUser?.name
          const showContextBadges =
            withContextBadge && (actorName || affectedName)
          const showContextFallback =
            withContextBadge && !actorName && !affectedName

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
                      {narrative.reasonLabel}
                    </p>
                    <p className="text-xs text-slate-500">{formattedDate}</p>
                    {narrative.description && (
                      <p className="mt-1 break-words text-xs text-slate-500">
                        {narrative.description}
                      </p>
                    )}
                    {showContextBadges && (
                      <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-500">
                        {actorName && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1">
                            <UserCircle className="h-3.5 w-3.5 text-slate-400" />
                            <span className="font-medium text-slate-600">
                              {actorName}
                            </span>
                            <span className="hidden sm:inline text-slate-400">
                              • responsável
                            </span>
                          </span>
                        )}
                        {affectedName && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1">
                            <UserCheck className="h-3.5 w-3.5 text-slate-400" />
                            <span className="font-medium text-slate-600">
                              {affectedName}
                            </span>
                            <span className="hidden sm:inline text-slate-400">
                              • impactado
                            </span>
                          </span>
                        )}
                      </div>
                    )}
                    {showContextFallback && (
                      <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-500">
                        <Store className="h-3.5 w-3.5 text-slate-400" />
                        <span className="font-medium text-slate-600">
                          Movimentação da unidade
                        </span>
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
                    {narrative.typeLabel}
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
