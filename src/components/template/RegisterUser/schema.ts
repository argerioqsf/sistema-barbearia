import { Roles } from '@/types/general'
import { z } from 'zod'
import rolesDefault from '@/constants/roles.json'
const roles = Object.keys(rolesDefault) as [keyof Roles]
export const formSchemaRegisterUserProfile = z.object({
  name: z.string().min(1, { message: 'O campo Nome é obrigatório' }),
  email: z.string().min(1, { message: 'O campo E-mail é obrigatório' }),
  password: z.string().min(1, { message: 'O campo Senha é obrigatório' }),
  active: z.enum(['true', 'false']),
  phone: z.string().min(1, { message: 'O campo Whatsapp é obrigatório' }),
  cpf: z.string().min(1, { message: 'O campo Documento é obrigatório' }),
  genre: z.string().min(1, { message: 'O campo Genero é obrigatório' }),
  birthday: z.string().min(1, { message: 'O campo Nascimento é obrigatório' }),
  pix: z.string().min(1, { message: 'O campo Pix é obrigatório' }),
  role: z.enum(roles),
  city: z.string().min(1, { message: 'O campo Cindade é obrigatório' }),
  units: z.array(z.string()).optional().nullable(),
})
