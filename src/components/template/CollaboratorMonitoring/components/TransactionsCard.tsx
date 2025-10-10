import { PageCard, PageCardContent } from '@/components/ui/page-card'
import { SectionHeader } from '@/components/ui/section-header'
import type { ZTransaction } from '@/features/transactions/schemas'
import { TransactionTimeline } from '@/components/molecules'

type Props = {
  transactions: ZTransaction[]
  currencyFormatter: Intl.NumberFormat
}

export default function TransactionsCard({
  transactions,
  currencyFormatter,
}: Props) {
  return (
    <PageCard>
      <PageCardContent>
        <SectionHeader
          label="Financeiro"
          title="Extrato recente"
          description="Movimentações financeiras ligadas à sua conta nos últimos registros."
        />

        <div className="mt-6">
          <TransactionTimeline
            transactions={transactions}
            currencyFormatter={currencyFormatter}
            withContextBadge={false}
            emptyMessage="Nenhuma movimentação encontrada ainda."
          />
        </div>
      </PageCardContent>
    </PageCard>
  )
}
