'use client'

import { useMemo, useState } from 'react'
import { Button, InputForm, LabelForm, TitleForm } from '@/components/atoms'
import { CouponCard } from '@/components/molecules/CouponCard'
import { useSale } from '@/modules/sales-pos/ui/hooks/useSale'
import { cn } from '@/lib/utils'

interface SaleSummaryProps {
  saleId: string
  className?: string
}

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

function formatCurrency(value: number) {
  return currencyFormatter.format(value ?? 0)
}

export function SaleSummary({ saleId, className }: SaleSummaryProps) {
  const [coupon, setCoupon] = useState('')
  const { sale, totals, applyCoupon, removeCoupon } = useSale(saleId)

  const summary = useMemo(() => {
    if (!sale) {
      return null
    }
    const subtotal = sale.gross_value ?? totals?.gross ?? 0
    const discount = totals?.discount ?? 0
    const total = sale.total ?? totals?.net ?? subtotal - discount
    const itemsCount = sale.items?.length ?? 0

    return { subtotal, discount, total, itemsCount }
  }, [sale, totals])

  if (!sale || !summary) {
    return (
      <section
        className={cn(
          'flex flex-col gap-4 rounded-3xl border border-slate-200/80 bg-white/90 p-6 text-slate-500 shadow-lg shadow-slate-900/5 backdrop-blur',
          className,
        )}
      >
        <TitleForm
          title="Resumo da Venda"
          className="text-xl font-semibold text-slate-900"
        />
        <p>Carregando informações da venda...</p>
      </section>
    )
  }

  const { subtotal, discount, total, itemsCount } = summary
  const hasDiscount = discount > 0

  return (
    <section
      className={cn(
        'flex flex-col gap-6 rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-lg shadow-slate-900/10 backdrop-blur',
        className,
      )}
    >
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <TitleForm
            title="Resumo da Venda"
            className="text-2xl font-semibold text-slate-900"
          />
          <p className="mt-2 text-sm text-slate-500">
            Os valores são atualizados automaticamente conforme você altera a
            venda.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-slate-900/5 px-3 py-1 text-xs font-medium text-slate-600">
            {itemsCount} {itemsCount === 1 ? 'item' : 'itens'}
          </span>
          {sale.coupon && (
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600">
              Cupom ativo
            </span>
          )}
        </div>
      </header>

      <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-inner">
        <LabelForm
          label="Cupom de desconto"
          htmlFor="coupon"
          className="text-xs font-semibold uppercase tracking-wide text-slate-500"
        />
        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          <InputForm
            id="coupon"
            name="coupon"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            placeholder="Digite um código promocional"
            className="h-11 flex-1 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-primary/40"
          />
          <Button
            onClick={() => applyCoupon(coupon)}
            className="h-11 rounded-xl px-5 text-sm font-semibold"
          >
            Aplicar
          </Button>
        </div>
        {sale.coupon ? (
          <div className="mt-3">
            <CouponCard coupon={sale.coupon} onRemove={removeCoupon} />
          </div>
        ) : (
          <p className="mt-3 text-xs text-slate-500">Nenhum cupom aplicado.</p>
        )}
      </div>

      <div className="space-y-3 rounded-2xl border border-slate-200/80 bg-slate-50/80 px-5 py-5 text-sm text-slate-600">
        <div className="flex items-center justify-between">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        {hasDiscount && (
          <div className="flex items-center justify-between text-emerald-600">
            <span>Descontos</span>
            <span>- {formatCurrency(discount)}</span>
          </div>
        )}
        <div className="flex items-center justify-between text-xs uppercase tracking-wide text-slate-500">
          <span>Forma de pagamento definida</span>
          <span>{sale.method?.toUpperCase() ?? 'A definir'}</span>
        </div>
        <div className="flex items-baseline justify-between border-t border-slate-200 pt-4 text-slate-900">
          <span className="text-base font-semibold">Total a pagar</span>
          <span className="text-3xl font-bold">{formatCurrency(total)}</span>
        </div>
      </div>
    </section>
  )
}
