/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, expect, it } from 'vitest'
import { getSale } from '@/modules/sales/application/queries/get-sale'
import type { SalesGatewayPort } from '@/modules/sales/application/ports/sales-gateway.port'
import { Sale } from '@/modules/sales/domain'
import type { SaleDTO } from '@/modules/sales/domain'
import { UpdatePaymentMethodDTO } from '../../application/dto/update-payment-method.dto'

const sampleSaleDto: SaleDTO = {
  id: 'sale-1',
  gross_value: 100,
  total: 90,
  status: 'CREATED',
  completionDate: null,
  items: [
    {
      id: 'item-1',
      saleId: 'sale-1',
      price: 60,
      quantity: 1,
      customPrice: null,
      serviceId: null,
      productId: null,
      appointmentId: null,
      planId: null,
      barberId: null,
      couponId: null,
      porcentagemBarbeiro: null,
      commissionPaid: false,
      product: null,
      service: null,
      plan: null,
      barber: null,
      coupon: null,
      discounts: [],
      couponCode: null,
    },
    {
      id: 'item-2',
      saleId: 'sale-1',
      price: 40,
      quantity: 1,
      customPrice: 30,
      serviceId: null,
      productId: null,
      appointmentId: null,
      planId: null,
      barberId: null,
      couponId: null,
      porcentagemBarbeiro: null,
      commissionPaid: false,
      product: null,
      service: null,
      plan: null,
      barber: null,
      coupon: null,
      discounts: [],
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

const sampleSale = Sale.fromDTO(sampleSaleDto)

class FakeGateway implements SalesGatewayPort {
  async getSale(): Promise<Sale> {
    return sampleSale
  }

  async createSale(..._args: unknown[]): Promise<Sale> {
    throw new Error('not implemented')
  }

  async addItem(..._args: unknown[]): Promise<Sale> {
    throw new Error('not implemented')
  }

  async removeItem(..._args: unknown[]): Promise<Sale> {
    throw new Error('not implemented')
  }

  async updateClient(..._args: unknown[]): Promise<Sale> {
    throw new Error('not implemented')
  }

  async applyCoupon(..._args: unknown[]): Promise<Sale> {
    throw new Error('not implemented')
  }

  async removeCoupon(..._args: unknown[]): Promise<Sale> {
    throw new Error('not implemented')
  }

  async paySale(..._args: unknown[]): Promise<Sale> {
    throw new Error('not implemented')
  }

  async updateSaleItemCoupon(..._args: unknown[]): Promise<Sale> {
    throw new Error('not implemented')
  }

  async updateSaleItemQuantity(..._args: unknown[]): Promise<Sale> {
    throw new Error('not implemented')
  }

  async updateSaleItemCustomPrice(..._args: unknown[]): Promise<Sale> {
    throw new Error('not implemented')
  }

  async updateSaleItemBarber(..._args: unknown[]): Promise<Sale> {
    throw new Error('not implemented')
  }

  async updatePaymentMethod(input: UpdatePaymentMethodDTO): Promise<Sale> {
    throw new Error('not implemented')
  }
}

describe('getSale use case', () => {
  it('returns sale with calculated totals', async () => {
    const fakeGateway = new FakeGateway()
    const result = await getSale('b7b20ce2-41ac-4d38-8c5e-9f3df47a9ac5', {
      gateway: fakeGateway,
    })
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.value.sale.id).toBe('sale-1')
      expect(result.value.totals.gross).toBe(100)
      expect(result.value.totals.net).toBe(90)
      expect(result.value.totals.discount).toBe(10)
    }
  })
})
