export class Percentage {
  private constructor(readonly value: number) {
    if (Number.isNaN(value) || value < 0 || value > 100) {
      throw new Error('Percentual inválido')
    }
  }

  static create(value: number) {
    return new Percentage(value)
  }

  toDecimal() {
    return this.value / 100
  }
}
