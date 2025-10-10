'use client'

import { useEffect, useRef, useState } from 'react'
import { Check } from 'lucide-react'
import { AddItems } from './add-items'
import { CustomerInfo } from './customer-info'
import { Payment } from './payment'
import { useSale } from '@/modules/sales-pos/ui/hooks/useSale'
import { cn } from '@/lib/utils'
import { SaleCompleted } from './sale-completed'

interface StepsProps {
  saleId: string
  isPaid: boolean
}
type StepsMeta = {
  id: number
  title: 'Cliente' | 'Itens' | 'Pagamento'
  description: string
}

const stepsMeta: StepsMeta[] = [
  {
    id: 1,
    title: 'Cliente',
    description: 'Identifique quem está realizando a compra.',
  },
  {
    id: 2,
    title: 'Itens',
    description: 'Adicione produtos, serviços ou planos à venda.',
  },
  {
    id: 3,
    title: 'Pagamento',
    description: 'Escolha a forma de pagamento e finalize.',
  },
] as const

export function Steps({ saleId, isPaid }: StepsProps) {
  const { sale, totals, setCustomer, paySale, setPaymentMethod } =
    useSale(saleId)
  const [step, setStep] = useState(1)
  const [showSuccess, setShowSuccess] = useState(isPaid)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const transitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (sale?.paymentStatus === 'PAID' && !isTransitioning) {
      setShowSuccess(true)
    }
  }, [sale?.paymentStatus, isTransitioning])

  useEffect(() => {
    return () => {
      if (transitionTimer.current) {
        clearTimeout(transitionTimer.current)
      }
    }
  }, [])

  const nextStep = () => setStep((prev) => Math.min(prev + 1, stepsMeta.length))
  const prevStep = () => setStep((prev) => Math.max(1, prev - 1))

  if (showSuccess) {
    return (
      <section className="col-span-full flex min-h-0 flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 shadow-xl shadow-slate-900/10 backdrop-blur animate-in fade-in-90 zoom-in-95 duration-500">
        <SaleCompleted sale={sale} totals={totals} />
      </section>
    )
  }

  function handlerStepIsCompleted(isPaid: boolean, meta: StepsMeta) {
    if (isPaid) return true

    switch (meta.title) {
      case 'Cliente':
        return !!sale?.clientId

      case 'Itens':
        return sale && sale?.items?.length > 0

      case 'Pagamento':
        return sale?.paymentStatus === 'PAID'

      default:
        break
    }
  }

  function handlerStyleStep(meta: StepsMeta): {
    cardStepStyles: string
    circleStepStyles: string
  } {
    const isPaid = sale?.paymentStatus === 'PAID'
    const isActive = meta.id === step
    const isCompleted = handlerStepIsCompleted(isPaid, meta)
    let styles = {
      cardStepStyles: '',
      circleStepStyles: '',
    }
    if (isActive) {
      if (isCompleted) {
        styles = {
          cardStepStyles:
            'border-emerald-400/80 border-2 bg-emerald-200/30 shadow-sm shadow-primary/20',
          circleStepStyles: 'bg-emerald-500 text-white',
        }
      } else {
        styles = {
          cardStepStyles:
            'border-primary/80 bg-primary/10 shadow-sm shadow-primary/20',
          circleStepStyles: 'bg-primary text-primary-foreground',
        }
      }
    } else {
      if (isCompleted) {
        styles = {
          cardStepStyles:
            '  bg-emerald-50/60 text-emerald-900 shadow-sm shadow-emerald-200/50',
          circleStepStyles: 'bg-emerald-500 text-white',
        }
      } else {
        styles = {
          cardStepStyles:
            'border-slate-200/80 bg-white/60 text-slate-500 hover:border-slate-300 hover:bg-white/70',
          circleStepStyles:
            'bg-slate-200 text-slate-600 group-hover:bg-slate-300 group-hover:text-slate-700',
        }
      }
    }
    return styles
  }

  return (
    <section className="relative flex min-h-0 flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 shadow-xl shadow-slate-900/10 backdrop-blur">
      {isTransitioning && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/70 backdrop-blur">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-500" />
          <p className="mt-4 text-sm font-medium text-emerald-700">
            Finalizando pagamento...
          </p>
        </div>
      )}
      <header
        className={cn(
          'border-b border-slate-200/70 bg-white/70 px-6 py-5 sm:px-8',
          isTransitioning && 'pointer-events-none opacity-40',
        )}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-400">
              Etapas
            </p>
            <p className="text-xs font-medium text-slate-500">
              {step} / {stepsMeta.length}
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {stepsMeta.map((meta) => {
              const isPaid = sale?.paymentStatus === 'PAID'
              const isCompleted = handlerStepIsCompleted(isPaid, meta)
              const canNavigateTo = isPaid || isCompleted || meta.id < step
              const { cardStepStyles, circleStepStyles } =
                handlerStyleStep(meta)

              return (
                <button
                  key={meta.id}
                  type="button"
                  onClick={() => {
                    if (canNavigateTo) {
                      setStep(meta.id)
                    }
                  }}
                  className={cn(
                    'group flex h-full flex-col rounded-2xl border px-4 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2',
                    canNavigateTo ? 'cursor-pointer' : 'cursor-default',
                    cardStepStyles,
                  )}
                >
                  <span
                    className={cn(
                      'flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition',
                      circleStepStyles,
                    )}
                  >
                    {isCompleted ? <Check className="h-4 w-4" /> : meta.id}
                  </span>
                  <span className="mt-3 text-sm font-semibold text-slate-900">
                    {meta.title}
                  </span>
                  <span className="mt-1 text-xs text-slate-500">
                    {meta.description}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </header>
      <div
        className={cn(
          'flex-1 overflow-y-auto px-6 py-6 sm:px-8 sm:py-8',
          isTransitioning && 'pointer-events-none opacity-40',
        )}
      >
        {step === 1 && (
          <CustomerInfo
            setCustomer={(customerId) => setCustomer(customerId)}
            nextStep={nextStep}
            initialClientId={sale?.clientId}
            initialClient={sale?.client ?? null}
          />
        )}
        {step === 2 && (
          <AddItems saleId={saleId} nextStep={nextStep} prevStep={prevStep} />
        )}
        {step === 3 && (
          <Payment
            sale={sale}
            paySale={(method) => paySale(method)}
            prevStep={prevStep}
            setPaymentMethod={(method) => setPaymentMethod(method)}
            onPaymentSuccess={() => {
              if (transitionTimer.current) {
                clearTimeout(transitionTimer.current)
              }
              setIsTransitioning(true)
              transitionTimer.current = setTimeout(() => {
                setIsTransitioning(false)
                setShowSuccess(true)
              }, 2000)
            }}
          />
        )}
      </div>
    </section>
  )
}
