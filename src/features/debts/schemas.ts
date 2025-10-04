import { z } from 'zod'
import { ISODateTime } from '../schemas'

export const PaymentStatusSchema = z.enum(['PAID', 'PENDING'])

export const DebtSchema = z
  .object({
    id: z.string(),
    status: z.string().optional(),
    paymentDate: ISODateTime().optional(),
    amount: PaymentStatusSchema,
  })
  .passthrough()

export const DebtsListResponseSchema = z.object({
  items: z.array(DebtSchema),
  count: z.number().optional(),
  page: z.number().optional(),
  perPage: z.number().optional(),
})

export type ZDebt = z.infer<typeof DebtSchema>
