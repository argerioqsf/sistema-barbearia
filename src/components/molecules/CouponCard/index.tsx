'use client'

import { ZCoupon } from '@/features/coupons/schemas'
import { Tag, X } from 'lucide-react'

interface CouponCardProps {
  coupon: ZCoupon
  onRemove: () => void
}

export function CouponCard({ coupon, onRemove }: CouponCardProps) {
  return (
    <div className="relative mt-4 flex items-center justify-between rounded-lg border border-dashed border-green-500 bg-green-50 p-3 text-green-700 shadow-sm">
      <div className="flex items-center gap-2">
        <Tag className="h-5 w-5" />
        <span className="text-sm font-medium">
          Cupom aplicado: {coupon.code}
        </span>
      </div>
      <button
        onClick={onRemove}
        className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white shadow-md transition-colors hover:bg-red-600"
        aria-label="Remover cupom"
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  )
}
