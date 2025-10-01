import type { ZSaleItems } from '@/features/saleItems/schema'
import { SaleItem } from '@/modules/sales/domain'

export function mapSaleItemsFromApi(payload?: ZSaleItems[]) {
  return (payload ?? []).map((item) => SaleItem.fromDTO(item))
}
