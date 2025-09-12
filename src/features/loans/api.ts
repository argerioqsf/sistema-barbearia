import { api } from '@/data/api'
import { getBackendToken } from '@/utils/authServer'
import { LoanSchema, LoansListSchema, type ZLoan } from './schemas'
import { readMessage, safeJson } from '@/shared/http'

export async function createLoan(amount: number): Promise<ZLoan> {
  const token = await getBackendToken()
  const response = await api('/loans', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ amount }),
  })
  if (!response.ok) throw new Error(await readMessage(response))
  return LoanSchema.parse(await safeJson(response))
}

export async function listUserLoans(userId: string): Promise<ZLoan[]> {
  const token = await getBackendToken()
  const response = await api(`/users/${userId}/loans`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
    next: { tags: ['loans', userId], revalidate: 60 * 2 },
  })
  if (!response.ok) throw new Error(await readMessage(response))
  const json = await safeJson(response)
  if (Array.isArray(json)) return json.map((i) => LoanSchema.parse(i))
  return LoansListSchema.parse(json).loans
}

export async function updateLoanStatus(
  id: string,
  status: string,
): Promise<ZLoan> {
  const token = await getBackendToken()
  const response = await api(`/loans/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  })
  if (!response.ok) throw new Error(await readMessage(response))
  return LoanSchema.parse(await safeJson(response))
}

export async function payLoan(id: string, amount: number): Promise<ZLoan> {
  const token = await getBackendToken()
  const response = await api(`/loans/${id}/pay`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ amount }),
  })
  if (!response.ok) throw new Error(await readMessage(response))
  return LoanSchema.parse(await safeJson(response))
}
