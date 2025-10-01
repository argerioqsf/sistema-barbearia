import { describe, expect, it } from 'vitest'
import { SaleItem } from '@/modules/sales/domain'
import type { SaleItemDTO } from '@/modules/sales/domain'
import type { OriginsDiscount } from '@/features/discounts/schema'

const baseItem: SaleItemDTO = {
  id: 'item-1',
  saleId: 'sale-1',
  serviceId: null,
  productId: null,
  quantity: 1,
  barberId: null,
  appointmentId: null,
  couponId: null,
  planId: null,
  price: 100,
  customPrice: null,
  porcentagemBarbeiro: null,
  commissionPaid: false,
  service: null,
  product: null,
  plan: null,
  barber: null,
  coupon: null,
  appointment: null,
  discounts: [],
  couponCode: null,
}

describe('SaleItem entity', () => {
  it('enforces minimum quantity', () => {
    expect(() => SaleItem.create({ ...baseItem, quantity: 0 })).toThrowError()
  })

  it('calculates discounted value with origins', () => {
    const discounts: SaleItemDTO['discounts'] = [
      {
        id: 'd1',
        type: 'VALUE',
        amount: 10,
        origin: 'COUPON_SALE_ITEM',
        order: 1,
        saleItemId: 'item-1',
      },
      {
        id: 'd2',
        type: 'PERCENTAGE',
        amount: 10,
        origin: 'COUPON_SALE_ITEM',
        order: 2,
        saleItemId: 'item-1',
      },
    ]
    const item = SaleItem.create({ ...baseItem, discounts })
    const value = item
      .calculateRealValue(['COUPON_SALE_ITEM' as OriginsDiscount])
      .toFloat()
    expect(value).toBe(81)
  })

  it('updates saleId when necessary', () => {
    const item = SaleItem.create(baseItem)
    const updated = item.withSaleId('sale-2')
    expect(updated.saleId).toBe('sale-2')
  })

  it('applies coupon metadata', () => {
    const item = SaleItem.create(baseItem)
    const updated = item.withCoupon({ couponCode: 'PROMO10', couponId: 'c1' })
    expect(updated.toDTO()).toMatchObject({
      couponCode: 'PROMO10',
      couponId: 'c1',
    })
  })
})
