import { api } from '@/data/api'
import { ReturnList, User } from '@/types/general'
import { getTokenFromCookieServer } from '@/utils/cookieServer'

export async function getCharts(): Promise<ReturnList<User>> {
  try {
    const token = getTokenFromCookieServer()
    const response = await api(
      '/consultants',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { tags: ['charts'], revalidate: 60 * 4 },
      },
      '1',
      {},
    )

    if (!response.ok) {
      const errorMessage = await response.text()
      return {
        error: { request: JSON.parse(errorMessage).message },
      }
    }
    const { users, count } = await response.json()
    return { response: users, count }
  } catch (error) {
    return { error: { request: 'Error unknown' } }
  }
}
