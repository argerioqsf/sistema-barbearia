import { z } from 'zod'

export const formSchemaUpdateIndicator = z.object({
  id: z.string().min(1, 'O Id é obrigatório'),
  name: z.string().min(1, 'O nome precisa ter 4 ou mais caracteres'),
  email: z.string().min(2, 'O campo email é obrigatório'),
  'profile.active': z.enum(['true', 'false']),
  'profile.phone': z.string().min(1, 'O campo whatsapp é obrigatório'),
  'profile.cpf': z.string().min(1, 'O campo documento é obrigatório'),
  'profile.genre': z.string().min(1, 'O campo Genero é obrigatório'),
  'profile.birthday': z.string().min(1, 'O campo Aniversário é obrigatório'),
  'profile.pix': z.string().min(1, 'O campo chave pix é obrigatório'),
  'profile.city': z.string().min(1, 'O campo cidade é obrigatório'),
})

export const formSchemaSentContract = z.object({
  contractLink: z.string().optional().nullable(),
})
