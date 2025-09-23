'use client'

import { useEffect, useMemo, useState } from 'react'
import { ZSaleItems } from '@/features/saleItems/schema'
import { ZUser } from '@/features/users/schemas'
import { Button, InputForm } from '@/components/atoms'
import { usePOS } from '@/hooks/use-pos'
import { Check, Trash2 } from 'lucide-react'
import { CouponCard } from '@/components/molecules/CouponCard'
import SelectForm from '@/components/atoms/SelectForm'
import {
  calculateRealValueSaleItem,
  getNameSaleItem,
  getUniValueSaleItem,
} from '@/utils/saleItems'

interface SaleItemProps {
  saleItem: ZSaleItems
  barbers: ZUser[]
  saleId: string
}

export function SaleItem({ saleItem, barbers, saleId }: SaleItemProps) {
  const {
    updateQuantityItem,
    updateCustomPriceItem,
    updateBarberItem,
    updateCouponItem,
    removeItem,
  } = usePOS()
  const [quantity, setQuantity] = useState(saleItem.quantity)
  const [coupon, setCoupon] = useState('')
  const [barberId, setBarberId] = useState(saleItem.barberId || '')
  const [customPrice, setCustomPrice] = useState(saleItem.customPrice)

  const barbersMapSelect = [
    { value: 'null', label: ' -- Escolha um colaborador -- ' },
    ...barbers.map((barber) => ({
      value: barber.id,
      label: barber.name,
    })),
  ]

  useEffect(() => {
    if (saleItem.barberId) {
      console.log('saleItem.barberId:', saleItem.barberId)
      setBarberId(saleItem.barberId)
    }
  }, [saleItem.barberId])

  const itemName = getNameSaleItem(saleItem)

  const { formattedTotalValue, formattedUnitValue } = useMemo(() => {
    const totalValue = Number(
      calculateRealValueSaleItem(saleItem, [
        'COUPON_SALE_ITEM',
        'VALUE_SALE_ITEM',
      ]),
    )
    const unitValue = getUniValueSaleItem(saleItem) || 0

    return {
      formattedTotalValue: totalValue.toFixed(2),
      formattedUnitValue: unitValue.toFixed(2),
    }
  }, [saleItem])

  console.log('customPrice:', customPrice)

  return (
    <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-lg space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-bold text-xl text-gray-800">{itemName}</p>
          <p className="text-md text-gray-600 font-semibold">
            R$ {formattedTotalValue}
          </p>
          <p className="text-sm text-gray-500">
            Preço unitário: R$ {formattedUnitValue}
          </p>
        </div>
        <Button
          onClick={() => removeItem(saleItem.id, saleId)}
          variant="ghost"
          size="icon"
          className="text-red-600 hover:bg-red-100 rounded-full"
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <div className="flex flex-col space-y-1 md:col-span-2">
          <label className="text-sm font-medium text-gray-500">
            Quantidade
          </label>
          <div className="flex items-center">
            <InputForm
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full rounded-r-none"
              min={1}
            />
            <Button
              size="icon"
              variant="outline"
              className="rounded-l-none border-l-0"
              onClick={() => updateQuantityItem(saleItem.id, { quantity })}
            >
              <Check className="h-5 w-5 text-green-600" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col space-y-1 md:col-span-2">
          <label className="text-sm font-medium text-gray-500">
            Preço Customizado
          </label>
          <div className="flex items-center">
            <InputForm
              type="number"
              value={customPrice || ''}
              onChange={(e) =>
                setCustomPrice(
                  e.target.value.length > 0 ? Number(e.target.value) : null,
                )
              }
              className="w-full rounded-r-none"
              placeholder="Preço Custom."
            />
            <Button
              size="icon"
              variant="outline"
              className="rounded-l-none border-l-0"
              onClick={() =>
                updateCustomPriceItem(saleItem.id, { customPrice })
              }
            >
              <Check className="h-5 w-5 text-green-600" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col space-y-1 md:col-span-2">
          <label className="text-sm font-medium text-gray-500">Barbeiro</label>
          <div className="flex items-center">
            <SelectForm
              value={barberId}
              onChange={(e) => setBarberId(e.target.value)}
              className="block w-full rounded-md border rounded-r-none border-r-0 pl-4 border-text-gray-500 h-10 ring-blue"
              options={barbersMapSelect}
            />
            <Button
              size="icon"
              variant="outline"
              className="rounded-l-none "
              onClick={() => updateBarberItem(saleItem.id, { barberId })}
            >
              <Check className="h-5 w-5 text-green-600" />
            </Button>
          </div>
        </div>

        <div className="md:col-span-2">
          {saleItem.coupon ? (
            <CouponCard
              coupon={saleItem.coupon}
              onRemove={() => updateCouponItem(saleItem.id, { couponId: null })}
            />
          ) : (
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-500">
                Cupom de Desconto
              </label>
              <div className="flex items-center">
                <InputForm
                  type="text"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Ex: PROMO10"
                  className="flex-1 rounded-r-none"
                />
                <Button
                  size="icon"
                  variant="outline"
                  className="rounded-l-none border-l-0"
                  onClick={() =>
                    updateCouponItem(saleItem.id, { couponCode: coupon })
                  }
                >
                  <Check className="h-5 w-5 text-green-600" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
