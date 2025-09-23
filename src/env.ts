import { z } from 'zod'

const envSchema = z.object({
  API_BASE_URL: z.string().url(),
  BASE_URL: z.string().url(),
  NEXT_INTL_TIMEZONE: z.string(),
})

const parseEnv = envSchema.safeParse({
  API_BASE_URL: process.env.API_BASE_URL,
  BASE_URL: process.env.BASE_URL,
  NEXT_INTL_TIMEZONE: process.env.NEXT_INTL_TIMEZONE,
})

if (!parseEnv.success) {
  // Prefer console.error in server context
  console.error(
    'invalid environment variables',
    parseEnv.error.flatten().fieldErrors,
  )
  throw new Error('invalid environment variables')
}

export const env = parseEnv.data
