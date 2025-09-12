'use server'

import { Graphics, ReturnGet } from '@/types/general'
import { fetchGraphics } from '@/features/graphics/api'

export async function getGraphics(): Promise<ReturnGet<Graphics>> {
  try {
    const graphics = await fetchGraphics()
    return { response: graphics as unknown as Graphics }
  } catch (error) {
    return { error: { request: 'Error unknown' } }
  }
}
