'use server'

import { listRoles } from '@/features/roles/api'
import { ReturnRequest } from '@/types/general'
import { ZRole } from '@/features/roles/schemas'
import { handleRequestError } from '@/shared/errors/handlerRequestError'

export async function listRolesAction(): Promise<ReturnRequest<ZRole[]>> {
  try {
    const data = await listRoles()
    return { ok: true, data }
  } catch (error) {
    const normalized = handleRequestError(error, {
      rethrow: false,
    })
    return { ok: false, error: normalized }
  }
}
