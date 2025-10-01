import type { SaleDTO } from '../entities/sale'
import { Sale } from '../entities/sale'

export interface SaleTotals {
  gross: number
  net: number
  discount: number
  itemCount: number
}

export function calculateSaleTotals(sale: Sale | SaleDTO): SaleTotals {
  const entity = sale instanceof Sale ? sale : Sale.create(sale)
  return entity.totals()
}
