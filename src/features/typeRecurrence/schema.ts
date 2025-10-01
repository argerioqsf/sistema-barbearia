import { z } from 'zod'
import { UUID } from '../schemas'

export const TypeRecurrenceSchema = z.object({
  id: UUID(),
  period: z.number(), // ex.: 1 (provavelmente meses)
})
