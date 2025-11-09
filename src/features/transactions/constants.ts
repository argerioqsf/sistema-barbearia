import type { ReasonTransaction } from './schemas'

export type TransactionReasonOption = {
  label: string
  value: ReasonTransaction
}

export const TRANSACTION_REASON_OPTIONS: TransactionReasonOption[] = [
  {
    value: 'UNIT_MAINTENANCE',
    label: 'Manutenção da Unidade',
  },
  {
    value: 'LOAN',
    label: 'Empréstimo',
  },
  {
    value: 'CASH_OPENING',
    label: 'Abertura de Caixa',
  },
  {
    value: 'PAY_LOAN',
    label: 'Pagamento de Empréstimo',
  },
  {
    value: 'PAY_COMMISSION',
    label: 'Pagamento de Comissão',
  },
  {
    value: 'PAY_PLAN_DEBT',
    label: 'Pagamento de Dívida de Plano',
  },
  {
    value: 'ADD_COMMISSION',
    label: 'Adição de Comissão',
  },
  {
    value: 'OTHER',
    label: 'Outro',
  },
]
