import { z } from 'zod'
import { ISODateTime, UUID } from '../schemas'
import { SaleItemBaseSchema, SaleItemSchema } from '../saleItems/schema'
import { CouponSchema } from '../coupons/schemas'
import { UserSchema } from '../users/schemas'
import { UnitSchema } from '../units/schemas'

export const paymentMethodSchema = z.enum([
  'CASH',
  'PIX',
  'CREDIT_CARD',
  'DEBIT_CARD',
])

export type PaymentMethod = z.infer<typeof paymentMethodSchema>

export const SaleSchema = z.object({
  id: UUID(),
  userId: UUID(),
  clientId: UUID(),
  unitId: UUID(),
  sessionId: UUID().nullable(),
  couponId: UUID().nullable(), // no topo veio preenchido
  total: z.number(),
  gross_value: z.number(),
  method: paymentMethodSchema, // adaptar se existirem outros métodos
  paymentStatus: z.enum(['PENDING', 'PAID']), // adaptar se houver outros status
  createdAt: ISODateTime(),
  observation: z.string().nullable(),
  items: z.array(SaleItemSchema),
  user: UserSchema.optional().nullable(),
  client: UserSchema.optional().nullable(),
  coupon: CouponSchema.nullable(),
  session: z.unknown().nullable(),
  transactions: z.array(z.unknown()),
  unit: UnitSchema.optional().nullable(),
})

export const SalesListResponseSchema = z.array(SaleSchema)
export const UpdateSaleItemResponseSchema = z.object({
  sale: SaleSchema.optional(),
  saleItems: z.array(SaleItemSchema).optional(),
})
export type ZUpdateSaleItemResponseSchema = z.infer<
  typeof UpdateSaleItemResponseSchema
>
export const formSchemaRegisterSale = z.object({
  observation: SaleSchema.shape.observation.optional(),
  method: paymentMethodSchema,
  clientId: SaleSchema.shape.clientId.optional(),
})
export type BodyRegisterSale = z.infer<typeof formSchemaRegisterSale>

export const bodyRemoveOrAddSaleItemSchema = z.object({
  addItems: z.array(SaleItemBaseSchema.partial()).optional(),
  removeItemIds: z.array(UUID()).optional(),
})

export type BodyRemoveOrAddSaleItem = z.infer<
  typeof bodyRemoveOrAddSaleItemSchema
>

export const SalesListPaginateResponseSchema = z.object({
  items: z.array(SaleSchema),
  count: z.number(),
  page: z.number(),
  perPage: z.number(),
})

export const bodyUpdateSaleItemSchema = z.object({
  serviceId: SaleItemBaseSchema.shape.serviceId.optional(),
  productId: SaleItemBaseSchema.shape.productId.optional(),
  appointmentId: SaleItemBaseSchema.shape.appointmentId.optional(),
  planId: SaleItemBaseSchema.shape.planId.optional(),
  quantity: SaleItemBaseSchema.shape.quantity.optional(),
  barberId: SaleItemBaseSchema.shape.barberId.optional(),
  couponId: SaleItemBaseSchema.shape.couponId.optional(),
  couponCode: SaleItemBaseSchema.shape.couponCode.optional(),
  customPrice: SaleItemBaseSchema.shape.customPrice.optional(),
})

export type BodyUpdateSaleItem = z.infer<typeof bodyUpdateSaleItemSchema>

export const bodyUpdateCouponSaleItemSchema = z.object({
  couponId: SaleItemBaseSchema.shape.couponId.optional(),
  couponCode: SaleItemBaseSchema.shape.couponCode.optional(),
})

export type BodyUpdateCouponSaleItem = z.infer<
  typeof bodyUpdateCouponSaleItemSchema
>

export const bodyUpdateCustomPriceSaleItemSchema = z.object({
  customPrice: SaleItemBaseSchema.shape.customPrice,
})

export type BodyUpdateCustomPriceSaleItem = z.infer<
  typeof bodyUpdateCustomPriceSaleItemSchema
>

export const bodyUpdateBarberSaleItemSchema = z.object({
  barberId: UUID().nullable(),
})

export type BodyUpdateBarberSaleItem = z.infer<
  typeof bodyUpdateBarberSaleItemSchema
>

export const bodyUpdateQuantitySaleItemSchema = z.object({
  quantity: SaleItemBaseSchema.shape.quantity,
})

export type BodyUpdateQuantitySaleItem = z.infer<
  typeof bodyUpdateQuantitySaleItemSchema
>

export const bodyPaySaleSchema = z.object({
  method: paymentMethodSchema,
})
export type BodyPaySale = z.infer<typeof bodyPaySaleSchema>

export const bodyUpdateClientSaleSchema = z.object({
  clientId: UUID(),
})
export type BodyUpdateClientSale = z.infer<typeof bodyUpdateClientSaleSchema>

export const bodyUpdateSaleCouponSchema = z.object({
  couponCode: z.string().optional(),
  removeCoupon: z.boolean().optional(),
})
export type BodyUpdateSaleCoupon = z.infer<typeof bodyUpdateSaleCouponSchema>

export const SaleGetResponseSchema = SaleSchema

export type ZSaleListPaginated = z.infer<typeof SaleSchema>

export type ZSale = z.infer<typeof SaleSchema>
