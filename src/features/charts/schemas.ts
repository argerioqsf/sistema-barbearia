import { z } from 'zod'
import { UserSchema } from '../users/schemas'

export const ProfileSchema = z
  .object({ role: z.string().optional() })
  .passthrough()

export const ConsultantsListResponseSchema = z.object({
  users: z.array(UserSchema),
  count: z.number(),
})
