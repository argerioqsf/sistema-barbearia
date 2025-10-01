import { z } from 'zod'
import { UUID } from '../schemas'

const originsDiscount = z.enum([
  'COUPON_SALE',
  'VALUE_SALE_ITEM',
  'COUPON_SALE_ITEM',
  'PLAN',
])

export type OriginsDiscount = z.infer<typeof originsDiscount>

export const DiscountSchema = z.object({
  id: UUID(),
  amount: z.number(),
  type: z.enum(['PERCENTAGE', 'VALUE']), // conforme o exemplo
  origin: originsDiscount, // conforme o exemplo
  order: z.number(),
  saleItemId: UUID(),
})
