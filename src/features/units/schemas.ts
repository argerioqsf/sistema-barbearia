import { z } from 'zod'
import { ISODate, UUID } from '../schemas'

export const UnitOpeningHoursSchema = z.object({
  id: UUID(),
  unitId: UUID(),
  weekDay: z.number(),
  startHour: ISODate(),
  endHour: ISODate(),
})

export type UnitOpeningHours = z.infer<typeof UnitOpeningHoursSchema>

export const UnitSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    createdAt: z.string().optional(),
    totalBalance: z.number(),
  })
  .passthrough()

export const UnitsListPaginatedResponseSchema = z.object({
  units: z.array(UnitSchema),
  count: z.number(),
})

export const UnitsListResponseSchema = z.array(UnitSchema)

// Some APIs may return unit directly or wrapped
export const UnitDetailWrappedSchema = z.object({
  unit: UnitSchema,
})

export type ZUnit = z.infer<typeof UnitSchema>
