import { z } from 'zod'
import { ISODateTime, UUID } from '../schemas'
import { PlanBenefitSchema } from '../benefits/schema'
import { TypeRecurrenceSchema } from '../typeRecurrence/schema'
import { DebtSchema } from '../debts/schemas'

export const PlanProfileStatusSchema = z.enum([
  'PAID',
  'CANCELED_ACTIVE',
  'CANCELED_EXPIRED',
  'DEFAULTED',
  'EXPIRED',
])

export const PlanProfileSchema = z
  .object({
    id: UUID(),
    planStartDate: ISODateTime(),
    status: PlanProfileStatusSchema.default('PAID'),
    saleItemId: UUID(),
    dueDayDebt: z
      .number()
      .int()
      .min(1, 'dueDayDebt deve ser entre 1 e 31')
      .max(31, 'dueDayDebt deve ser entre 1 e 31'),
    planId: UUID(),
    profileId: UUID(),
    debts: z.array(DebtSchema).optional(),
  })
  .passthrough()

export const PlanSchema = z.object({
  id: UUID(),
  price: z.number(),
  name: z.string(),
  typeRecurrenceId: UUID().optional(),
  benefits: z.array(PlanBenefitSchema).optional(),
  typeRecurrence: TypeRecurrenceSchema.optional(),
})
export const PlansListResponseSchema = z.array(PlanSchema)

export const PlansListPaginateResponseSchema = z.object({
  items: z.array(PlanSchema),
  count: z.number(),
  page: z.number(),
  perPage: z.number(),
})

export type ZPlan = z.infer<typeof PlanSchema>
