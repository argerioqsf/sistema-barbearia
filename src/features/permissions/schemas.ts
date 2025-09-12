import { z } from 'zod'

export const PermissionSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional(),
  })
  .passthrough()

export const PermissionsListSchema = z.object({
  permissions: z.array(PermissionSchema),
  count: z.number().optional(),
})

export type ZPermission = z.infer<typeof PermissionSchema>
