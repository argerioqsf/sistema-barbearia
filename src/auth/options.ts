import NextAuth, { type NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { env } from '@/env'
import type { User as AppUser } from '@/types/general'

type RolesPayload = Record<string, boolean> | string[] | undefined
type AuthResponse = { token: string; user: AppUser; roles?: RolesPayload }

function isAuthResponse(u: unknown): u is AuthResponse {
  return (
    typeof u === 'object' &&
    u !== null &&
    'token' in (u as Record<string, unknown>) &&
    'user' in (u as Record<string, unknown>)
  )
}

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        try {
          const resp = await fetch(new URL('/sessions', env.API_BASE_URL), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          })
          if (!resp.ok) return null
          const data: AuthResponse = await resp.json()
          // Expected: { token, user, roles }
          if (!data?.token || !data?.user) return null
          return { id: data.user.id, ...data }
        } catch {
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Persist backend token and user payload
      if (isAuthResponse(user)) {
        const u = user
        token.accessToken = u.token
        // Extract role from various shapes
        const roleRaw: unknown = (u.user as unknown as AppUser)?.profile?.role
        const roleName =
          typeof roleRaw === 'string'
            ? roleRaw
            : roleRaw && typeof roleRaw === 'object' && 'name' in roleRaw
              ? ((roleRaw as { name?: unknown }).name as string | undefined)
              : undefined
        token.user = {
          id: u.user.id,
          name: u.user.name,
          email: u.user.email,
          profile: { role: roleName },
        }
        token.roles = u.roles
      }
      return token
    },
    async session({ session, token }) {
      // Do NOT expose access token on the client
      session.user = token.user
      session.roles = token.roles as RolesPayload | undefined
      return session
    },
  },
}

export const { auth } = NextAuth(authOptions)
