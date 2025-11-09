import { api } from '@/data/api'
import { ZTransaction } from '@/features/transactions/schemas'
import { HttpError } from '@/shared/errors/httpError'
import { readMessage } from '@/shared/http'
import { logger } from '@/shared/logger'
import { getBackendToken } from '@/utils/authServer'
import { revalidateTag } from 'next/cache'
import { WithdrawalFormSchema } from './schemas'
import { ValidationError } from '@/shared/errors/validationError'

export async function createWithdrawal(
  payload: FormData,
): Promise<ZTransaction[]> {
  const validationResult = WithdrawalFormSchema.safeParse({
    type: payload.get('type'),
    amount: payload.get('amount'),
    description: payload.get('description'),
    affectedUserId: payload.get('affectedUserId'),
    receipt: payload.get('receipt'),
    unitId: payload.get('unitId'),
    reason: payload.get('reason'),
  })

  if (!validationResult.success) {
    logger.debug({ error_validation: validationResult.error })
    throw ValidationError.fromZod(
      validationResult.error,
      'Invalid body request pay sale',
    )
  }
  const token = await getBackendToken()
  const response = await api('/withdrawal/transactions', {
    method: 'POST',
    body: payload,
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!response.ok) {
    const message = await readMessage(response)
    logger.debug({ error: message })
    throw new HttpError(response.status, message)
  }
  if (validationResult.data.type === 'UNIT') {
    revalidateTag(validationResult.data.unitId)
  }
  if (validationResult.data.affectedUserId) {
    revalidateTag(validationResult.data.affectedUserId)
    revalidateTag('users')
  }
  const json = response.json()
  // logger.debug({ json })
  return json
}
