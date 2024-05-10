import { z } from 'zod'

export const formSchemaUpdateSegment = z.object({
  id: z.string().min(1, 'O Id é obrigatório'),
  name: z.string().min(4, 'O nome precisa ter 4 ou mais caracteres'),
  courses: z.array(z.string()).optional(),
})
