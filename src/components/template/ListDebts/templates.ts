import { InfoList } from '@/types/general'
import type { ZDebt as Debt } from '@/features/debts/schemas'

export const infoList: InfoList<Debt> = {
  itemsHeader: ['N', 'ID', '', '', ''],
  itemsList: ['id', '', '', '', ''],
}
