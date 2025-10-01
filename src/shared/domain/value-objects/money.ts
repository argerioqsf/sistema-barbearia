export class Money {
  private constructor(readonly cents: number) {
    if (!Number.isInteger(cents) || cents < 0) {
      throw new Error('Valor monetário inválido')
    }
  }

  static zero() {
    return new Money(0)
  }

  static fromFloat(value: number) {
    return new Money(Math.round(value * 100))
  }

  static fromCents(cents: number) {
    return new Money(cents)
  }

  add(other: Money) {
    return new Money(this.cents + other.cents)
  }

  subtract(other: Money) {
    const result = this.cents - other.cents
    if (result < 0) throw new Error('Resultado negativo não suportado')
    return new Money(result)
  }

  multiply(multiplier: number) {
    const result = Math.round(this.cents * multiplier)
    if (result < 0) throw new Error('Resultado negativo não suportado')
    return new Money(result)
  }

  max(other: Money) {
    return this.cents >= other.cents ? this : other
  }

  min(other: Money) {
    return this.cents <= other.cents ? this : other
  }

  compare(other: Money) {
    if (this.cents === other.cents) return 0
    return this.cents > other.cents ? 1 : -1
  }

  toFloat() {
    return this.cents / 100
  }
}
