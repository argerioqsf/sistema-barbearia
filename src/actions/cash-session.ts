'use server'

import { InitialState, ReturnGet, ReturnList } from '@/types/general'
import { revalidateTag } from 'next/cache'
import {
  getCashSession as getCashSessionAPI,
  openCashSession as openCashSessionAPI,
  closeCashSession as closeCashSessionAPI,
} from '@/features/cash-session/api'
import { ZCashSession } from '@/features/cash-session/schemas'

export async function getOpenCashSession(): Promise<ReturnGet<ZCashSession>> {
  try {
    const sessions = await getCashSessionAPI()
    const sessionOpen = sessions.find((s: ZCashSession) => !s.closedAt)
    return { response: sessionOpen }
  } catch (error) {
    return { error: { request: 'Error unknown' } }
  }
}

export async function getCashSessions(): Promise<ReturnList<ZCashSession>> {
  try {
    const sessions = await getCashSessionAPI()
    return { response: sessions }
  } catch (error) {
    return { error: { request: 'Error unknown' } }
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
