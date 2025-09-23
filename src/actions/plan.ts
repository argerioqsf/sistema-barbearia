'use server'

import { fetchPlans } from '@/features/plans/api'
import { ZPlan } from '@/features/plans/schema'
import { ReturnList } from '@/types/general'

export async function listPlans(): Promise<ReturnList<ZPlan>> {
  try {
    const { items, count } = await fetchPlans()
    return { response: items, count }
  } catch (e) {
    return {
      error: {
        message: e instanceof Error ? e.message : 'Error unknown',
        type: 'unknown',
      },
    }
  }
}
