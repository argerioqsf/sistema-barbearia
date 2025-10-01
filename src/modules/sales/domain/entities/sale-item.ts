import type { ZSaleItems } from '@/features/saleItems/schema'
import type { OriginsDiscount } from '@/features/discounts/schema'
import { Money } from '@/shared/domain/value-objects/money'

export type SaleItemDTO = ZSaleItems

function cloneSaleItem(dto: SaleItemDTO): SaleItemDTO {
  // structuredClone está disponível em runtimes modernos; mantemos fallback para testes
  if (typeof structuredClone === 'function') {
    return structuredClone(dto)
  }
  return JSON.parse(JSON.stringify(dto)) as SaleItemDTO
}

export class SaleItem {
  private constructor(private readonly data: SaleItemDTO) {
    if (data.quantity < 1) {
      throw new Error('A quantidade deve ser no mínimo 1')
    }
  }

  static create(dto: SaleItemDTO): SaleItem {
    return new SaleItem(cloneSaleItem(dto))
  }

  static fromDTO(dto: SaleItemDTO): SaleItem {
    return SaleItem.create(dto)
  }

  toDTO(): SaleItemDTO {
    return cloneSaleItem({
      ...this.data,
      price: this.price.toFloat(),
      customPrice: this.data.customPrice ?? null,
    })
  }

  get id() {
    return this.data.id
  }

  get saleId() {
    return this.data.saleId
  }

  get quantity() {
    return this.data.quantity
  }

  get discounts() {
    return this.data.discounts ?? []
  }

  get price(): Money {
    return Money.fromFloat(this.data.price)
  }

  get customPrice(): Money | null {
    const custom = this.data.customPrice
    return custom == null ? null : Money.fromFloat(custom)
  }

  get commissionPercentage() {
    return this.data.porcentagemBarbeiro ?? null
  }

  get references() {
    return {
      product: this.data.product,
      service: this.data.service,
      plan: this.data.plan,
      appointment: this.data.appointment,
      coupon: this.data.coupon,
      barber: this.data.barber,
    }
  }

  displayName(defaultName = 'Item Desconhecido'): string {
    const { product, service, appointment, plan } = this.references
    if (product) return product.name
    if (service) return service.name
    if (appointment) return `Agendamento em ${appointment.date}`
    if (plan) return plan.name
    return defaultName
  }

  effectiveUnitPrice(): Money {
    return this.customPrice ?? this.calculateRealValue()
  }

  catalogUnitPrice(): Money {
    const value = this.resolveCatalogUnitPrice()
    return Money.fromFloat(value)
  }

  calculateRealValue(origins?: OriginsDiscount[]): Money {
    const allowedOrigins =
      origins && origins.length > 0 ? new Set(origins) : null
    const discounts = [...(this.data.discounts ?? [])].sort(
      (a, b) => a.order - b.order,
    )

    const finalMoney = discounts.reduce((acc, discount) => {
      if (allowedOrigins && !allowedOrigins.has(discount.origin)) {
        return acc
      }
      if (discount.type === 'VALUE') {
        const decreased = acc.subtract(Money.fromFloat(discount.amount))
        return decreased.compare(Money.zero()) < 0 ? Money.zero() : decreased
      }
      if (discount.type === 'PERCENTAGE') {
        const amount = acc.multiply(discount.amount / 100)
        const decreased = acc.subtract(amount)
        return decreased.compare(Money.zero()) < 0 ? Money.zero() : decreased
      }
      return acc
    }, this.price)

    return finalMoney
  }

  grossTotal(): Money {
    return this.catalogUnitPrice().multiply(this.quantity)
  }

  netTotal(): Money {
    return this.effectiveUnitPrice()
  }

  discountTotal(): Money {
    const gross = this.grossTotal()
    const net = this.netTotal()
    return gross.compare(net) > 0 ? gross.subtract(net) : Money.zero()
  }

  withQuantity(quantity: number): SaleItem {
    return SaleItem.create({ ...this.toDTO(), quantity })
  }

  withCustomPrice(price: Money | null): SaleItem {
    return SaleItem.create({
      ...this.toDTO(),
      customPrice: price?.toFloat(),
    })
  }

  withSaleId(saleId: string): SaleItem {
    return SaleItem.create({
      ...this.toDTO(),
      saleId,
    })
  }

  withCoupon(options: {
    couponId?: string | null
    couponCode?: string | null
    coupon?: SaleItemDTO['coupon']
    discounts?: SaleItemDTO['discounts']
  }): SaleItem {
    const snapshot = this.toDTO()
    return SaleItem.create({
      ...snapshot,
      couponId: options.couponId ?? snapshot.couponId ?? null,
      couponCode: options.couponCode ?? snapshot.couponCode ?? null,
      coupon: options.coupon ?? snapshot.coupon ?? null,
      discounts: options.discounts ?? snapshot.discounts ?? [],
    })
  }

  private resolveCatalogUnitPrice(): number {
    const { product, service, appointment, plan } = this.data
    if (product) return product.price ?? this.data.price
    if (service) return service.price ?? this.data.price
    if (appointment?.services?.length) {
      return appointment.services.reduce((acc, appService) => {
        const price = appService.service?.price ?? 0
        return acc + price
      }, 0)
    }
    if (plan) return plan.price ?? this.data.price
    return this.data.price
  }
}
