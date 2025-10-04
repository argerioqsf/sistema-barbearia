import { z } from 'zod'
import { ServiceSchema } from '../services/schemas'
import { UserSchema } from '../users/schemas'
import { ISODateTime, UUID } from '../schemas'
import { UnitSchema } from '../units/schemas'
import { TransactionSchema } from '../transactions/schemas'
import { SaleItemBaseSchema } from '../saleItems/schema'

export const AppointmentServiceSchema = z.object({
  id: UUID().nullable().optional(),
  appointmentId: UUID().nullable().optional(),
  serviceId: UUID().nullable().optional(),
  commissionPercentage: z.number().nullable().optional(),
  commissionPaid: z.boolean().optional(),
  transactions: z.array(TransactionSchema).nullable().optional(),
  service: ServiceSchema.optional().nullable(),
})

export const AppointmentBaseSchema = z.object({
  id: UUID(),
  clientId: UUID(),
  barberId: UUID(),
  unitId: UUID(),
  date: ISODateTime(),
  status: z.string(),
  durationService: z.number().nullable().optional(),
  observation: z.string().nullable().optional(),
  client: UserSchema.optional(),
  barber: UserSchema.optional(),
  services: z.array(AppointmentServiceSchema).optional(),
  unit: UnitSchema.optional(),
})

export const AppointmentSchema = z.lazy(() =>
  AppointmentBaseSchema.extend({
    saleItem: SaleItemBaseSchema.optional(),
  }).passthrough(),
)

export type ZAppointment = z.infer<typeof AppointmentSchema>

// --- List Schemas ---
export const AppointmentsListResponseSchema = z.array(AppointmentSchema)

export const AppointmentsListPaginatedResponseSchema = z.object({
  items: z.array(AppointmentSchema),
  count: z.number().optional(),
  page: z.number().optional(),
  perPage: z.number().optional(),
})

export const BarbersListResponseSchema = z.object({
  users: z.array(UserSchema),
})
