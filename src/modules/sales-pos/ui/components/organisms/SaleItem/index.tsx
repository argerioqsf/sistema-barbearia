'use client'

import { useEffect, useMemo, useState } from 'react'
import { Check, Trash2 } from 'lucide-react'
import { Button, InputForm } from '@/components/atoms'
import SelectForm from '@/components/atoms/SelectForm'
import { CouponCard } from '@/components/molecules/CouponCard'
import type { ZSaleItems } from '@/features/saleItems/schema'
import type { ZUser } from '@/features/users/schemas'
import { SaleItem as SaleItemEntity } from '@/modules/sales/domain'
import { useSale } from '@/modules/sales-pos/ui/hooks/useSale'

interface SaleItemProps {
  saleItem: ZSaleItems
  barbers: ZUser[]
  saleId: string
}

export function SaleItem({ saleItem, barbers, saleId }: SaleItemProps) {
  const {
    removeItem,
    updateSaleItemCoupon,
    updateSaleItemQuantity,
    updateSaleItemCustomPrice,
    updateSaleItemBarber,
  } = useSale(saleId)
  const [quantity, setQuantity] = useState(saleItem.quantity)
  const [coupon, setCoupon] = useState('')
  const [barberId, setBarberId] = useState<string | null>(
    saleItem.barberId ?? null,
  )
  const [customPrice, setCustomPrice] = useState<number | null>(
    saleItem.customPrice ?? null,
  )

  useEffect(() => {
    setQuantity(saleItem.quantity)
    setBarberId(saleItem.barberId ?? null)
    setCustomPrice(saleItem.customPrice ?? null)
  }, [saleItem.id, saleItem.quantity, saleItem.barberId, saleItem.customPrice])

  const barbersMapSelect = [
    { value: 'null', label: ' -- Escolha um colaborador -- ' },
    ...barbers.map((barber) => ({ value: barber.id, label: barber.name })),
  ]

  const saleItemEntity = useMemo(
    () => SaleItemEntity.fromDTO(saleItem),
    [saleItem],
  )

  const itemName = saleItemEntity.displayName()

  const { formattedTotalValue, formattedUnitValue } = useMemo(() => {
    const discountedUnit = saleItemEntity
      .calculateRealValue(['COUPON_SALE_ITEM', 'VALUE_SALE_ITEM', 'PLAN'])
      .toFloat()
    const catalogUnit = saleItemEntity.catalogUnitPrice().toFloat()
    return {
      formattedTotalValue: discountedUnit.toFixed(2),
      formattedUnitValue: catalogUnit.toFixed(2),
    }
  }, [saleItemEntity])

  const handleRemove = () => removeItem(saleItem.id)
  const handleQuantityUpdate = () =>
    updateSaleItemQuantity(saleItem.id, Number(quantity))
  const handleCustomPriceUpdate = () =>
    updateSaleItemCustomPrice(saleItem.id, customPrice)
  const handleBarberUpdate = () =>
    updateSaleItemBarber(
      saleItem.id,
      barberId && barberId !== 'null' ? barberId : null,
    )
  const handleCouponUpdate = () =>
    updateSaleItemCoupon(saleItem.id, {
      couponCode: coupon,
      couponId: undefined,
    })

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
          onClick={handleRemove}
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
              onClick={handleQuantityUpdate}
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
              value={customPrice ?? ''}
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
              onClick={handleCustomPriceUpdate}
            >
              <Check className="h-5 w-5 text-green-600" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col space-y-1 md:col-span-2">
          <label className="text-sm font-medium text-gray-500">Barbeiro</label>
          <div className="flex items-center">
            <SelectForm
              value={barberId ?? 'null'}
              onChange={(e) => setBarberId(e.target.value)}
              className="block w-full rounded-md border rounded-r-none border-r-0 pl-4 border-text-gray-500 h-10 ring-blue"
              options={barbersMapSelect}
            />
            <Button
              size="icon"
              variant="outline"
              className="rounded-l-none"
              onClick={handleBarberUpdate}
            >
              <Check className="h-5 w-5 text-green-600" />
            </Button>
          </div>
        </div>

        <div className="md:col-span-2">
          {saleItem.coupon ? (
            <CouponCard
              coupon={saleItem.coupon}
              onRemove={() =>
                updateSaleItemCoupon(saleItem.id, { couponId: null })
              }
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
                  onClick={handleCouponUpdate}
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
