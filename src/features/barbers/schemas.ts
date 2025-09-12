import { z } from 'zod'

export const BarberSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    email: z.string().email().optional(),
    active: z.boolean().optional(),
    phone: z.string().optional(),
    cpf: z.string().optional(),
    genre: z.string().optional(),
    birthday: z.string().optional(),
    pix: z.string().optional(),
    unitId: z.string().optional(),
    roleId: z.string().optional(),
    password: z.string().optional(),
  })
  .passthrough()

export const BarbersListResponseSchema = z.object({
  users: z.array(BarberSchema),
  count: z.number().optional(),
})

export type ZBarber = z.infer<typeof BarberSchema>
