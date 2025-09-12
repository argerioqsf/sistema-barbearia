import { z } from 'zod'

export const ServiceSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    price: z.number().optional(),
    active: z.boolean().optional(),
    createdAt: z.string().optional(),
  })
  .passthrough()

export const ServicesListResponseSchema = z.object({
  services: z
    .array(ServiceSchema)
    .or(z.array(ServiceSchema).transform((s) => s)),
  count: z.number().optional().default(0),
})

export type ZService = z.infer<typeof ServiceSchema>
