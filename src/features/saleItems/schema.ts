import { z } from 'zod'
import { UUID } from '../schemas'
import { ProductSchema } from '../products/schemas'
import { UserSchema } from '../users/schemas'
import { DiscountSchema } from '../discounts/schema'
import { ServiceSchema } from '../services/schemas'
import { CouponSchema } from '../coupons/schemas'
import { AppointmentSchema } from '../appointments/schemas'
import { PlanSchema } from '../plans/schema'

export const SaleItemSchema = z.object({
  id: UUID(),
  saleId: UUID(),
  serviceId: UUID().nullable(),
  productId: UUID().nullable(),
  quantity: z.number().min(1, 'A quantidade deve ser no mínimo 1'),
  barberId: UUID().nullable(),
  appointmentId: UUID().nullable(),
  couponId: UUID().nullable(),
  planId: UUID().nullable(),
  price: z.number(),
  customPrice: z.number().nullable().optional(),
  porcentagemBarbeiro: z.number().nullable(),
  commissionPaid: z.boolean(),
  service: ServiceSchema.nullable().optional(), // não há estrutura no exemplo
  product: ProductSchema.nullable().optional(),
  plan: PlanSchema.nullable().optional(), // não há estrutura no exemplo
  barber: UserSchema.nullable().optional(),
  coupon: CouponSchema.nullable().optional(), // não há estrutura no exemplo
  appointment: AppointmentSchema.nullable().optional(), // não há estrutura no exemplo
  discounts: z.array(DiscountSchema).optional(),
  couponCode: z.string().nullable().optional(),
})

export type ZSaleItems = z.infer<typeof SaleItemSchema>
