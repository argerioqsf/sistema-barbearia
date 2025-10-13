import { Sale } from '@/modules/sales/domain'
import type { ZSale } from '@/features/sales/schemas'

export function mapSaleFromApi(payload: ZSale): Sale {
  return Sale.fromDTO(payload)
}

export function mapSalesFromApi(payload: ZSale[]): Sale[] {
  return (payload ?? []).map((item) => Sale.fromDTO(item))
}
