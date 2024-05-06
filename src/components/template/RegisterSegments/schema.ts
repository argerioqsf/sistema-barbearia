import { z } from 'zod'

export const formSchemaRegisterSegment = z.object({
  name: z.string().min(4, 'O nome precisa ter 4 ou mais caracteres'),
  courses: z.array(z.string()).optional().nullable(),
})
