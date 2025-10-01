type SaleStatusValue = 'PENDING' | 'PAID'

export class SaleStatus {
  private constructor(readonly value: SaleStatusValue) {
    if (typeof value !== 'string') {
      throw new Error('Status de venda inválido')
    }
  }

  static from(value: string): SaleStatus {
    if (value !== 'PENDING' && value !== 'PAID') {
      throw new Error('Status de venda inválido')
    }
    return new SaleStatus(value)
  }

  isPaid() {
    return this.value === 'PAID'
  }
}
