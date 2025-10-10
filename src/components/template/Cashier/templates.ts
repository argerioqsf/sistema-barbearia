import { ZCashSession } from '@/features/cash-session/schemas'
import { InfoList } from '@/types/general'

export type CashSessionListItem = Omit<ZCashSession, 'initialAmount'> & {
  initialAmount: string
}

export const infoListCashSessions: InfoList<CashSessionListItem> = {
  title: 'Histórico de caixas',
  itemsHeader: ['N', 'Aberto em', 'Inicial', 'Final'],
  itemsList: ['openedAt', '', 'initialAmount', 'finalAmount', ''],
}
