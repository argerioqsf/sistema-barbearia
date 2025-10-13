import { z } from 'zod'
import { TransactionSchema } from '@/features/transactions/schemas'

export const CollaboratorSaleItemSchema = z
  .object({
    id: z.string().optional(),
    name: z.string().optional(),
    quantity: z.coerce.number().default(0),
    total: z.coerce.number().default(0),
  })
  .passthrough()

export const CollaboratorDashboardSchema = z.object({
  totalBalance: z.coerce.number().default(0),
  saleItems: z.array(CollaboratorSaleItemSchema).default([]),
  transactions: z.array(TransactionSchema).default([]),
})

export type CollaboratorSaleItem = z.infer<typeof CollaboratorSaleItemSchema>
export type CollaboratorDashboard = z.infer<typeof CollaboratorDashboardSchema>
