import { z } from 'zod'

export const formSchemaRegisterUnit = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  // courses: z.array(z.string()).optional(),
  // segments: z.array(z.string()).optional(),
})
