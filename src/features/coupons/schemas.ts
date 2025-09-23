import { z } from 'zod'
import { ISODateTime, UUID } from '../schemas'

export const CouponSchema = z.object({
  id: UUID(),
  code: z.string(),
  description: z.string(),
  discount: z.number(),
  discountType: z.enum(['PERCENTAGE', 'VALUE']), // conforme o exemplo
  imageUrl: z.string().url().nullable(),
  quantity: z.number(),
  unitId: UUID(),
  createdAt: ISODateTime(),
})

export const CouponsListResponseSchema = z.object({
  items: z.array(CouponSchema),
  count: z.number(),
  page: z.number(),
  perPage: z.number(),
})

export const CouponDetailResponseSchema = z.object({
  coupon: CouponSchema,
})

export type ZCoupon = z.infer<typeof CouponSchema>
