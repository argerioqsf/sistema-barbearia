'use server'

import { api } from '@/data/api'
import { Graphics, ReturnGet } from '@/types/general'
import { getTokenFromCookieServer } from '@/utils/cookieServer'

export async function getGraphics(): Promise<ReturnGet<Graphics>> {
  try {
    const token = getTokenFromCookieServer()
    const response = await api('/graphics', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ['leads'], revalidate: 60 * 4 },
    })

    if (!response.ok) {
      const errorMessage = await response.text()
      return {
        error: { request: JSON.parse(errorMessage).message },
      }
    }
    const files = await response.json()
    return { response: files }
  } catch (error) {
    return { error: { request: 'Error unknown' } }
  }
}
