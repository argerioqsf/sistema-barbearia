import { z } from 'zod'
import { TransactionSchema } from '../transactions/schemas'
import { ProfileBaseSchema } from '../profile/schemas'
import { ISODateTime } from '../schemas'

export const CheckpointCommissionProfileSchema = z.object({
  id: z.string(),
  totalBalance: z.number(),
  profileId: z.string().optional().nullable(),
  profile: ProfileBaseSchema.optional().nullable(),
  createdAt: ISODateTime().nullable().optional(),
})

export const CashSessionSchema = z
  .object({
    id: z.string(),
    openedById: z.string(),
    openedAt: z.string().optional(),
    closedAt: z.string().nullable().optional(),
    initialAmount: z.number().optional(),
    finalAmount: z.number().nullable().optional(),
    transactions: z.array(TransactionSchema).nullable().optional(),
    commissionCheckpoints: z
      .array(CheckpointCommissionProfileSchema)
      .optional()
      .nullable(),
  })
  .passthrough()

export const CashSessionsListResponseSchema = z.array(CashSessionSchema)

export const GetOpenCashSessionResponseSchema = z.nullable(CashSessionSchema)

export type ZCashSession = z.infer<typeof CashSessionSchema>
