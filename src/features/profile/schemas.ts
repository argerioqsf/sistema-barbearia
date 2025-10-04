import { z } from 'zod'
import { HHmmRegex, ISODateTime, isValidCPF, toMinutes, UUID } from '../schemas'
import { RoleSchema } from '../roles/schemas'
import { UserProductBaseSchema, UserServiceSchema } from '../users/schemas'
import { PermissionSchema } from '../permissions/schemas'
import { PlanProfileSchema } from '../plans/schema'
import { UnitOpeningHoursSchema } from '../units/schemas'

export const ProfileWorkHourSchema = z
  .object({
    id: UUID(),
    profileId: UUID(),
    weekDay: z
      .number()
      .int()
      .min(0, 'weekDay deve estar entre 0 e 6')
      .max(6, 'weekDay deve estar entre 0 e 6'),
    startHour: z
      .string()
      .regex(HHmmRegex, 'endHour deve estar no formato HH:mm'),
    endHour: z.string().regex(HHmmRegex, 'endHour deve estar no formato HH:mm'),
  })
  .passthrough()
  .superRefine((data, ctx) => {
    const start = toMinutes(data.startHour)
    const end = toMinutes(data.endHour)
    if (end <= start) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['endHour'],
        message: 'endHour deve ser maior que startHour',
      })
    }
  })

export const ProfileBlockedHourSchema = z
  .object({
    id: UUID(),
    profileId: UUID(),
    startHour: ISODateTime(),
    endHour: ISODateTime(),
  })
  .superRefine((data, ctx) => {
    if (data.endHour <= data.startHour) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['endHour'],
        message: 'endHour deve ser maior que startHour',
      })
    }
  })

export const ProfileBaseSchema = z
  .object({
    id: UUID(),
    phone: z.string().min(1, 'phone é obrigatório'),
    cpf: z.string().min(11, 'cpf inválido').refine(isValidCPF, 'cpf inválido'),
    genre: z.string().min(1),
    birthday: z.string().min(1),
    pix: z.string().min(1),
    roleId: z.string().uuid().or(z.string().min(1)),
    commissionPercentage: z.number().default(0),
    totalBalance: z.number().default(0),
    userId: z.string().uuid().or(z.string().min(1)),
    createdAt: z.coerce.date(),
    permissions: z.array(PermissionSchema).optional(),
    role: RoleSchema.optional(),
    barberServices: z.array(UserServiceSchema).optional(),
    barberProducts: z.array(UserProductBaseSchema).optional(),
    workHours: z.array(ProfileWorkHourSchema).optional(),
    blockedHours: z.array(ProfileBlockedHourSchema).optional(),
    plans: z.array(PlanProfileSchema).optional(),
  })
  .passthrough()

export const ProfileSchema = z.lazy(() => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const userSchemas = require('../users/schemas')
  return ProfileBaseSchema.extend({
    user: userSchemas.UserBaseSchema.optional(),
  })
})

export type Profile = z.infer<typeof ProfileSchema>

export const ProfileGetResponseSchema = z.object({
  profile: ProfileSchema,
  openingHours: z.array(UnitOpeningHoursSchema),
})

export type ZProfile = z.infer<typeof ProfileSchema>
