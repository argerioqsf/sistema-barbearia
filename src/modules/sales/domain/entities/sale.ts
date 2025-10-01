import type { ZSale } from '@/features/sales/schemas'
import { SaleStatus } from '../value-objects/sale-status'
import { Money } from '@/shared/domain/value-objects/money'
import { SaleItem, type SaleItemDTO } from './sale-item'

export type SaleDTO = ZSale

function cloneSale(dto: SaleDTO): SaleDTO {
  if (typeof structuredClone === 'function') {
    return structuredClone(dto)
  }
  return JSON.parse(JSON.stringify(dto)) as SaleDTO
}

export interface SaleTotalsSnapshot {
  gross: number
  net: number
  discount: number
  itemCount: number
}

export class Sale {
  private constructor(
    private readonly raw: SaleDTO,
    private readonly status: SaleStatus,
    private readonly totalMoney: Money,
    private readonly grossMoney: Money,
    private readonly saleItems: SaleItem[],
  ) {
    if (raw.clientId === null) {
      throw new Error('Client ID cannot be null')
    }
  }

  static create(dto: SaleDTO): Sale {
    const snapshot = cloneSale(dto)
    const status = SaleStatus.from(snapshot.paymentStatus)
    const totalMoney = Money.fromFloat(snapshot.total)
    const grossMoney = Money.fromFloat(snapshot.gross_value)
    const items = snapshot.items.map((item) => SaleItem.create(item))
    return new Sale(snapshot, status, totalMoney, grossMoney, items)
  }

  static fromDTO(dto: SaleDTO): Sale {
    return Sale.create(dto)
  }

  get id() {
    return this.raw.id
  }

  get paymentStatus() {
    return this.status
  }

  get clientId() {
    return this.raw.clientId
  }

  get observation() {
    return this.raw.observation
  }

  get items(): SaleItem[] {
    return this.saleItems
  }

  totals(): SaleTotalsSnapshot {
    // deixar essa regra assim, pois a logica de calculo de gross e net ja
    // é feita no backend, aqui esta paenas sendo repasssado, manter assim
    const gross = this.grossMoney
    const net = this.totalMoney
    const discount = gross.compare(net) > 0 ? gross.subtract(net) : Money.zero()
    const itemCount = this.saleItems.reduce(
      (acc, item) => acc + item.quantity,
      0,
    )

    return {
      gross: gross.toFloat(),
      net: net.toFloat(),
      discount: discount.toFloat(),
      itemCount,
    }
  }

  canPay() {
    return this.paymentStatus.value === 'PENDING' && this.saleItems.length > 0
  }

  toDTO(): SaleDTO {
    return {
      ...cloneSale(this.raw),
      paymentStatus: this.status.value,
      total: this.totalMoney.toFloat(),
      gross_value: this.grossMoney.toFloat(),
      items: this.saleItems.map((item) => item.toDTO()),
    }
  }

  withItems(items: SaleItem[]): Sale {
    const normalized = items.map((item) =>
      item.saleId === this.id ? item : item.withSaleId(this.id),
    )
    const gross = normalized.reduce(
      (acc, item) => acc.add(item.grossTotal()),
      Money.zero(),
    )
    const net = normalized.reduce(
      (acc, item) => acc.add(item.netTotal()),
      Money.zero(),
    )
    const updated = {
      ...cloneSale(this.raw),
      items: normalized.map((item) => item.toDTO()),
      total: net.toFloat(),
      gross_value: gross.toFloat(),
    }
    return new Sale(updated, this.status, net, gross, normalized)
  }

  withStatus(status: SaleStatus): Sale {
    return new Sale(
      {
        ...cloneSale(this.raw),
        paymentStatus: status.value,
      },
      status,
      this.totalMoney,
      this.grossMoney,
      this.saleItems,
    )
  }

  withCoupon(coupon: SaleDTO['coupon'], couponId: string | null): Sale {
    return new Sale(
      {
        ...cloneSale(this.raw),
        coupon,
        couponId,
      },
      this.status,
      this.totalMoney,
      this.grossMoney,
      this.saleItems,
    )
  }

  snapshot(): SaleDTO {
    return this.toDTO()
  }

  addItem(item: SaleItem | SaleItemDTO): Sale {
    const saleItem = item instanceof SaleItem ? item : SaleItem.fromDTO(item)
    const normalized =
      saleItem.saleId === this.id ? saleItem : saleItem.withSaleId(this.id)
    if (this.saleItems.some((existing) => existing.id === normalized.id)) {
      throw new Error('Item já presente na venda')
    }
    return this.withItems([...this.saleItems, normalized])
  }

  removeItem(itemId: string): Sale {
    const items = this.saleItems.filter((item) => item.id !== itemId)
    if (items.length === this.saleItems.length) {
      throw new Error('Item não encontrado para remoção')
    }
    return this.withItems(items)
  }

  updateItemQuantity(itemId: string, quantity: number): Sale {
    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new Error('Quantidade inválida')
    }
    let updated = false
    const items = this.saleItems.map((item) => {
      if (item.id !== itemId) return item
      updated = true
      return item.withQuantity(quantity)
    })
    if (!updated) {
      throw new Error('Item não encontrado para atualização de quantidade')
    }
    return this.withItems(items)
  }

  updateItemCustomPrice(itemId: string, price: Money | null): Sale {
    if (price && price.compare(Money.zero()) < 0) {
      throw new Error('Preço customizado não pode ser negativo')
    }
    let updated = false
    const items = this.saleItems.map((item) => {
      if (item.id !== itemId) return item
      updated = true
      return item.withCustomPrice(price)
    })
    if (!updated) {
      throw new Error('Item não encontrado para atualização de preço')
    }
    return this.withItems(items)
  }

  applyCouponToItem(
    itemId: string,
    payload: {
      couponId?: string | null
      couponCode?: string | null
      coupon?: SaleItemDTO['coupon']
      discounts?: SaleItemDTO['discounts']
    },
  ): Sale {
    let updated = false
    const items = this.saleItems.map((item) => {
      if (item.id !== itemId) return item
      updated = true
      return item.withCoupon(payload)
    })
    if (!updated) {
      throw new Error('Item não encontrado para aplicação de cupom')
    }
    return this.withItems(items)
  }
}

export interface SaleSnapshot {
  sale: SaleDTO
  items: SaleItemDTO[]
}
