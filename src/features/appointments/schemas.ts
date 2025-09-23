import { z } from 'zod'
import { ServiceSchema } from '../services/schemas'
import { UserSchema } from '../users/schemas'
import { ISODateTime, UUID } from '../schemas'
import { UnitSchema } from '../units/schemas'
import { TransactionSchema } from '../transactions/schemas'

export const AppointmentServiceSchema = z.object({
  id: UUID().nullable().optional(),
  appointmentId: UUID().nullable().optional(),
  serviceId: UUID().nullable().optional(),
  commissionPercentage: z.number().nullable().optional(),
  commissionPaid: z.boolean().optional(),
  transactions: TransactionSchema.nullable().optional(),
  service: ServiceSchema.optional().nullable().optional(),
})

export const AppointmentSchema = z.object({
  id: UUID(),
  clientId: UUID(),
  barberId: UUID(),
  unitId: UUID(),
  date: ISODateTime(),
  status: z.string(), // ex.: "SCHEDULED" (troque para enum se tiver a lista)
  durationService: z.number().nullable().optional(),
  observation: z.string().nullable().optional(),
  client: UserSchema.optional(),
  barber: UserSchema.optional(),
  services: z.array(AppointmentServiceSchema).optional(),
  unit: UnitSchema.optional(),
})

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
