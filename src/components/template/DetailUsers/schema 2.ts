import { z } from 'zod'
import roles from '@/constants/roles.json'

export const formSchemaUpdateUserProfile = z.object({
  id: z.string().min(1, { message: 'O campo Id é obrigatório' }),
  name: z.string().min(1, { message: 'O campo Id é obrigatório' }),
  email: z.string().min(1, { message: 'O campo Id é obrigatório' }),
  active: z.enum(['true', 'false']).optional(),
  phone: z.string().optional(),
  cpf: z.string().min(1, { message: 'O campo Id é obrigatório' }),
  genre: z.string().optional(),
  birthday: z.coerce.date(),
  pix: z.string().optional(),
  role: z.nativeEnum(roles).nullable(),
})
