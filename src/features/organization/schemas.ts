import { z } from 'zod'

export const CycleSchema = z
  .object({
    id: z.string(),
    description: z.string().optional(),
    status: z.string().optional(),
    start_cycle: z.string().optional(),
    end_cycle: z.string().optional(),
  })
  .passthrough()

export const OrganizationSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    consultant_bonus: z.number(),
    indicator_bonus: z.number(),
    slug: z.string(),
    cycles: z.array(CycleSchema).optional(),
  })
  .passthrough()
