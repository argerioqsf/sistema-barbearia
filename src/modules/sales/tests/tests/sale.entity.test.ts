import { describe, expect, it } from 'vitest'
import { Sale, SaleItem } from '@/modules/sales/domain'
import type { SaleDTO } from '@/modules/sales/domain'
import { Money } from '@/shared/domain/value-objects/money'

const makeSale = (overrides: Partial<SaleDTO> = {}) => {
  const base: SaleDTO = {
    id: 'sale-1',
    gross_value: 0,
    total: 0,
    items: [],
    userId: 'user-1',
    clientId: 'client-1',
    unitId: 'unit-1',
    sessionId: null,
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
    status: 'CREATED',
    completionDate: null,
  }
  return Sale.fromDTO({ ...base, ...overrides })
}

describe('Sale entity', () => {
  it('adds and removes items with recalculated totals', () => {
    const sale = makeSale()
    const item = SaleItem.create({
      id: 'item-1',
      saleId: sale.id,
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
      appointment: null,
      discounts: [],
      couponCode: null,
    })
    const withItem = sale.addItem(item)
    expect(withItem.items).toHaveLength(1)
    expect(withItem.totals().gross).toBe(100)

    const withoutItem = withItem.removeItem('item-1')
    expect(withoutItem.items).toHaveLength(0)
    expect(withoutItem.totals().gross).toBe(0)
  })

  it('updates quantity with validation', () => {
    const sale = makeSale()
    const item = SaleItem.create({
      id: 'item-2',
      saleId: sale.id,
      price: 30,
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
      service: null,
      product: null,
      plan: null,
      barber: null,
      coupon: null,
      appointment: null,
      discounts: [],
      couponCode: null,
    })
    const withItem = sale.addItem(item)
    const updated = withItem.updateItemQuantity('item-2', 3)
    expect(updated.items.find((i) => i.id === 'item-2')?.quantity).toBe(3)
    expect(updated.totals().gross).toBe(90)
    expect(() => withItem.updateItemQuantity('item-2', 0)).toThrowError()
  })

  it('updates custom price with validation', () => {
    const sale = makeSale()
    const item = SaleItem.create({
      id: 'item-3',
      saleId: sale.id,
      price: 40,
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
      service: null,
      product: null,
      plan: null,
      barber: null,
      coupon: null,
      appointment: null,
      discounts: [],
      couponCode: null,
    })
    const withItem = sale.addItem(item)
    const updated = withItem.updateItemCustomPrice(
      'item-3',
      Money.fromFloat(25),
    )
    expect(updated.totals().net).toBe(25)
    const reset = updated.updateItemCustomPrice('item-3', null)
    expect(reset.totals().net).toBe(40)
  })

  it('applies coupon metadata to item', () => {
    const sale = makeSale()
    const baseItem = SaleItem.create({
      id: 'item-4',
      saleId: sale.id,
      price: 20,
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
      service: null,
      product: null,
      plan: null,
      barber: null,
      coupon: null,
      appointment: null,
      discounts: [],
      couponCode: null,
    })
    const withItem = sale.addItem(baseItem)
    const updated = withItem.applyCouponToItem('item-4', {
      couponCode: 'PROMO10',
      couponId: 'coupon-1',
    })
    const dto = updated.items.find((i) => i.id === 'item-4')?.toDTO()
    expect(dto).toMatchObject({ couponCode: 'PROMO10', couponId: 'coupon-1' })
  })

  it('recalculates totals with multiple items and discounts', () => {
    const sale = makeSale()
    const itemA = SaleItem.create({
      id: 'item-a',
      saleId: sale.id,
      price: 100,
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
      service: null,
      product: null,
      plan: null,
      barber: null,
      coupon: null,
      appointment: null,
      discounts: [],
      couponCode: null,
    })
    const itemB = SaleItem.create({
      id: 'item-b',
      saleId: sale.id,
      price: 60,
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
      appointment: null,
      discounts: [],
      couponCode: null,
    })

    const withItems = sale.addItem(itemA).addItem(itemB)
    const withCustom = withItems.updateItemCustomPrice(
      'item-b',
      Money.fromFloat(45),
    )
    const withCoupon = withCustom.applyCouponToItem('item-b', {
      discounts: [
        {
          id: 'discount-1',
          type: 'VALUE',
          amount: 75,
          origin: 'VALUE_SALE_ITEM',
          order: 1,
          saleItemId: 'item-b',
        },
      ],
    })

    const totals = withCoupon.totals()
    expect(totals.gross).toBe(220)
    expect(totals.net).toBe(145)
    expect(totals.discount).toBe(75)
  })
})
