import { z } from 'zod'

export const formSchemaRegisterLead = z.object({
  name: z.string().min(1, { message: 'O campo Nome é obrigatório' }),
  phone: z.string().optional(),
  document: z.string().min(1, { message: 'O campo Documento é obrigatório' }),
  email: z.string().min(1, { message: 'O campo E-mail é obrigatório' }),
  city: z.string().min(1, { message: 'O campo Cidade é obrigatório' }),
  indicatorId: z
    .string()
    .min(1, { message: 'O campo indicador é obrigatório' }),
  unitId: z.string().min(1, { message: 'O campo unidade é obrigatório' }),
  courseId: z.string().min(1, { message: 'O campo Curso é obrigatório' }),
  segmentId: z.string().min(1, { message: 'O campo Seguimento é obrigatório' }),
  consultantId: z.string().optional().nullable(),
})
