'use server'

import { fetchCollaboratorDashboard } from '@/features/collaborators/api'
import type { CollaboratorDashboard } from '@/features/collaborators/schemas'
import type { ReturnRequest } from '@/types/general'
import { handleRequestError } from '@/shared/errors/handlerRequestError'

export async function getCollaboratorDashboard(): Promise<
  ReturnRequest<CollaboratorDashboard>
> {
  try {
    const data = await fetchCollaboratorDashboard()
    return { ok: true, data }
  } catch (error) {
    const normalized = handleRequestError(error, { rethrow: false })
    return { ok: false, error: normalized }
  }
}
