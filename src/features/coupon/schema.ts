import { z } from 'zod'
import { ISODateTime, UUID } from '../schemas'

export const CouponSchema = z.object({
  id: UUID(),
  code: z.string(),
  description: z.string(),
  discount: z.number(),
  discountType: z.enum(['PERCENTAGE']),
  imageUrl: z.string().url().nullable(),
  quantity: z.number(),
  unitId: UUID(),
  createdAt: ISODateTime(),
})
export type Coupon = z.infer<typeof CouponSchema>
