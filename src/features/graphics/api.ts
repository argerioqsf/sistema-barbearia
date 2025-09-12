import { api } from '@/data/api'
import { getBackendToken } from '@/utils/authServer'
import { GraphicsSchema } from './schemas'

export async function fetchGraphics() {
  const token = await getBackendToken()
  const response = await api('/graphics', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
    next: { tags: ['leads'], revalidate: 60 * 4 },
  })
  if (!response.ok) throw new Error((await response.json()).message)
  const parsed = GraphicsSchema.safeParse(await response.json())
  if (!parsed.success) throw new Error('Invalid graphics response')
  return parsed.data
}
