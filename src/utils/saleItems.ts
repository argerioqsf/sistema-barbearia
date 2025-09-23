import { OriginsDiscount } from '@/features/discounts/schema'
import { ZSaleItems } from '@/features/saleItems/schema'

export function calculateRealValueSaleItem(
  saleItem: ZSaleItems,
  origins?: OriginsDiscount[],
) {
  const realValue = saleItem.price
  const discounts = saleItem.discounts
  const discountsOrder = discounts?.sort((a, b) => a.order - b.order) ?? []
  const realValueWithDiscounts = discountsOrder.reduce((acc, discount) => {
    if (!origins || origins.includes(discount.origin)) {
      if (discount.type === 'VALUE') {
        const discountValue = discount.amount
        console.log('- ', discountValue)
        return acc - discountValue
      }
      if (discount.type === 'PERCENTAGE') {
        const discountValue = (acc * discount.amount) / 100
        console.log('- ', discountValue)
        return acc - discountValue
      }
    }
    return acc
  }, realValue)
  return realValueWithDiscounts >= 0 ? realValueWithDiscounts?.toFixed(2) : 0
}

export function getNameSaleItem(saleItem: ZSaleItems) {
  let itemName = 'Item Desconhecido'
  if (saleItem.product) {
    itemName = saleItem.product.name
  } else if (saleItem.service) {
    itemName = saleItem.service.name
  } else if (saleItem.appointment) {
    itemName = `Agendamento em ${saleItem.appointment.date}`
  } else if (saleItem.plan) {
    itemName = saleItem.plan.name
  }
  return itemName
}

export function getUniValueSaleItem(saleItem: ZSaleItems) {
  let unitValue = 0
  if (saleItem.product) {
    unitValue = saleItem.product.price
  } else if (saleItem.service) {
    unitValue = saleItem.service.price
  } else if (saleItem.appointment) {
    unitValue = saleItem.appointment.services
      ? saleItem.appointment.services.reduce((acc, appService) => {
          return appService.service ? acc + appService.service.price : acc
        }, 0)
      : 0
  } else if (saleItem.plan) {
    unitValue = saleItem.plan.price
  }
  return unitValue
}
