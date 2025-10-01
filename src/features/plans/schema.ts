import { z } from 'zod'
import { UUID } from '../schemas'
import { PlanBenefitSchema } from '../benefits/schema'
import { TypeRecurrenceSchema } from '../typeRecurrence/schema'

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
