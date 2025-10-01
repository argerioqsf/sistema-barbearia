'use server'

import { Graphics, ReturnGet } from '@/types/general'
import { fetchGraphics } from '@/features/graphics/api'
import { toNormalizedError } from '@/shared/errors/to-normalized-error'

export async function getGraphics(): Promise<ReturnGet<Graphics>> {
  try {
    const graphics = await fetchGraphics()
    return { response: graphics as Graphics }
  } catch (error) {
    return { error: toNormalizedError('Error unknown') }
  }
}
