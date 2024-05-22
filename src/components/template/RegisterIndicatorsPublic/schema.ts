import { z } from 'zod'

export const formSchemaRegisterIndicatorPublic = z.object({
  name: z.string().min(1, { message: 'O campo Nome é obrigatório' }),
  email: z.string().min(1, { message: 'O campo E-mail é obrigatório' }),
  password: z.string().min(1, { message: 'O campo Senha é obrigatório' }),
  'profile.phone': z
    .string()
    .min(1, { message: 'O campo Whatsapp é obrigatório' }),
  'profile.cpf': z
    .string()
    .min(1, { message: 'O campo Documento é obrigatório' }),
  'profile.genre': z
    .string()
    .min(1, { message: 'O campo Genero é obrigatório' }),
  'profile.birthday': z
    .string()
    .min(1, { message: 'O campo Nascimento é obrigatório' }),
  'profile.pix': z.string().min(1, { message: 'O campo Pix é obrigatório' }),
})
