'use server'

import { handleRequestError } from '@/shared/errors/handlerRequestError'
import type { InitialState, ReturnRequest } from '@/types/general'
import { createWithdrawal } from '@/features/withdrawals/api'
import { ZTransaction } from '@/features/transactions/schemas'
import { logger } from '@/shared/logger'

export async function createWithdrawalAction(
  prevState: InitialState<ZTransaction[]>,
  formData: FormData,
): Promise<ReturnRequest<ZTransaction[]>> {
  try {
    const result = await createWithdrawal(formData)
    logger.debug({ result })
    return { ok: true, data: result }
  } catch (e) {
    const normalized = handleRequestError(e, {
      rethrow: false,
    })
    return { ok: false, error: normalized }
  }
}
