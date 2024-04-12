import { z } from 'zod'

export const formSchemaUpdateIndicator = z.object({
  id: z.string().min(1, { message: 'O campo Id é obrigatório' }),
  name: z.string().min(1, { message: 'O campo Nome é obrigatório' }).optional(),
  email: z
    .string()
    .min(1, { message: 'O campo E-mail é obrigatório' })
    .optional(),
  active: z.enum(['true', 'false']).optional(),
  phone: z.string().min(1, { message: 'O campo Whatsapp é obrigatório' }),
  cpf: z
    .string()
    .min(1, { message: 'O campo Documento é obrigatório' })
    .optional(),
  genre: z
    .string()
    .min(1, { message: 'O campo Genero é obrigatório' })
    .optional(),
  birthday: z
    .string()
    .min(1, { message: 'O campo Nascimento é obrigatório' })
    .optional(),
  pix: z.string().min(1, { message: 'O campo Pix é obrigatório' }).optional(),
})
