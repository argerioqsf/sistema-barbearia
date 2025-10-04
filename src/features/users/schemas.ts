import { z } from 'zod'
import { ISODateTime, UUID } from '../schemas'

export const CommissionCalcTypeSchema = z.enum([
  'PERCENTAGE_OF_ITEM',
  'PERCENTAGE_OF_USER',
  'PERCENTAGE_OF_USER_ITEM',
])

export type CommissionCalcType = z.infer<typeof CommissionCalcTypeSchema>

export const UserServiceSchema = z
  .object({
    id: UUID(),
    profileId: UUID(),
    serviceId: UUID(),
    time: z
      .number()
      .int()
      .positive()
      .max(24 * 60, 'tempo máximo de 1440 min (24h)')
      .optional(), // tempo em minutos (opcional no seu modelo)
    commissionPercentage: z
      .number()
      .nonnegative('comissão não pode ser negativa')
      .max(100, 'comissão percentual não pode exceder 100%')
      .optional(),
    commissionType: CommissionCalcTypeSchema,
  })
  .passthrough()

export const UserProductBaseSchema = z
  .object({
    id: UUID(),
    profileId: UUID(),
    productId: UUID(),
    commissionPercentage: z.number().nonnegative().max(100).optional(),
    commissionType: CommissionCalcTypeSchema,
  })
  .passthrough()

export const UserBaseSchema = z
  .object({
    id: UUID(),
    name: z.string(),
    email: z.string().email(),
    active: z.boolean(),
    organizationId: UUID(),
    unitId: UUID(),
    versionToken: z.number(),
    versionTokenInvalidate: z.number().nullable(),
    createdAt: ISODateTime(),
  })
  .passthrough()

export const UserSchema = z.lazy(() => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const profileSchemas = require('../profile/schemas')
  return UserBaseSchema.extend({
    profile: profileSchemas.ProfileBaseSchema.optional(),
  })
})

export const userListAllResponseSchema = z.object({
  users: z.array(UserSchema),
})

export const usersListPaginateResponseSchema = z.object({
  items: z.array(UserSchema),
  count: z.number(),
  page: z.number(),
  perPage: z.number(),
})

export const UsersClientListResponseSchema = z.array(UserSchema)

export type ZUser = z.infer<typeof UserSchema>

export const bodyRegisterUserSchema = z.object({
  observation: z.string().optional(),
  method: z.enum(['CASH', 'PIX', 'CREDIT_CARD', 'DEBIT_CARD']).optional(),
  clientId: UUID().optional(),
})
export type BodyRegisterUser = z.infer<typeof bodyRegisterUserSchema>
