import type { ZTransaction } from './schemas'

const REASON_LABELS: Record<ZTransaction['reason'], string> = {
  OTHER: 'Outros',
  UNIT_MAINTENANCE: 'Manutenção da unidade',
  LOAN: 'Empréstimo',
  CASH_OPENING: 'Abertura de caixa',
  PAY_LOAN: 'Pagamento de empréstimo',
  PAY_COMMISSION: 'Pagamento de comissão',
  PAY_PLAN_DEBT: 'Pagamento de plano',
  ADD_COMMISSION: 'Comissão adicionada',
}

const TYPE_LABELS: Record<ZTransaction['type'], 'Entrada' | 'Saída'> = {
  ADDITION: 'Entrada',
  WITHDRAWAL: 'Saída',
}

export type TransactionNarrative = {
  reasonLabel: string
  typeLabel: (typeof TYPE_LABELS)[ZTransaction['type']]
  isAddition: boolean
  description?: string
  actor?: NonNullable<ZTransaction['user']>
  affectedUser?: NonNullable<ZTransaction['affectedUser']>
}

export function getTransactionReasonLabel(
  reason: ZTransaction['reason'],
): string {
  return REASON_LABELS[reason] ?? 'Transação'
}

export function getTransactionTypeLabel(
  type: ZTransaction['type'],
): (typeof TYPE_LABELS)[ZTransaction['type']] {
  return TYPE_LABELS[type]
}

export function buildTransactionNarrative(
  transaction: ZTransaction,
): TransactionNarrative {
  return {
    reasonLabel: getTransactionReasonLabel(transaction.reason),
    typeLabel: getTransactionTypeLabel(transaction.type),
    isAddition: transaction.type === 'ADDITION',
    description: transaction.description ?? undefined,
    actor: transaction.user ?? undefined,
    affectedUser: transaction.affectedUser ?? undefined,
  }
}
