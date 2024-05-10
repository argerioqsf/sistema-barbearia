import { z } from 'zod'

export const formSchemaUpdateUnit = z.object({
  id: z.string().min(1, 'O Id é obrigatório'),
  name: z.string().min(1),
  courses: z.array(z.string()).optional(),
  segments: z.array(z.string()).optional(),
})
