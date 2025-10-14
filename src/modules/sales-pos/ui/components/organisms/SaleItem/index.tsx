'use client'

import { useEffect, useMemo, useState, useRef } from 'react'
import { Check, Trash2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CouponCard } from '@/components/molecules/CouponCard'
import type { ZUser } from '@/features/users/schemas'
import { SaleItem as SaleItemEntity } from '@/modules/sales/domain'
import { useSale } from '@/modules/sales-pos/ui/hooks/useSale'
import { cn } from '@/lib/utils'
import { useDebounce } from '@/hooks/use-debounce'
import { QuantityInput } from '@/components/ui/quantity-input'
import { CurrencyInput } from '@/components/ui/currency-input'
import SelectForm from '@/components/atoms/SelectForm'
import { ZSaleItem } from '@/features/saleItems/schema'

interface SaleItemProps {
  saleItem: ZSaleItem
  barbers: ZUser[]
  saleId: string
}

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

function formatCurrency(value: number) {
  return currencyFormatter.format(value ?? 0)
}

export function SaleItem({ saleItem, barbers, saleId }: SaleItemProps) {
  const {
    removeItem,
    updateSaleItemCoupon,
    updateSaleItemQuantity,
    updateSaleItemCustomPrice,
    updateSaleItemBarber,
  } = useSale(saleId)

  const [coupon, setCoupon] = useState('')
  const [barberId, setBarberId] = useState<string | null>(
    saleItem.barberId ?? null,
  )
  const [quantity, setQuantity] = useState(saleItem.quantity)
  const [customPrice, setCustomPrice] = useState<number | undefined>(
    saleItem.customPrice ?? undefined,
  )

  const debouncedQuantity = useDebounce(quantity, 1000)
  const debouncedCustomPrice = useDebounce(customPrice, 1000)
  const isInitialMount = useRef(true)

  useEffect(() => {
    if (isInitialMount.current) {
      return
    }
    if (debouncedQuantity !== saleItem.quantity) {
      updateSaleItemQuantity(saleItem.id, debouncedQuantity)
    }
  }, [debouncedQuantity])

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    const hasDebouncedPrice =
      debouncedCustomPrice !== null && debouncedCustomPrice !== undefined
    const hasSaleItemPrice =
      saleItem.customPrice !== null && saleItem.customPrice !== undefined

    if (!hasDebouncedPrice && !hasSaleItemPrice) {
      return
    }

    if (debouncedCustomPrice !== saleItem.customPrice) {
      updateSaleItemCustomPrice(saleItem.id, debouncedCustomPrice ?? null)
    }
  }, [debouncedCustomPrice])

  useEffect(() => {
    setQuantity(saleItem.quantity)
    setCustomPrice(saleItem.customPrice ?? undefined)
    setBarberId(saleItem.barberId)
  }, [saleItem.quantity, saleItem.customPrice, saleItem.barberId])

  const barbersMapSelect = [
    { value: 'null', label: 'Venda da unidade' },
    ...barbers.map((barber) => ({ value: barber.id, label: barber.name })),
  ]

  const saleItemEntity = useMemo(
    () => SaleItemEntity.fromDTO(saleItem),
    [saleItem],
  )

  const itemName = saleItemEntity.displayName()

  const pricingSnapshot = useMemo(() => {
    const netValue = saleItemEntity
      .calculateRealValue(['COUPON_SALE_ITEM', 'VALUE_SALE_ITEM', 'PLAN'])
      .toFloat()
    const catalogUnit = saleItemEntity.catalogUnitPrice().toFloat()
    const grossTotal = saleItemEntity.grossTotal().toFloat()
    const netTotal = saleItemEntity.netTotal().toFloat()
    const discountTotal = saleItemEntity.discountTotal().toFloat()

    return {
      netUnit: netValue,
      catalogUnit,
      grossTotal,
      netTotal,
      discountTotal,
    }
  }, [saleItemEntity])

  const itemType = useMemo(() => {
    const references = saleItemEntity.references
    if (references.product) {
      return { label: 'Produto', badge: 'bg-sky-500/10 text-sky-600' }
    }
    if (references.service) {
      return { label: 'Serviço', badge: 'bg-purple-500/10 text-purple-600' }
    }
    if (references.plan) {
      return { label: 'Plano', badge: 'bg-amber-500/10 text-amber-600' }
    }
    if (references.appointment) {
      return {
        label: 'Agendamento',
        badge: 'bg-emerald-500/10 text-emerald-600',
      }
    }
    return { label: 'Item', badge: 'bg-slate-200 text-slate-600' }
  }, [saleItemEntity])

  const assignedBarberName = saleItemEntity.references.barber?.name ?? null

  const handleRemove = () => removeItem(saleItem.id)
  const handleCouponUpdate = () =>
    updateSaleItemCoupon(saleItem.id, {
      couponCode: coupon,
      couponId: undefined,
    })

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-sm sm:p-5">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:justify-between">
        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={cn(
                'rounded-full px-3 py-1 text-xs font-medium',
                itemType.badge,
              )}
            >
              {itemType.label}
            </span>
            {assignedBarberName && (
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                {assignedBarberName}
              </span>
            )}
          </div>
          <p className="text-base font-semibold text-slate-900 sm:text-lg">
            {itemName}
          </p>
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm">
            <p className="text-slate-500">
              Valor de tabela: {formatCurrency(pricingSnapshot.catalogUnit)}
            </p>
          </div>
        </div>
        <div className="flex w-full items-center justify-between gap-4 sm:w-auto sm:flex-col sm:items-end">
          <Button
            onClick={handleRemove}
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-lg border border-red-200 bg-red-50 text-red-500 transition hover:bg-red-100 sm:h-10 sm:w-10 sm:rounded-xl"
          >
            <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          <div className="text-right">
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Total
            </p>
            <p className="text-xl font-bold text-slate-900 sm:text-2xl">
              {formatCurrency(pricingSnapshot.netTotal)}
            </p>
            {pricingSnapshot.discountTotal > 0 && (
              <p className="text-xs font-medium text-emerald-600">
                (Desconto: -{formatCurrency(pricingSnapshot.discountTotal)})
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Quantidade
          </label>
          <QuantityInput value={quantity} onChange={setQuantity} />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Preço customizado
          </label>
          <div className="flex items-center gap-2">
            <CurrencyInput
              value={customPrice}
              onValueChange={setCustomPrice}
              placeholder="Preço personalizado"
              className="h-11 flex-1 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 focus:border-primary focus:ring-primary/40"
            />
            {customPrice !== undefined && customPrice !== null && (
              <Button
                size="icon"
                variant="ghost"
                className="h-11 w-11 rounded-xl border border-red-200 bg-red-50 text-red-500 hover:bg-red-100"
                onClick={() => updateSaleItemCustomPrice(saleItem.id, null)}
              >
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Colaborador responsável
          </label>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <SelectForm
                value={barberId ?? 'null'}
                onChange={(e) => setBarberId(e.target.value)}
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                options={barbersMapSelect}
              />
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
                ▾
              </span>
            </div>
            {saleItem.barberId ? (
              <Button
                size="icon"
                variant="ghost"
                className="h-11 w-11 rounded-xl border border-red-200 bg-red-50 text-red-500 hover:bg-red-100"
                onClick={() => updateSaleItemBarber(saleItem.id, null)}
              >
                <X className="h-5 w-5" />
              </Button>
            ) : (
              <Button
                size="icon"
                variant="ghost"
                disabled={!barberId || barberId === 'null'}
                className={cn(
                  'h-11 w-11 rounded-xl border',
                  'border-emerald-200 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 disabled:bg-slate-50 disabled:border-slate-200 disabled:text-slate-400',
                )}
                onClick={() => updateSaleItemBarber(saleItem.id, barberId)}
              >
                <Check className="h-5 w-5" />
              </Button>
            )}
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
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Cupom de desconto
              </label>
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Ex: PROMO10"
                  className="h-11 flex-1 rounded-xl"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  disabled={!coupon}
                  className={cn(
                    'h-11 w-11 rounded-xl border',
                    coupon
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                      : 'border-slate-200 bg-slate-50 text-slate-400',
                  )}
                  onClick={handleCouponUpdate}
                >
                  <Check className="h-5 w-5" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
