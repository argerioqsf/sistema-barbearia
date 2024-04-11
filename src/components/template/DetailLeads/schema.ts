import { z } from 'zod'
import roles from '@/constants/roles.json'

export const formSchemaUpdateLead = z.object({
  id: z.string().min(1, { message: 'O campo Id é obrigatório' }),
  name: z.string().min(1, { message: 'O campo Id é obrigatório' }),
  email: z.string().min(1, { message: 'O campo Id é obrigatório' }),
  active: z.enum(['true', 'false']).optional(),
  phone: z.string().optional(),
  cpf: z.string().min(1, { message: 'O campo Id é obrigatório' }),
  genre: z.string().optional(),
  birthday: z.date(),
  pix: z.string().optional(),
  role: z.nativeEnum(roles).nullable(),
})

export const formSchemaCreateTimeLine = z.object({
  title: z.string().min(1, { message: 'O campo Titulo é obrigatório' }),
  description: z
    .string()
    .min(1, { message: 'O campo Descrição é obrigatório' }),
  status: z.string().min(1, { message: 'O campo Status é obrigatório' }),
  leadsId: z.string().min(1, { message: 'O campo leadsId é obrigatório' }),
  courseId: z.string().min(1, { message: 'O campo courseId é obrigatório' }),
})
