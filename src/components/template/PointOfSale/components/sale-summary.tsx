'use client'

import { Button, InputForm, LabelForm, TitleForm } from '@/components/atoms'
import { ZSale } from '@/features/sales/schemas'
import { useState } from 'react'
import { CouponCard } from '@/components/molecules/CouponCard'
import { usePOS } from '@/hooks/use-pos'

interface SaleSummaryProps {
  sale: ZSale
}

export function SaleSummary({ sale }: SaleSummaryProps) {
  const { applyCoupon, removeCoupon } = usePOS()
  const [coupon, setCoupon] = useState('')

  // Calculate raw subtotal (sum of all item prices before any discount)
  const rawSubtotal = sale.gross_value

  // Calculate discount based on coupon
  // TODO: refazer a logica de calcular descontos levando em consideracao
  // o campo discounts de cada saleitem e o campo de cupom da sale
  let calculatedDiscount = 0
  if (
    sale.coupon &&
    sale.coupon.discount !== undefined &&
    sale.coupon.discountType
  ) {
    if (sale.coupon.discountType === 'PERCENTAGE') {
      calculatedDiscount = (rawSubtotal * sale.coupon.discount) / 100
    } else if (sale.coupon.discountType === 'VALUE') {
      calculatedDiscount = sale.coupon.discount
    }
  }

  // Final total after discount
  const finalTotal = sale.total

  return (
    <div className="p-4 flex-5 sm:p-6 bg-white rounded-2xl shadow-[0_-25px_50px_-12px_rgba(0,0,0,0.25)] border border-gray-200 flex flex-col">
      <TitleForm
        title="Resumo da Venda"
        className="text-xl sm:text-2xl text-foreground mb-4 sm:mb-6"
      />

      <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
        <LabelForm
          label="Cupom de Desconto"
          htmlFor="coupon"
          className="text-base sm:text-lg mb-2 text-foreground"
        />
        <div className="flex gap-2">
          <InputForm
            id="coupon"
            name="coupon"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            className="bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-primary focus:border-primary text-sm sm:text-base"
          />
          <Button
            onClick={() => applyCoupon(coupon, sale.id)}
            variant="default"
          >
            Aplicar
          </Button>
        </div>
        {sale.coupon ? (
          <CouponCard
            coupon={sale.coupon}
            onRemove={() => sale.id && removeCoupon(sale.id)}
          />
        ) : (
          <p className="text-xs sm:text-sm text-muted-foreground mt-2">
            Nenhum cupom aplicado.
          </p>
        )}
      </div>
      <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3 text-base sm:text-xl">
        <div className="flex  justify-between text-secondary-foreground">
          <p>Subtotal</p>
          <p>R$ {rawSubtotal.toFixed(2)}</p>
        </div>
        {calculatedDiscount > 0 && (
          <div className="flex justify-between text-secondary-foreground">
            <p>Desconto (Cupom)</p>
            <p>- R$ {calculatedDiscount.toFixed(2)}</p>
          </div>
        )}
        <div className="flex justify-between font-bold text-2xl sm:text-3xl text-secondary-foreground mt-4">
          <p>Total</p>
          <p>R$ {finalTotal.toFixed(2)}</p>
        </div>
      </div>
    </div>
  )
}
