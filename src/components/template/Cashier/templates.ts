import { InfoList } from '@/types/general'

export type CashSessionListItem = {
  id: string
  openedAt?: string
  closedAt?: string
  initialAmount?: string
  finalAmount?: string
  status?: string
}

export const infoListCashSessions: InfoList<CashSessionListItem> = {
  title: 'Histórico de caixas',
  itemsHeader: ['N', 'Aberto em', 'Fechado em', 'Inicial', 'Final'],
  itemsList: ['openedAt', '', 'closedAt', 'initialAmount', 'finalAmount'],
}
