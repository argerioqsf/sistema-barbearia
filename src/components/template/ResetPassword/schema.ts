import { z } from 'zod'
export const formSchemaResetPassword = z.object({
  email: z.string().min(1, { message: 'O campo E-mail é obrigatório' }),
  password: z.string().min(1, { message: 'O campo Senha é obrigatório' }),
})
