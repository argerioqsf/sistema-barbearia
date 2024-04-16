import { z } from 'zod'

export const formSchemaUpdateUnit = z.object({
  name: z.string().min(1),
  // courses: z.array(z.string()).optional(),
  // segments: z.array(z.string()).optional(),
})
