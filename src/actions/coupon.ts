'use server'

import { ReturnGet, ReturnList, InitialState } from '@/types/general'
import { fetchCoupon, fetchCoupons } from '@/features/coupons/api'
import type { QueryParams } from '@/types/http'
import type { ZCoupon as Coupon } from '@/features/coupons/schemas'
import { api } from '@/data/api'
import { getBackendToken } from '@/utils/authServer'
import { revalidateTag } from 'next/cache'
import { toNormalizedError } from '@/shared/errors/to-normalized-error'

export async function listCoupons(
  page?: string,
  where?: QueryParams<Coupon>,
): Promise<ReturnList<Coupon>> {
  try {
    const { coupons, count } = await fetchCoupons(page, where)
    return { response: coupons, count }
  } catch (error) {
    return {
      error: toNormalizedError(
        error instanceof Error ? error.message : 'Error unknown',
      ),
    }
  }
}

export async function getCoupon(id: string): Promise<ReturnGet<Coupon>> {
  try {
    const coupon = await fetchCoupon(id)
    return { response: coupon }
  } catch (error) {
    return {
      error: toNormalizedError(
        error instanceof Error ? error.message : 'Error unknown',
      ),
    }
  }
}

export async function registerCoupon(
  prevState: InitialState<Coupon>,
  formData: FormData,
): Promise<InitialState<Coupon>> {
  try {
    const token = await getBackendToken()
    const json = Object.fromEntries(formData.entries())
    const response = await api('/coupons', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(json),
    })
    if (!response.ok) {
      const errorMessage = await response.text()
      return { errors: { request: JSON.parse(errorMessage).message } }
    }
    revalidateTag('coupons')
    return { ok: true, errors: {} }
  } catch {
    return { errors: { request: 'Failed to register coupon' } }
  }
}

export async function updateCoupon(
  id: string,
  prevState: InitialState<Coupon>,
  formData: FormData,
): Promise<InitialState<Coupon>> {
  try {
    const token = await getBackendToken()
    const json = Object.fromEntries(formData.entries())
    const response = await api(`/coupons/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(json),
    })
    if (!response.ok) {
      const errorMessage = await response.text()
      return { errors: { request: JSON.parse(errorMessage).message } }
    }
    revalidateTag('coupons')
    revalidateTag(id)
    return { ok: true, errors: {} }
  } catch {
    return { errors: { request: 'Failed to update coupon' } }
  }
}

export async function deleteCoupon(id?: string): Promise<InitialState<Coupon>> {
  if (!id) throw new Error('Id undefined')
  try {
    const token = await getBackendToken()
    const response = await api(`/coupons/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!response.ok) {
      const errorMessage = await response.text()
      return { errors: { request: JSON.parse(errorMessage).message } }
    }
    revalidateTag('coupons')
    return { ok: true, errors: {} }
  } catch {
    return { errors: { request: 'Failed to delete coupon' } }
  }
}
