'use server'

import { InitialState, ReturnRequest } from '@/types/general'
import { revalidateTag } from 'next/cache'
import {
  getCashSessionApi,
  openCashSession as openCashSessionAPI,
  closeCashSession as closeCashSessionAPI,
  getOpenCashSessionApi,
} from '@/features/cash-session/api'
import { ZCashSession } from '@/features/cash-session/schemas'
import { handleRequestError } from '@/shared/errors/handlerRequestError'

export async function getOpenCashSession(): Promise<
  ReturnRequest<ZCashSession | null>
> {
  try {
    const session = await getOpenCashSessionApi()
    return { ok: true, data: session }
  } catch (error) {
    const normalized = handleRequestError(error, {
      rethrow: false,
    })
    return { ok: false, error: normalized }
  }
}

export async function getCashSessions(): Promise<
  ReturnRequest<ZCashSession[]>
> {
  try {
    const session = await getCashSessionApi()
    return { ok: true, data: session }
  } catch (error) {
    const normalized = handleRequestError(error, {
      rethrow: false,
    })
    return { ok: false, error: normalized }
  }
}

export async function openCashSession(
  _prev: InitialState<object>,
  formData: FormData,
): Promise<InitialState<object>> {
  try {
    const initialAmount = Number(formData.get('initialAmount') ?? 0)
    await openCashSessionAPI(initialAmount)
    revalidateTag('cash-session')
    return { ok: true, errors: {} }
  } catch (error) {
    return { errors: { request: 'Falha ao abrir o caixa' } }
  }
}

export async function closeCashSession(): Promise<InitialState<object>> {
  try {
    await closeCashSessionAPI()
    revalidateTag('cash-session')
    return { ok: true, errors: {} }
  } catch (error) {
    return { errors: { request: 'Falha ao fechar o caixa' } }
  }
}

// Compatibility wrapper for useFormState in client components
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function closeCashSessionForm(
  _prev: InitialState<object>, // eslint-disable-line @typescript-eslint/no-unused-vars
  _formData: FormData, // eslint-disable-line @typescript-eslint/no-unused-vars
): Promise<InitialState<object>> {
  return closeCashSession()
}
