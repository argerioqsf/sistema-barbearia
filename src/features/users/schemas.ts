import { z } from 'zod'
import { ISODateTime, isValidCPF, UUID } from '../schemas'

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
      .optional()
      .nullable(), // tempo em minutos (opcional no seu modelo)
    commissionPercentage: z
      .number()
      .nonnegative('comissão não pode ser negativa')
      .max(100, 'comissão percentual não pode exceder 100%')
      .optional()
      .nullable(),
    commissionType: CommissionCalcTypeSchema,
  })
  .passthrough()

export type ZUserService = z.infer<typeof UserServiceSchema>

export const UserProductBaseSchema = z
  .object({
    id: UUID(),
    profileId: UUID(),
    productId: UUID(),
    commissionPercentage: z
      .number()
      .nonnegative('comissão não pode ser negativa')
      .max(100, 'comissão percentual não pode exceder 100%')
      .max(100)
      .optional()
      .nullable(),
    commissionType: CommissionCalcTypeSchema,
  })
  .passthrough()

export type ZUserProduct = z.infer<typeof UserProductBaseSchema>

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

const LoansUserSchema = z.object({
  pending: z.array(z.any()),
  paid: z.array(z.any()),
  totalOwed: z.number(),
})

export const UserSchema = z.lazy(() => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const profileSchemas = require('../profile/schemas')
  return UserBaseSchema.extend({
    profile: profileSchemas.ProfileBaseSchema.optional(),
    loans: LoansUserSchema.optional(),
  })
})

export const userListAllResponseSchema = z.array(UserSchema)

export const usersListPaginateResponseSchema = z.object({
  items: z.array(UserSchema),
  count: z.number(),
  page: z.number(),
  perPage: z.number(),
})

export const UsersClientListResponseSchema = z.array(UserSchema)

export const UserCreateResponseSchema = z.object({
  user: UserSchema,
})

export const UserUpdateStatusResponseSchema = z.object({
  user: UserSchema,
})

export type ZUser = z.infer<typeof UserSchema>

export const userRegisterBodySchema = z.object({
  name: z.string().min(3, 'Nome precisa ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha precisa ter no mínimo 6 caracteres'),
  phone: z.string().optional(),
  cpf: z
    .string()
    .min(11, 'cpf inválido')
    .refine(isValidCPF, 'cpf inválido')
    .optional(),
  genre: z.string().optional().nullable(),
  birthday: z.string().optional(),
  pix: z.string().optional(),
  unitId: UUID().optional(),
  roleId: UUID(),
  permissions: z.array(UUID()).optional(),
  commissionPercentage: z.number().optional(),
  services: z
    .array(
      z.object({
        serviceId: UUID(),
        time: z.number().optional().nullable(),
        commissionPercentage: z.number().optional().nullable(),
        commissionType: CommissionCalcTypeSchema.optional(),
      }),
    )
    .optional(),
  products: z
    .array(
      z.object({
        productId: UUID(),
        commissionPercentage: z.number().optional().nullable(),
        commissionType: CommissionCalcTypeSchema.optional(),
      }),
    )
    .optional(),
})

export type UserRegisterBody = z.infer<typeof userRegisterBodySchema>

export const userUpdateBodySchema = userRegisterBodySchema.partial().extend({
  removeServiceIds: z.array(UUID()).optional(),
  removeProductIds: z.array(UUID()).optional(),
})

export type UserUpdateBody = z.infer<typeof userUpdateBodySchema>
