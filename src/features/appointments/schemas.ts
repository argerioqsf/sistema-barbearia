import { z, type ZodType } from 'zod'
import { ServiceSchema, type ZService } from '../services/schemas'
import { UserSchema, type ZUser } from '../users/schemas'
import { ISODateTime, UUID } from '../schemas'
import { UnitSchema, type ZUnit } from '../units/schemas'
import { TransactionSchema, type ZTransaction } from '../transactions/schemas'
import { SaleItemSchema, type SaleItem } from '../saleItems/schema'
import { BarberSchema } from '../barbers/schemas'

// --- AppointmentService ---
export interface AppointmentService {
  id?: string | null
  appointmentId?: string | null
  serviceId?: string | null
  commissionPercentage?: number | null
  commissionPaid?: boolean
  transactions?: ZTransaction[] | null
  service?: ZService | null
}

export const AppointmentServiceSchema: ZodType<AppointmentService> = z.object({
  id: UUID().nullable().optional(),
  appointmentId: UUID().nullable().optional(),
  serviceId: UUID().nullable().optional(),
  commissionPercentage: z.number().nullable().optional(),
  commissionPaid: z.boolean().optional(),
  transactions: z.array(TransactionSchema).nullable().optional(),
  service: ServiceSchema.optional().nullable(),
})

// --- Appointment ---
export interface Appointment {
  id: string
  clientId: string
  barberId: string
  unitId: string
  date: string
  status: string
  durationService?: number | null
  observation?: string | null
  client?: ZUser
  barber?: ZUser
  services?: AppointmentService[]
  unit?: ZUnit
  saleItem?: SaleItem
}

export const AppointmentSchema: ZodType<Appointment> = z.object({
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
  saleItem: z.lazy(() => SaleItemSchema).optional(),
})

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
  users: z.array(BarberSchema),
})
