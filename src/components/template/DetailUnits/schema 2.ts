import { z } from 'zod'

export const formSchemaUpdateUnit = z.object({
  name: z.string().min(1),
  phone: z.string().min(6, { message: 'O campo Whatsapp é obrigatório' }),
  // courses: z.array(z.string()).optional(),
  // segments: z.array(z.string()).optional(),
})
