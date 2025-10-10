import { z } from 'zod'

export const TransactionTypeSchema = z.enum(['ADDITION', 'WITHDRAWAL'])

export const TransactionSchema = z
  .object({
    id: z.string(),
    description: z.string().nullable().optional(),
    amount: z.number().optional(),
    affectedUserId: z.string().optional().nullable(),
    createdAt: z.string().optional(),
    type: TransactionTypeSchema,
  })
  .passthrough()

export const TransactionsListSchema = z.array(TransactionSchema)

export type ZTransaction = z.infer<typeof TransactionSchema>

export const PayCommissionFormSchema = z
  .object({
    affectedUserId: z.string().uuid('É necessário selecionar um colaborador.'),
    description: z.string().optional(),
    discountLoans: z.boolean().default(false),
    receipt: z.any().optional(), // Basic validation, can be improved
    paymentMode: z.enum(['amount', 'items']),
    amount: z.coerce.number().positive('O valor deve ser positivo.').optional(),
    saleItemIds: z.array(z.string().uuid()).optional(),
    appointmentIds: z.array(z.string().uuid()).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.paymentMode === 'amount' && !data.amount) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['amount'],
        message: 'O valor é obrigatório no modo de pagamento fixo.',
      })
    }
    if (
      data.paymentMode === 'items' &&
      (!data.saleItemIds || data.saleItemIds.length === 0) &&
      (!data.appointmentIds || data.appointmentIds.length === 0)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['saleItemIds'], // Add to a relevant field
        message: 'Selecione ao menos um item ou agendamento para pagar.',
      })
    }
  })

export type PayCommissionBody = z.infer<typeof PayCommissionFormSchema>
