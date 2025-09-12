import { z } from 'zod'

export const ProfileSchema = z
  .object({ role: z.string().optional() })
  .passthrough()
export const UserSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    active: z.boolean().optional(),
    profile: ProfileSchema.optional(),
  })
  .passthrough()

export const ConsultantsListResponseSchema = z.object({
  users: z.array(UserSchema),
  count: z.number(),
})
