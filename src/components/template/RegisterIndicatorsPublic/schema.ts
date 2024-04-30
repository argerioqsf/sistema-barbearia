import { z } from 'zod'

export const formSchemaRegisterLeadPublic = z.object({
  name: z.string().min(1, { message: 'O campo Nome é obrigatório' }),
  phone: z.string().min(1, { message: 'O campo Whatsapp é obrigatório' }),
  document: z.string().nullable().optional(),
  email: z.string().min(1, { message: 'O campo E-mail é obrigatório' }),
  city: z.string().optional(),
  segmentId: z.coerce
    .string()
    .min(2, { message: 'O campo Formação é obrigatório' }),
  unitId: z.string().min(2, { message: 'O campo Unidade é obrigatório' }),
  courseId: z.string().min(2, { message: 'O campo Curso é obrigatório' }),
})
