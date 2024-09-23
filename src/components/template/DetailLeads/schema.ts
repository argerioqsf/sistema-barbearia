import { z } from 'zod'

export const formSchemaUpdateLead = z.object({
  id: z.string().min(1, { message: 'O campo Id é obrigatório' }),
  name: z.string().min(1, { message: 'O campo Nome é obrigatório' }),
  phone: z.string().optional(),
  document: z.string().min(1, { message: 'O campo Documento é obrigatório' }),
  email: z.string().min(1, { message: 'O campo Id é obrigatório' }),
  city: z.string().min(1, { message: 'O campo Cidade é obrigatório' }),
  unitId: z.string().min(1, { message: 'O campo unidade é obrigatório' }),
  courseId: z.string().min(1, { message: 'O campo Curso é obrigatório' }),
  segmentId: z.string().min(1, { message: 'O campo Seguimento é obrigatório' }),
  consultantId: z.string().optional().nullable(),
  released: z.enum(['true', 'false']),
})

export const formSchemaCreateTimeLine = z.object({
  id: z.string().min(1, { message: 'O campo Id é obrigatório' }),
  title: z.string().min(1, { message: 'O campo Titulo é obrigatório' }),
  description: z
    .string()
    .min(1, { message: 'O campo Descrição é obrigatório' }),
  status: z.string().min(1, { message: 'O campo Status é obrigatório' }),
})
