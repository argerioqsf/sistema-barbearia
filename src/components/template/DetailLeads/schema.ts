import { z } from 'zod'
import shift from '@/constants/shift.json'
import modalities from '@/constants/modalities.json'
import education from '@/constants/education.json'
import personalityTraits from '@/constants/personalityTraits.json'

export const formSchemaUpdateLead = z.object({
  id: z.string().min(1, { message: 'O campo Id é obrigatório' }),
  name: z.string().min(1, { message: 'O campo Nome é obrigatório' }),
  phone: z.string().optional().nullable(),
  document: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  unitId: z.string().min(1, { message: 'O campo unidade é obrigatório' }),
  courseId: z.string().min(1, { message: 'O campo Curso é obrigatório' }),
  segmentId: z.string().min(1, { message: 'O campo Segmento é obrigatório' }),
  consultantId: z.string().optional().nullable(),
  released: z.enum(['true', 'false']).nullable(),
  birthday: z.string().optional().nullable(),
  class: z.string().optional().nullable(),
  shift: z.nativeEnum(shift).nullable(),
  course_modality: z.nativeEnum(modalities).nullable(),
  education: z.nativeEnum(education).nullable(),
  personalityTraits: z.nativeEnum(personalityTraits).nullable(),
})

export const formSchemaCreateTimeLine = z.object({
  id: z.string().min(1, { message: 'O campo Id é obrigatório' }),
  title: z.string().min(1, { message: 'O campo Titulo é obrigatório' }),
  description: z
    .string()
    .min(1, { message: 'O campo Descrição é obrigatório' }),
  status: z.string().min(1, { message: 'O campo Status é obrigatório' }),
})
