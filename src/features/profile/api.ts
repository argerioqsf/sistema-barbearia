import { api } from '@/data/api'
import { HttpError } from '@/shared/errors/httpError'
import { readMessage, safeJson } from '@/shared/http'
import { getBackendToken } from '@/utils/authServer'
import { ValidationError } from '@/shared/errors/validationError'
import { Profile, ProfileGetResponseSchema } from './schemas'
import { UnitOpeningHours } from '../units/schemas'

export async function fetchProfile(): Promise<{
  profile: Profile
  openingHours: UnitOpeningHours[]
}> {
  const token = await getBackendToken()
  const response = await api(`/profile`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
    next: { tags: ['users'], revalidate: 60 * 4 },
  })
  if (!response.ok) {
    const message = await readMessage(response)
    throw new HttpError(response.status, message)
  }
  const json = await safeJson(response)
  const parsed = ProfileGetResponseSchema.safeParse(json)
  if (!parsed.success) {
    throw ValidationError.fromZod(parsed.error, 'Invalid response get profile')
  }
  return parsed.data
}
