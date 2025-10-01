import { describe, expect, it } from 'vitest'
import { mapSaleFromApi } from '@/modules/sales/infrastructure/mappers/sale.mapper'
import { Sale } from '@/modules/sales/domain'
import type { SaleDTO } from '@/modules/sales/domain'

const apiSale: SaleDTO = {
  id: 'sale-1',
  gross_value: 120,
  total: 100,
  items: [],
  userId: 'user-1',
  clientId: 'client-1',
  unitId: 'unit-1',
  sessionId: 'session-1',
  couponId: null,
  method: 'CASH',
  paymentStatus: 'PENDING',
  createdAt: '2024-01-01T00:00:00.000Z',
  observation: null,
  coupon: null,
  client: null,
  transactions: [],
  user: null,
}

describe('sale mapper', () => {
  it('mapeia payload da API para entidade de domínio', () => {
    const domainSale = mapSaleFromApi(apiSale)
    expect(domainSale).toBeInstanceOf(Sale)
    expect(domainSale.toDTO()).toEqual(apiSale)
  })
})
