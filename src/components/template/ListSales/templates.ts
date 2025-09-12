import { InfoList } from '@/types/general'
import type { ZSale as Sale } from '@/features/sales/schemas'

export const infoList: InfoList<Sale> = {
  itemsHeader: ['N', 'ID', '', '', ''],
  itemsList: ['id', '', '', '', ''],
}
