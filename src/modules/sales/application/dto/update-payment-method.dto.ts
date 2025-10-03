import { paymentMethodSchema } from '@/features/sales/schemas'
import { z } from 'zod'

export const UpdatePaymentMethodDTO = z.object({
  saleId: z.string(),
  method: paymentMethodSchema,
})

export type UpdatePaymentMethodDTO = z.infer<typeof UpdatePaymentMethodDTO>
