import { z } from 'zod'

export const RoleNameSchema = z.enum([
  'ADMIN',
  'BARBER',
  'CLIENT',
  'ATTENDANT',
  'MANAGER',
  'OWNER',
])

export type RoleName = z.infer<typeof RoleNameSchema>

export const RoleSchema = z
  .object({
    id: z.string(),
    name: RoleNameSchema,
    description: z.string().optional(),
  })
  .passthrough()

export const RolesListSchema = z.object({
  roles: z.array(RoleSchema),
  count: z.number().optional(),
})

export type ZRole = z.infer<typeof RoleSchema>
