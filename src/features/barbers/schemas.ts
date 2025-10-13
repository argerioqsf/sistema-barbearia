import { z } from 'zod'

import { UserSchema } from '../users/schemas'

export const BarbersListResponseSchema = z.object({
  users: z.array(UserSchema),
  count: z.number().optional(),
})
