import { PageCard, PageCardContent } from '@/components/ui/page-card'
import { SectionHeader } from '@/components/ui/section-header'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import type { CollaboratorMetrics } from '../utils'

const numberFormatter = new Intl.NumberFormat('pt-BR')

type Props = {
  collaborator: {
    name?: string | null
    email?: string | null
    role?: string | null
  }
  totalBalance: number
  metrics: CollaboratorMetrics
  soldItemsCount: number
  transactionsCount: number
  currencyFormatter: Intl.NumberFormat
}

function initialsFromName(name?: string): string {
  if (!name) return 'C'
  const parts = name.trim().split(' ')
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase()
  const first = parts[0]?.[0] ?? ''
  const last = parts[parts.length - 1]?.[0] ?? ''
  return `${first}${last}`.toUpperCase()
}

function MetricTile({
  label,
  value,
  variant = 'default',
}: {
  label: string
  value: string
  variant?: 'default' | 'positive' | 'info'
}) {
  const variantClasses = {
    default: 'bg-white border border-slate-200/80',
    positive: 'bg-emerald-50/80 text-emerald-700 border border-emerald-200/80',
    info: 'bg-slate-900/5 text-slate-600 border border-slate-200/70',
  } as const

  return (
    <div
      className={`rounded-2xl px-4 py-5 shadow-inner ${variantClasses[variant]}`}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-lg font-semibold text-slate-900">{value}</p>
    </div>
  )
}

export default function OverviewCard({
  collaborator,
  totalBalance,
  metrics,
  soldItemsCount,
  transactionsCount,
  currencyFormatter,
}: Props) {
  const name = collaborator.name ?? 'Colaborador'
  const email = collaborator.email ?? undefined
  const role = collaborator.role ?? 'Colaborador'
  const additionsLabel = currencyFormatter.format(metrics.additions ?? 0)
  const withdrawalsLabel = currencyFormatter.format(metrics.withdrawals ?? 0)
  const balanceLabel = currencyFormatter.format(totalBalance ?? 0)
  const soldItemsLabel = numberFormatter.format(soldItemsCount)
  const transactionsLabel = numberFormatter.format(transactionsCount)
  const netLabel = currencyFormatter.format(metrics.net ?? 0)
  const netVariant: 'positive' | 'info' =
    (metrics.net ?? 0) >= 0 ? 'positive' : 'info'

  return (
    <PageCard>
      <PageCardContent>
        <SectionHeader
          label="Monitoramento"
          title="Resumo do colaborador"
          description="Acompanhe seus ganhos, movimentações financeiras e desempenho de vendas."
        />

        <div className="mt-6 grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <div className="flex min-w-0 flex-col gap-4 rounded-3xl border border-slate-200/80 bg-gradient-to-br from-primary/10 via-white to-white px-5 py-6 shadow-inner">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 bg-primary text-primary-foreground">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {initialsFromName(name)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="truncate text-lg font-semibold text-slate-900">
                  {name}
                </p>
                <p className="truncate text-sm text-slate-500">
                  {email ?? role}
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Saldo atual
              </p>
              <p className="mt-2 text-3xl font-bold text-slate-900">
                {balanceLabel}
              </p>
              <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-500">
                <span className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
                  {transactionsLabel} movimentações
                </span>
                <span className="rounded-full bg-slate-900/5 px-3 py-1 font-medium text-slate-600">
                  {soldItemsLabel} itens vendidos
                </span>
              </div>
            </div>
          </div>

          <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
            <MetricTile
              label="Entradas"
              value={additionsLabel}
              variant="positive"
            />
            <MetricTile label="Saídas" value={withdrawalsLabel} />
            <MetricTile
              label="Ganho líquido"
              value={netLabel}
              variant={netVariant}
            />
            <MetricTile
              label="Movimentações"
              value={transactionsLabel}
              variant="info"
            />
          </div>
        </div>
      </PageCardContent>
    </PageCard>
  )
}
