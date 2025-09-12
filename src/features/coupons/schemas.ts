import { z } from 'zod'

export const CouponSchema = z
  .object({
    id: z.string(),
    code: z.string(),
    description: z.string().optional(),
    discount: z.number(),
    discountType: z.string(),
    imageUrl: z.string().url().nullable(),
    quantity: z.number(),
    unitId: z.string(),
    createdAt: z.string(),
  })
  .passthrough()

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
