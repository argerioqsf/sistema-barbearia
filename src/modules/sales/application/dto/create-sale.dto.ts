import { z } from 'zod'

export const CreateSaleDTO = z.object({
  clientId: z.string().uuid('clientId inválido'),
  observation: z.string().nullable().optional(),
  method: z.enum(['CASH']).default('CASH'),
})

export type CreateSaleDTO = z.infer<typeof CreateSaleDTO>
