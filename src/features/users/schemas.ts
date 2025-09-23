import { z } from 'zod'
import { ISODate, ISODateTime, UUID } from '../schemas'

export const ProfileSchema = z
  .object({
    id: UUID(),
    phone: z.string(),
    cpf: z.string(),
    genre: z.string(), // valores variam ("M", "F", "man"...)
    birthday: ISODate(),
    pix: z.string(),
    roleId: UUID(),
    commissionPercentage: z.number(),
    totalBalance: z.number(),
    userId: UUID(),
    createdAt: ISODateTime(),
    role: z.string().optional(),
  })
  .passthrough()

export const UserSchema = z
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
    profile: ProfileSchema,
  })
  .passthrough()

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
  method: z.string().optional(),
  clientId: UUID().optional(),
})
export type BodyRegisterUser = z.infer<typeof bodyRegisterUserSchema>
