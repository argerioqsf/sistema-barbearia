import { api } from '@/data/api'
import { getBackendToken } from '@/utils/authServer'
import { LeadsListResponseSchema, LeadSchema } from './schemas'
// TODO: Remover leads do projeto
export async function fetchLeads(
  page?: string,
  where?: Record<string, unknown>,
) {
  const token = await getBackendToken()
  const response = await api(
    '/leads',
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
      next: { tags: ['leads'], revalidate: 60 * 4 },
    },
    page,
    where,
  )
  if (!response.ok) throw new Error((await response.json()).message)
  const parsed = LeadsListResponseSchema.safeParse(await response.json())
  if (!parsed.success) throw new Error('Invalid leads list response')
  return parsed.data
}

export async function fetchLead(id: string) {
  const token = await getBackendToken()
  const response = await api(`/lead/${id}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
    next: { tags: [id], revalidate: 60 * 4 },
  })
  if (!response.ok) throw new Error((await response.json()).message)
  const parsed = LeadSchema.safeParse(await response.json())
  if (!parsed.success) throw new Error('Invalid lead response')
  return parsed.data
}
