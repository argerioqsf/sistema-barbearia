import { paymentMethodSchema } from '@/features/sales/schemas'
import { z } from 'zod'

export const PaySaleDTO = z.object({
  saleId: z.string().uuid('saleId inválido'),
  method: paymentMethodSchema,
})

export type PaySaleDTO = z.infer<typeof PaySaleDTO>
