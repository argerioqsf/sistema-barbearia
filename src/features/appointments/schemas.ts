import { z } from 'zod'

export const AppointmentSchema = z
  .object({
    id: z.string(),
    clientId: z.string().optional(),
    barberId: z.string().optional(),
    date: z.string().optional(),
    status: z.string().optional(),
    observation: z.string().optional(),
    unitId: z.string().optional(),
  })
  .passthrough()

export const AppointmentsListResponseSchema = z.object({
  items: z.array(AppointmentSchema),
  count: z.number().optional(),
  page: z.number().optional(),
  perPage: z.number().optional(),
})

export const BarberSchema = z
  .object({
    id: z.string().optional(),
    name: z.string().optional(),
  })
  .passthrough()

export const BarbersListResponseSchema = z.object({
  users: z.array(BarberSchema),
})

export type ZAppointment = z.infer<typeof AppointmentSchema>
