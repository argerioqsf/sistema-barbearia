import { z } from 'zod'
import { UUID } from '../schemas'

export const ServiceSchema = z.object({
  id: UUID(),
  name: z.string(),
  description: z.string(),
  imageUrl: z.string().url().nullable(),
  cost: z.number(),
  price: z.number(),
  defaultTime: z.number().nullable(), // veio null; se for minutos, mantenha number
  commissionPercentage: z.number().optional().nullable(),
  unitId: UUID(),
  categoryId: UUID(),
})

export const ServicesListResponseSchema = z.array(ServiceSchema)

export const ServicesListResponsePaginatedSchema = z.object({
  services: z
    .array(ServiceSchema)
    .or(z.array(ServiceSchema).transform((s) => s)),
  count: z.number().optional().default(0),
})

export type ZService = z.infer<typeof ServiceSchema>
