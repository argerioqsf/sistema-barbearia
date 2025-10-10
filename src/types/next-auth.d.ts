import type { DefaultSession } from 'next-auth'
import type { JWT as DefaultJWT } from 'next-auth/jwt'
import type { RoleName } from '@/features/roles/schemas'
import { ZUser } from '@/features/users/schemas'

export type AuthUser = Pick<ZUser, 'id' | 'name' | 'email' | 'unitId'> & {
  profile?: { role?: { name?: RoleName } }
}

type RolesPayload = Record<string, boolean> | string[] | undefined

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user?: AuthUser
    roles?: RolesPayload
    accessToken?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    accessToken?: string
    user?: AuthUser
    roles?: RolesPayload
  }
}
