import { api } from '@/data/api'
import { getBackendToken } from '@/utils/authServer'
import { readMessage, safeJson } from '@/shared/http'
import { CollaboratorDashboardSchema } from './schemas'

export async function fetchCollaboratorDashboard() {
  const token = await getBackendToken()
  const response = await api('/collaborators/me/dashboard', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
    next: { tags: ['collaborator-dashboard'], revalidate: 60 * 2 },
  })

  if (!response.ok) {
    throw new Error(await readMessage(response))
  }

  const json = await safeJson(response)
  return CollaboratorDashboardSchema.parse(json)
}
