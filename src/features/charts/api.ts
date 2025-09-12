import { api } from '@/data/api'
import { getTokenFromCookieServer } from '@/utils/cookieServer'
import { ConsultantsListResponseSchema } from './schemas'

export async function fetchCharts() {
  const token = getTokenFromCookieServer()
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
