import { z } from 'zod'

export const formSchemaUpdateCourse = z.object({
  id: z.string().min(1, { message: 'O campo Id é obrigatório' }),
  name: z.string().min(1, { message: 'O campo Nome é obrigatório' }).optional(),
  active: z
    .string()
    .min(1, { message: 'O campo Ativo é obrigatório' })
    .optional(),
})
