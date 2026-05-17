import NextAuth, { type NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import type { JWT } from 'next-auth/jwt'
import { env } from '@/env'
import { ZUser } from '@/features/users/schemas'
import { readMessage } from '@/shared/http'
import { logger } from '@/shared/logger'

type TokenPair = {
  token: string
  refreshToken: string
  tokenExpiresIn: number
  refreshTokenExpiresIn: number
}

type AuthResponse = TokenPair & { user: ZUser }

function isAuthResponse(u: unknown): u is AuthResponse {
  return (
    typeof u === 'object' &&
    u !== null &&
    'token' in (u as Record<string, unknown>) &&
    'refreshToken' in (u as Record<string, unknown>) &&
    'tokenExpiresIn' in (u as Record<string, unknown>) &&
    'refreshTokenExpiresIn' in (u as Record<string, unknown>) &&
    'user' in (u as Record<string, unknown>)
  )
}

function computeExpiryMs(seconds?: number): number | undefined {
  if (typeof seconds !== 'number' || Number.isNaN(seconds)) return undefined
  return Date.now() + seconds * 1000
}

function shouldRefreshAccessToken(token: JWT): boolean {
  if (!token.accessToken || !token.refreshToken) return false
  if (!token.accessTokenExpires) return false
  const safetyWindowMs = 60 * 1000 // 1 minute
  return Date.now() >= token.accessTokenExpires - safetyWindowMs
}

async function refreshAccessToken(token: JWT): Promise<JWT> {
  if (!token.refreshToken) {
    throw new Error('Refresh token não encontrado na sessão atual.')
  }

  const response = await fetch(new URL('/sessions/refresh', env.API_BASE_URL), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken: token.refreshToken }),
  })

  if (!response.ok) {
    const message = await readMessage(response)
    logger.warn(message || 'Falha ao renovar token', 'refreshAccessToken')
    throw new Error(message || 'Falha ao renovar token')
  }

  const data: TokenPair = await response.json()
  return {
    ...token,
    accessToken: data.token,
    refreshToken: data.refreshToken,
    accessTokenExpires: computeExpiryMs(data.tokenExpiresIn),
    refreshTokenExpires: computeExpiryMs(data.refreshTokenExpiresIn),
    error: undefined,
  }
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/',
  },
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
          // Expected: { token, refreshToken, user, tokenExpiresIn, refreshTokenExpiresIn }
          if (
            !data?.token ||
            !data?.refreshToken ||
            !data?.user ||
            typeof data.tokenExpiresIn !== 'number' ||
            typeof data.refreshTokenExpiresIn !== 'number'
          )
            return null
          return { id: data.user.id, ...data }
        } catch (err) {
          console.log(err)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // Persist backend token and user payload
      if (isAuthResponse(user)) {
        const u = user
        const userApp = u.user as ZUser
        token.accessToken = u.token
        token.refreshToken = u.refreshToken
        token.accessTokenExpires = computeExpiryMs(u.tokenExpiresIn)
        token.refreshTokenExpires = computeExpiryMs(u.refreshTokenExpiresIn)
        token.error = undefined
        // Extract role from various shapes
        const roleRaw = userApp?.profile?.role
        const roleName = roleRaw?.name
        token.user = {
          id: u.user.id,
          name: u.user.name,
          email: u.user.email,
          profile: { role: { name: roleName } },
          unitId: u.user.unitId,
        }
      }
      if (trigger === 'update') {
        const sessionUpdate = session as
          | (Record<string, unknown> & {
              accessToken?: string
              refreshToken?: string
              accessTokenExpires?: number
              refreshTokenExpires?: number
              user?: unknown
            })
          | undefined
        const nextAccessToken = sessionUpdate?.accessToken
        if (typeof nextAccessToken === 'string') {
          token.accessToken = nextAccessToken
          token.accessTokenExpires =
            typeof sessionUpdate?.accessTokenExpires === 'number'
              ? sessionUpdate.accessTokenExpires
              : token.accessTokenExpires
        }
        const nextRefreshToken = sessionUpdate?.refreshToken
        if (typeof nextRefreshToken === 'string') {
          token.refreshToken = nextRefreshToken
        }
        if (typeof sessionUpdate?.refreshTokenExpires === 'number') {
          token.refreshTokenExpires = sessionUpdate.refreshTokenExpires
        }
        if (
          typeof sessionUpdate?.accessTokenExpires === 'number' &&
          typeof nextAccessToken !== 'string'
        ) {
          token.accessTokenExpires = sessionUpdate.accessTokenExpires
        }
        if (sessionUpdate?.user && typeof sessionUpdate.user === 'object') {
          token.user = {
            ...(token.user ?? {}),
            ...(sessionUpdate.user as Record<string, unknown>),
          } as typeof token.user
        }
      }

      if (
        token.refreshTokenExpires &&
        Date.now() >= token.refreshTokenExpires
      ) {
        token.error = 'RefreshTokenExpired'
      } else if (shouldRefreshAccessToken(token)) {
        try {
          token = await refreshAccessToken(token)
        } catch (error) {
          console.error('Failed to refresh backend token via NextAuth', error)
          token.error = 'RefreshAccessTokenError'
        }
      }

      return token
    },
    async session({ session, token }) {
      if (typeof token.accessToken === 'string') {
        session.accessToken = token.accessToken
      }
      if (typeof token.error === 'string') {
        session.error = token.error
      }
      if (typeof token.accessTokenExpires === 'number') {
        session.tokenExpiresAt = token.accessTokenExpires
      }
      if (typeof token.refreshTokenExpires === 'number') {
        session.refreshTokenExpiresAt = token.refreshTokenExpires
      }
      session.user = token.user
      return session
    },
  },
}

export const { auth } = NextAuth(authOptions)
