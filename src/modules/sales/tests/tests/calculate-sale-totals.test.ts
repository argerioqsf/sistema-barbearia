import { describe, expect, it } from 'vitest'
import { calculateSaleTotals, Sale, type SaleDTO } from '@/modules/sales/domain'

const saleDto: SaleDTO = {
  id: 'sale-123',
  gross_value: 180,
  total: 170,
  status: 'CREATED',
  completionDate: null,
  items: [
    {
      id: '1',
      saleId: 'sale-123',
      price: 50,
      quantity: 2,
      customPrice: null,
      serviceId: null,
      productId: null,
      appointmentId: null,
      planId: null,
      barberId: null,
      couponId: null,
      porcentagemBarbeiro: null,
      commissionPaid: false,
      service: null,
      product: null,
      plan: null,
      barber: null,
      coupon: null,
      discounts: [],
      couponCode: null,
    },
    {
      id: '2',
      saleId: 'sale-123',
      price: 80,
      quantity: 1,
      customPrice: 70,
      serviceId: null,
      productId: null,
      appointmentId: null,
      planId: null,
      barberId: null,
      couponId: null,
      porcentagemBarbeiro: null,
      commissionPaid: false,
      service: null,
      product: null,
      plan: null,
      barber: null,
      coupon: null,
      discounts: [
        {
          id: 'discount-1',
          type: 'VALUE',
          amount: 10,
          origin: 'VALUE_SALE_ITEM',
          order: 1,
          saleItemId: '2',
        },
      ],
      couponCode: null,
    },
  ],
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
  session: null,
}

describe('calculateSaleTotals', () => {
  it('computes gross/net/discount/counter correctly', () => {
    const sale = Sale.fromDTO(saleDto)
    const totals = calculateSaleTotals(sale)
    expect(totals.gross).toBe(180)
    expect(totals.net).toBe(170)
    expect(totals.discount).toBe(10)
    expect(totals.itemCount).toBe(3)
  })
})
