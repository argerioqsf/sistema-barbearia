import { api } from '@/data/api'
import { getBackendToken } from '@/utils/authServer'
import type { QueryParams } from '@/types/http'
import { readMessage, safeJson } from '@/shared/http'

async function get<
  TParams extends Record<string, unknown> = Record<string, unknown>,
>(path: string, params?: QueryParams<TParams>) {
  const token = await getBackendToken()
  const response = await api(
    path,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
      next: { tags: ['reports'], revalidate: 60 * 5 },
    },
    undefined,
    params,
  )
  if (!response.ok) throw new Error(await readMessage(response))
  return safeJson(response)
}

export const fetchSalesReport = (
  params?: QueryParams<Record<string, unknown>>,
) => get('/reports/sales', params)
export const fetchBarberBalanceReport = (barberId: string) =>
  get(`/reports/barber/${barberId}/balance`)
export const fetchOwnerBalanceReport = (ownerId: string) =>
  get(`/reports/owner/${ownerId}/balance`)
export const fetchCashSessionReport = (sessionId: string) =>
  get(`/reports/cash-session/${sessionId}`)
export const fetchUnitLoanBalanceReport = (unitId: string) =>
  get(`/reports/unit/${unitId}/loan-balance`)
export const fetchUserProductsReport = (userId: string) =>
  get(`/reports/user/${userId}/products`)
