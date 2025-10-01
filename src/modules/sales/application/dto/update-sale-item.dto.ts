import { UUID } from '@/features/schemas'
import { z } from 'zod'

const base = z.object({
  saleItemId: z.string().uuid('saleItemId inválido'),
})

export const UpdateSaleItemQuantityDTO = base.extend({
  quantity: z.number().int().positive(),
})

export const UpdateSaleItemCouponDTO = base.extend({
  couponCode: z.string().optional(),
  couponId: z.string().uuid().nullable().optional(),
})

export const UpdateSaleItemCustomPriceDTO = base.extend({
  customPrice: z.number().nonnegative().nullable(),
})

export const UpdateSaleItemBarberDTO = base.extend({
  barberId: UUID(),
})

export type UpdateSaleItemQuantityDTO = z.infer<
  typeof UpdateSaleItemQuantityDTO
>
export type UpdateSaleItemCouponDTO = z.infer<typeof UpdateSaleItemCouponDTO>
export type UpdateSaleItemCustomPriceDTO = z.infer<
  typeof UpdateSaleItemCustomPriceDTO
>
export type UpdateSaleItemBarberDTO = z.infer<typeof UpdateSaleItemBarberDTO>
