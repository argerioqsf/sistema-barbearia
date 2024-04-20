import { z } from 'zod'

const envSchema = z.object({
  API_BASE_URL: z.string().url(),
})

const parseEnv = envSchema.safeParse({
  API_BASE_URL: process.env.API_BASE_URL,
})

if (!parseEnv.success) {
  console.log(
    'invalid enviroments variables',
    parseEnv.error.flatten().fieldErrors,
  )

  throw new Error('invalid enviroments variables')
}

export const env = parseEnv.data
