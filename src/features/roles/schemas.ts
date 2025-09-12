import { z } from 'zod'

export const RoleSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional(),
  })
  .passthrough()

export const RolesListSchema = z.object({
  roles: z.array(RoleSchema),
  count: z.number().optional(),
})

export type ZRole = z.infer<typeof RoleSchema>
