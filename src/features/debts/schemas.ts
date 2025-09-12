import { z } from 'zod'

export const DebtSchema = z
  .object({
    id: z.string(),
    status: z.string().optional(),
    paymentDate: z.string().optional(),
    amount: z.number().optional(),
  })
  .passthrough()

export const DebtsListResponseSchema = z.object({
  items: z.array(DebtSchema),
  count: z.number().optional(),
  page: z.number().optional(),
  perPage: z.number().optional(),
})

export type ZDebt = z.infer<typeof DebtSchema>
