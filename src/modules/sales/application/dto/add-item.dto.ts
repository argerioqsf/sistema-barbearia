import { z } from 'zod'

export const AddItemDTO = z
  .object({
    saleId: z.string().uuid('saleId inválido'),
    quantity: z.number().int().positive().default(1),
    price: z.number().nonnegative().optional(),
    productId: z.string().uuid().optional(),
    serviceId: z.string().uuid().optional(),
    planId: z.string().uuid().optional(),
    appointmentId: z.string().uuid().optional(),
    customPrice: z.number().nonnegative().nullable().optional(),
    barberId: z.string().uuid().nullable().optional(),
  })
  .refine(
    (data) =>
      data.productId || data.serviceId || data.planId || data.appointmentId,
    {
      message: 'Informe pelo menos um identificador de item',
      path: ['productId'],
    },
  )

export type AddItemDTO = z.infer<typeof AddItemDTO>
