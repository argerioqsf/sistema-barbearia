import type { CollaboratorSaleItem } from '@/features/collaborators/schemas'
import type { ZTransaction } from '@/features/transactions/schemas'

export type CollaboratorMetrics = {
  additions: number
  withdrawals: number
  net: number
}

export type PreparedSaleItem = {
  id: string
  name: string
  quantity: number
  total: number
}

export function buildCollaboratorMetrics(
  transactions: readonly ZTransaction[] = [],
): CollaboratorMetrics {
  const metrics = transactions.reduce<CollaboratorMetrics>(
    (acc, txn) => {
      const value = txn.amount ?? 0
      if (txn.type === 'ADDITION') {
        acc.additions += value
      } else if (txn.type === 'WITHDRAWAL') {
        acc.withdrawals += value
      }
      return acc
    },
    { additions: 0, withdrawals: 0, net: 0 },
  )
  metrics.net = metrics.additions - metrics.withdrawals
  return metrics
}

export function enrichSaleItems(
  items: readonly CollaboratorSaleItem[] = [],
  limit = 8,
): PreparedSaleItem[] {
  return items
    .map((item, index) => ({
      id: item.id ?? `${index}`,
      name: item.name?.trim() || `Item ${index + 1}`,
      quantity: item.quantity ?? 0,
      total: item.total ?? 0,
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, limit)
}

export function selectRecentTransactions(
  transactions: readonly ZTransaction[] = [],
  limit = 12,
) {
  return [...transactions]
    .sort((a, b) => {
      const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0
      const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0
      return bTime - aTime
    })
    .slice(0, limit)
}
