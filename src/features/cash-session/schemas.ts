import { z } from 'zod'

export const CashSessionSchema = z
  .object({
    id: z.string(),
    status: z.enum(['OPEN', 'CLOSED']).optional(),
    openedAt: z.string().optional(),
    closedAt: z.string().nullable().optional(),
    initialAmount: z.number().optional(),
    finalAmount: z.number().nullable().optional(),
  })
  .passthrough()

export const CashSessionsListResponseSchema = z.array(CashSessionSchema)

export type ZCashSession = z.infer<typeof CashSessionSchema>
