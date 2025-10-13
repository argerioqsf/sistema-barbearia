import { describe, expect, it, vi } from 'vitest'
import { createSale } from '@/modules/sales/application/commands/create-sale'
import type { SalesGatewayPort } from '@/modules/sales/application/ports/sales-gateway.port'
import { Sale } from '@/modules/sales/domain'
import type { SaleDTO } from '@/modules/sales/domain'
// TODO: nao deveria esta em um lugar mais generico, para ser usado por outros testes?
const sampleSaleDto: SaleDTO = {
  id: 'sale-123',
  gross_value: 0,
  total: 0,
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
  status: 'CREATED',
  completionDate: null,
  session: null,
}
const sampleSale = Sale.fromDTO(sampleSaleDto)

describe('createSale use case', () => {
  it('validates payload and delegates to gateway', async () => {
    const fakeGateway: SalesGatewayPort = {
      getSale: vi.fn(),
      createSale: vi.fn().mockResolvedValue(sampleSale),
      addItem: vi.fn(),
      removeItem: vi.fn(),
      updateClient: vi.fn(),
      applyCoupon: vi.fn(),
      removeCoupon: vi.fn(),
      paySale: vi.fn(),
      updateSaleItemCoupon: vi.fn(),
      updateSaleItemQuantity: vi.fn(),
      updateSaleItemCustomPrice: vi.fn(),
      updateSaleItemBarber: vi.fn(),
      updatePaymentMethod: vi.fn(),
    }

    const payload = {
      clientId: 'c1d7f6d2-8f2c-4f3a-a7fd-1d9cbe2f31ca',
      observation: 'Venda POS',
    }

    const result = await createSale(payload, { gateway: fakeGateway })
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(fakeGateway.createSale).toHaveBeenCalledWith(
        expect.objectContaining({ clientId: payload.clientId, method: 'CASH' }),
      )
      expect(result.value).toEqual(sampleSaleDto)
    }
  })

  it('returns validation error when payload is invalid', async () => {
    const result = await createSale({ clientId: 'invalid' })
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error.type).toBe('validation')
    }
  })
})
