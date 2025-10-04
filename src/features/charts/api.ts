import { api } from '@/data/api'
import { ConsultantsListResponseSchema } from './schemas'
import { getBackendToken } from '@/utils/authServer'

export async function fetchCharts() {
  const token = await getBackendToken()
  const response = await api(
    '/consultants',
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
      next: { tags: ['charts'], revalidate: 60 * 4 },
    },
    '1',
    {},
  )
  if (!response.ok) throw new Error((await response.json()).message)
  const parsed = ConsultantsListResponseSchema.safeParse(await response.json())
  if (!parsed.success) throw new Error('Invalid charts response')
  return parsed.data
}
