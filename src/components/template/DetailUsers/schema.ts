import { z } from 'zod'

export const formSchemaUpdateUser = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  active: z.enum(['true', 'false']),
  phone: z.string().optional(),
  cpf: z.string().optional(),
  genre: z.string().optional(),
  birthday: z.string().optional(),
  pix: z.string().optional(),
  roleId: z.string().min(1, 'O papel do usuário é obrigatório'),
  unitId: z.string().min(1, 'A unidade é obrigatória'),
  commissionPercentage: z.number().optional(),
  permissions: z.array(z.string()).optional(),
  services: z.string().optional(), // JSON string
  products: z.string().optional(), // JSON string
})
