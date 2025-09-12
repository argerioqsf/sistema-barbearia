import { z } from 'zod'

export const UnitSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    createdAt: z.string().optional(),
  })
  .passthrough()

export const UnitsListResponseSchema = z.object({
  units: z.array(UnitSchema),
  count: z.number(),
})

// Some APIs may return unit directly or wrapped
export const UnitDetailWrappedSchema = z.object({
  unit: UnitSchema,
})

export type ZUnit = z.infer<typeof UnitSchema>
