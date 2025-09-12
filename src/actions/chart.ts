import { ReturnList, User } from '@/types/general'
import { fetchCharts } from '@/features/charts/api'

export async function getCharts(): Promise<ReturnList<User>> {
  try {
    const { users, count } = await fetchCharts()
    return { response: users as unknown as User[], count }
  } catch (error) {
    return { error: { request: 'Error unknown' } }
  }
}
