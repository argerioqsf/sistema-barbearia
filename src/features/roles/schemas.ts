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

export const RolesListSchema = z.array(RoleSchema)

export type ZRole = z.infer<typeof RoleSchema>
