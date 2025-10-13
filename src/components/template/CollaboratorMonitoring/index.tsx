import { getCollaboratorDashboard } from '@/actions/collaborator-dashboard'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import { ErrorRequestHandler } from '@/components/organisms/ErrorRequestHandler'
import OverviewCard from './components/OverviewCard'
import SalesListCard from './components/SalesListCard'
import TransactionsCard from './components/TransactionsCard'
import {
  buildCollaboratorMetrics,
  enrichSaleItems,
  selectRecentTransactions,
} from './utils'
import { authOptions } from '@/auth/options'
import { getServerSession } from 'next-auth'

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export default async function CollaboratorMonitoring() {
  const [session, dashboard] = await Promise.all([
    getServerSession(authOptions),
    getCollaboratorDashboard(),
  ])

  if (!dashboard.ok) {
    return <ErrorRequestHandler result={dashboard} />
  }

  const { totalBalance, saleItems, transactions } = dashboard.data

  const metrics = buildCollaboratorMetrics(transactions)
  const topSaleItems = enrichSaleItems(saleItems)
  const recentTransactions = selectRecentTransactions(transactions)

  return (
    <ContainerDashboard>
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-100 via-white to-slate-100 text-foreground">
        <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col gap-6 px-4 pb-12 pt-10 sm:px-6 lg:px-10">
          <div className="w-full">
            <Breadcrumb />
          </div>

          <OverviewCard
            collaborator={{
              name: session?.user?.name,
              email: session?.user?.email,
              role: session?.user?.profile?.role?.name,
            }}
            totalBalance={totalBalance}
            metrics={metrics}
            soldItemsCount={saleItems.length}
            transactionsCount={transactions.length}
            currencyFormatter={currencyFormatter}
          />

          <div className="grid min-h-0 flex-1 gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(340px,1fr)] xl:grid-cols-[minmax(0,1.7fr)_minmax(360px,1fr)]">
            <div className="grid min-w-0 gap-6">
              <TransactionsCard
                transactions={recentTransactions}
                currencyFormatter={currencyFormatter}
              />
            </div>
            <aside className="grid min-w-0 gap-6 h-fit lg:sticky lg:top-[calc(var(--navbar-height)+3rem)]">
              <SalesListCard
                items={topSaleItems}
                currencyFormatter={currencyFormatter}
              />
            </aside>
          </div>
        </div>
      </div>
    </ContainerDashboard>
  )
}
