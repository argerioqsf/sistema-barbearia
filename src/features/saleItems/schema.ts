import { z } from 'zod'
import { UUID } from '../schemas'
import { ProductSchema } from '../products/schemas'
import { UserSchema } from '../users/schemas'
import { DiscountSchema } from '../discounts/schema'
import { ServiceSchema } from '../services/schemas'
import { CouponSchema } from '../coupons/schemas'
import { AppointmentSchema, type Appointment } from '../appointments/schemas'
import { PlanSchema } from '../plans/schema'

export interface SaleItem {
  id: string
  saleId: string
  serviceId: string | null
  productId: string | null
  quantity: number
  barberId: string | null
  appointmentId: string | null
  couponId: string | null
  planId: string | null
  price: number
  customPrice?: number | null
  porcentagemBarbeiro: number | null
  commissionPaid: boolean
  service?: z.infer<typeof ServiceSchema> | null
  product?: z.infer<typeof ProductSchema> | null
  plan?: z.infer<typeof PlanSchema> | null
  barber?: z.infer<typeof UserSchema> | null
  coupon?: z.infer<typeof CouponSchema> | null
  appointment?: Appointment | null // referencia que volta para Appointment
  discounts?: Array<z.infer<typeof DiscountSchema>>
  couponCode?: string | null
}

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
  service: ServiceSchema.nullable().optional(),
  product: ProductSchema.nullable().optional(),
  plan: PlanSchema.nullable().optional(),
  barber: UserSchema.nullable().optional(),
  coupon: CouponSchema.nullable().optional(),
  appointment: z
    .lazy(() => AppointmentSchema)
    .nullable()
    .optional(),
  discounts: z.array(DiscountSchema).optional(),
  couponCode: z.string().nullable().optional(),
})

export type ZSaleItem = z.infer<typeof SaleItemSchema>
