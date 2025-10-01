import { z } from 'zod'

export const UpdateClientDTO = z.object({
  saleId: z.string().uuid('saleId inválido'),
  clientId: z.string().uuid('clientId inválido'),
})

export type UpdateClientDTO = z.infer<typeof UpdateClientDTO>
