import { z } from 'zod'

export const formSchemaUpdateProfileUser = z.object({
  'user.name': z.string().min(1, 'O nome precisa ter 4 ou mais caracteres'),
  'user.email': z.string().min(2, 'O campo email é obrigatório'),
  'user.active': z.enum(['true', 'false']),
  phone: z.string().min(1, 'O campo whatsapp é obrigatório'),
  cpf: z.string().min(1, 'O campo documento é obrigatório'),
  genre: z.string().min(1, 'O campo Genero é obrigatório'),
  birthday: z.string().min(1, 'O campo Aniversário é obrigatório'),
  pix: z.string().min(1, 'O campo chave pix é obrigatório'),
  city: z.string().min(1, 'O campo cidade é obrigatório'),
})
