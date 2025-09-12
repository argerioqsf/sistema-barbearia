import { z } from 'zod'

export const TransactionSchema = z
  .object({
    id: z.string(),
    description: z.string().nullable().optional(),
    amount: z.number().optional(),
    affectedUserId: z.string().optional(),
    createdAt: z.string().optional(),
  })
  .passthrough()

export const TransactionsListSchema = z.object({
  transactions: z.array(TransactionSchema),
  count: z.number().optional(),
})

export type ZTransaction = z.infer<typeof TransactionSchema>
