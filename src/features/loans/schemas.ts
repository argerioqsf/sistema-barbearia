import { z } from 'zod'

export const LoanSchema = z
  .object({
    id: z.string(),
    userId: z.string().optional(),
    amount: z.number(),
    status: z.enum(['PENDING', 'APPROVED', 'PAID', 'REJECTED']).optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
  })
  .passthrough()

export const LoansListSchema = z.object({
  loans: z.array(LoanSchema),
})

export type ZLoan = z.infer<typeof LoanSchema>
