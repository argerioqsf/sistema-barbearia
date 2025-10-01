import { z } from 'zod'

export const ApplyCouponDTO = z.object({
  saleId: z.string().uuid('saleId inválido'),
  couponCode: z.string().min(1, 'Informe o código do cupom'),
})

export const RemoveCouponDTO = z.object({
  saleId: z.string().uuid('saleId inválido'),
})

export type ApplyCouponDTO = z.infer<typeof ApplyCouponDTO>
export type RemoveCouponDTO = z.infer<typeof RemoveCouponDTO>
