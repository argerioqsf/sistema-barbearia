import type { DefaultSession } from 'next-auth'
import type { JWT as DefaultJWT } from 'next-auth/jwt'
import type { User as AppUser } from '@/types/general'

type AuthUser = Pick<AppUser, 'id' | 'name' | 'email'> & {
  profile?: { role?: unknown }
}

type RolesPayload = Record<string, boolean> | string[] | undefined

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user?: AuthUser
    roles?: RolesPayload
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    accessToken?: string
    user?: AuthUser
    roles?: RolesPayload
  }
}
