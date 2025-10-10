'use server'

import { listPermissions } from '@/features/permissions/api'
import { ReturnRequest } from '@/types/general'
import { ZPermission } from '@/features/permissions/schemas'
import { handleRequestError } from '@/shared/errors/handlerRequestError'

export async function listPermissionsAction(): Promise<
  ReturnRequest<ZPermission[]>
> {
  try {
    const data = await listPermissions()
    return { ok: true, data }
  } catch (error) {
    const normalized = handleRequestError(error, {
      rethrow: false,
    })
    return { ok: false, error: normalized }
  }
}
