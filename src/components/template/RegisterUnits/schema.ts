import { z } from 'zod'

export const formSchemaRegisterUnit = z.object({
  name: z.string().min(1),
  courses: z.array(z.string()).optional().nullable(),
  segments: z.array(z.string()).optional().nullable(),
})
