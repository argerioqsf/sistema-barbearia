import { z } from 'zod'

export const PaySaleDTO = z.object({
  saleId: z.string().uuid('saleId inválido'),
  paymentMethod: z.string().min(1, 'Informe a forma de pagamento'),
})

export type PaySaleDTO = z.infer<typeof PaySaleDTO>
