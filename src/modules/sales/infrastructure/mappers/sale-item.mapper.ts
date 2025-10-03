import { ZSaleItem } from '@/features/saleItems/schema'
import { SaleItem } from '@/modules/sales/domain'

export function mapSaleItemsFromApi(payload?: ZSaleItem[]) {
  return (payload ?? []).map((item) => SaleItem.fromDTO(item))
}
