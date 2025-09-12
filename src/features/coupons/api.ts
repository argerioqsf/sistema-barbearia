import { api } from '@/data/api'
import { getBackendToken } from '@/utils/authServer'
import {
  CouponsListResponseSchema,
  CouponDetailResponseSchema,
  CouponSchema,
} from './schemas'
import { safeJson, readMessage, updateTokenFromResponse } from '@/shared/http'

export async function fetchCoupons(
  page?: string,
  where?: Record<string, unknown>,
) {
  const token = await getBackendToken()
  const response = await api(
    '/coupons',
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
      next: { tags: ['coupons'], revalidate: 60 * 4 },
    },
    page,
    where,
  )
  if (!response.ok) throw new Error(await readMessage(response))
  const json = await safeJson(response)
  updateTokenFromResponse(response, json)
  if (Array.isArray(json)) {
    const items = json.map((i) => CouponSchema.parse(i))
    return { coupons: items, count: items.length }
  }
  const parsed = CouponsListResponseSchema.safeParse(json)
  if (!parsed.success) throw new Error('Invalid coupons response')
  return { coupons: parsed.data.items, count: parsed.data.count }
}

export async function fetchCoupon(id: string) {
  const token = await getBackendToken()
  const response = await api(`/coupons/${id}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
    next: { tags: [id, 'coupons'], revalidate: 60 * 4 },
  })
  if (!response.ok) throw new Error(await readMessage(response))
  const json = await safeJson(response)
  updateTokenFromResponse(response, json)
  const parsed = CouponDetailResponseSchema.safeParse(json)
  if (!parsed.success) throw new Error('Invalid coupon response')
  return parsed.data.coupon
}
