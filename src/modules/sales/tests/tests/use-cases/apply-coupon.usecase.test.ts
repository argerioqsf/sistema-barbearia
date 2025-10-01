import { describe, expect, it, vi } from 'vitest'
import {
  applyCoupon,
  removeCoupon,
} from '@/modules/sales/application/commands/apply-coupon'
import type { SalesGatewayPort } from '@/modules/sales/application/ports/sales-gateway.port'
import { Sale } from '@/modules/sales/domain'
import type { SaleDTO } from '@/modules/sales/domain'

const saleDto: SaleDTO = {
  id: 'sale-1',
  gross_value: 100,
  total: 90,
  items: [],
  coupon: null,
  userId: 'user-1',
  clientId: 'client-1',
  unitId: 'unit-1',
  sessionId: 'session-1',
  couponId: null,
  method: 'CASH',
  paymentStatus: 'PENDING',
  createdAt: '2024-01-01T00:00:00.000Z',
  observation: null,
  client: null,
  transactions: [],
  user: null,
  session: null,
}

const sale = Sale.fromDTO(saleDto)

function buildGateway(
  overrides: Partial<SalesGatewayPort> = {},
): SalesGatewayPort {
  const base: Partial<SalesGatewayPort> = {
    getSale: vi.fn(async () => sale),
    createSale: vi.fn(async () => sale),
    addItem: vi.fn(async () => sale),
    removeItem: vi.fn(async () => sale),
    updateClient: vi.fn(async () => sale),
    applyCoupon: vi.fn(async () => sale),
    removeCoupon: vi.fn(async () => sale),
    paySale: vi.fn(async () => sale),
    updateSaleItemCoupon: vi.fn(async () => sale),
    updateSaleItemQuantity: vi.fn(async () => sale),
    updateSaleItemCustomPrice: vi.fn(async () => sale),
    updateSaleItemBarber: vi.fn(async () => sale),
  }
  return { ...base, ...overrides } as SalesGatewayPort
}

describe('applyCoupon use case', () => {
  it('calls gateway with parsed DTO', async () => {
    const gateway = buildGateway({})
    const result = await applyCoupon(
      {
        saleId: 'c1d7f6d2-8f2c-4f3a-a7fd-1d9cbe2f31ca',
        couponCode: 'PROMO10',
      },
      { gateway },
    )
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(gateway.applyCoupon).toHaveBeenCalled()
    }
  })

  it('validates coupon removal DTO', async () => {
    const gateway = buildGateway({})
    const result = await removeCoupon(
      {
        saleId: 'c1d7f6d2-8f2c-4f3a-a7fd-1d9cbe2f31ca',
      },
      { gateway },
    )
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(gateway.removeCoupon).toHaveBeenCalled()
    }
  })

  it('returns validation error when couponCode is empty', async () => {
    const gateway = buildGateway({})
    const result = await applyCoupon(
      {
        saleId: 'c1d7f6d2-8f2c-4f3a-a7fd-1d9cbe2f31ca',
        couponCode: '',
      },
      { gateway },
    )
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error.type).toBe('validation')
    }
  })
})
