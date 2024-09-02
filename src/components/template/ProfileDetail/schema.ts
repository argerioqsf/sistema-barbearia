import { z } from 'zod'

export const formSchemaUpdateProfileUser = z.object({
  'user.name': z.string().min(1, 'O nome precisa ter 4 ou mais caracteres'),
  'user.email': z.string().min(2, 'O campo email é obrigatório'),
  'user.active': z.enum(['true', 'false']).optional().nullable(),
  phone: z.string().min(1, 'O campo whatsapp é obrigatório'),
  cpf: z.string().min(1, 'O campo documento é obrigatório'),
  genre: z.string().min(1, 'O campo Genero é obrigatório'),
  birthday: z.string().min(1, 'O campo Aniversário é obrigatório'),
  pix: z.string().min(1, 'O campo chave pix é obrigatório'),
  city: z.string().min(1, 'O campo cidade é obrigatório'),
})

export const formSchemaUpdateOrganization = z.object({
  id: z.string().min(1, 'O campo Id é obrigatório'),
  name: z.string().min(1, 'O campo Nome é obrigatório'),
  slug: z.string().min(1, 'O campo Nome unico é obrigatório'),
  consultant_bonus: z
    .string()
    .min(1, 'O campo Bônus do consultor é obrigatório'),
  indicator_bonus: z
    .string()
    .min(1, 'O campo Bônus do indicador é obrigatório'),
})
