import { api } from '@/data/api'
import { ReturnList, User } from '@/types/general'
import { getTokenFromCookieServer } from '@/utils/cookieServer'

export async function listSelectConsultants(): Promise<ReturnList<User>> {
  try {
    const token = getTokenFromCookieServer()
    const response = await api(`/consultant/select`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ['consultants'], revalidate: 60 * 4 },
    })

    if (!response.ok) {
      const errorMessage = await response.text()
      return {
        error: { request: JSON.parse(errorMessage).message },
      }
    }
    const { user } = await response.json()
    return { response: user }
  } catch (error) {
    return { error: { request: 'Error unknown' } }
  }
}
