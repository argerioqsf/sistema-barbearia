'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { AddItems } from './add-items'
import { CustomerInfo } from './customer-info'
import { Payment } from './payment'
import { useSale } from '@/modules/sales-pos/ui/hooks/useSale'
import { cn } from '@/lib/utils'
import { SaleCompleted } from './sale-completed'

interface StepsProps {
  saleId: string
  isPaid: boolean
  redirectBasePath: string
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

export function Steps({ saleId, isPaid, redirectBasePath }: StepsProps) {
  const { sale, totals, setCustomer, paySale, setPaymentMethod } =
    useSale(saleId)
  const [step, setStep] = useState(
    sale?.clientId ? (sale.items.length > 0 ? 3 : 2) : 1,
  )
  const [showSuccess, setShowSuccess] = useState(isPaid)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const transitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const saleIsPaid = sale?.paymentStatus === 'PAID'
  const totalSteps = stepsMeta.length
  const currentStepMeta = stepsMeta[step - 1]
  const progressBase = showSuccess
    ? totalSteps
    : Math.max(
        0,
        step -
          1 +
          (currentStepMeta &&
          handlerStepIsCompleted(showSuccess, currentStepMeta)
            ? 1
            : 0),
      )
  const progressPercentage = Math.min(100, (progressBase / totalSteps) * 100)

  useEffect(() => {
    if (saleIsPaid && !isTransitioning) {
      setShowSuccess(true)
    }
  }, [saleIsPaid, isTransitioning])

  useEffect(() => {
    return () => {
      if (transitionTimer.current) {
        clearTimeout(transitionTimer.current)
      }
    }
  }, [])

  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps))
  const prevStep = () => setStep((prev) => Math.max(1, prev - 1))

  if (showSuccess) {
    return (
      <section className="col-span-full flex min-h-0 flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 shadow-xl shadow-slate-900/10 backdrop-blur animate-in fade-in-90 zoom-in-95 duration-500">
        <SaleCompleted
          sale={sale}
          totals={totals}
          redirectBasePath={redirectBasePath}
          goToDetails={() => setShowSuccess(false)}
        />
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
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-400">
                Fluxo da venda
              </p>
              <h2 className="text-lg font-semibold text-slate-900">
                {showSuccess
                  ? 'Venda finalizada'
                  : `Etapa ${step} de ${totalSteps}`}
              </h2>
              {!showSuccess && (
                <p className="text-xs text-slate-500">
                  Complete as etapas na ordem para registrar a venda.
                </p>
              )}
            </div>
            <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
              {showSuccess ? 'Concluída' : `Passo ${step}`}
            </span>
          </div>

          <ol className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            {stepsMeta.map((meta, index) => {
              const isCompleted = handlerStepIsCompleted(showSuccess, meta)
              const isCurrent = meta.id === step && !showSuccess
              const canNavigateTo =
                showSuccess || meta.id <= step || isCompleted
              const isLocked = !canNavigateTo
              const connectorActive =
                isCompleted || meta.id < step || showSuccess

              return (
                <li
                  key={meta.id}
                  className="flex flex-col gap-3 sm:flex-1 sm:flex-row sm:items-center"
                >
                  <button
                    type="button"
                    onClick={() => {
                      if (canNavigateTo) {
                        setStep(meta.id)
                      }
                    }}
                    disabled={!canNavigateTo}
                    aria-current={isCurrent ? 'step' : undefined}
                    className={cn(
                      'group flex w-full items-start gap-4 rounded-2xl border px-4 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2',
                      isCurrent &&
                        'border-emerald-300 bg-emerald-100/50 text-slate-900 shadow-sm shadow-primary/20',
                      isCompleted && !isCurrent
                        ? ' bg-emerald-50/70 text-emerald-900 shadow-sm shadow-emerald-200/50'
                        : '',
                      !isCompleted && !isCurrent
                        ? 'border-slate-200 bg-white text-slate-500 hover:border-primary/50 hover:bg-primary/5'
                        : '',
                      isLocked && 'cursor-default opacity-60',
                    )}
                  >
                    <span
                      className={cn(
                        'flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-base font-semibold transition',
                        isCompleted && !isCurrent
                          ? 'border-emerald-400/0 bg-emerald-500/40 text-white shadow-emerald-200/60'
                          : '',
                        isCurrent
                          ? 'border-emerald-400 bg-emerald-500 text-white shadow-primary/30 border-2'
                          : '',
                        !isCompleted && !isCurrent
                          ? 'border-slate-200 bg-white text-slate-400 group-hover:border-primary group-hover:text-primary'
                          : '',
                      )}
                    >
                      {isCompleted ? <Check className="h-5 w-5" /> : meta.id}
                    </span>
                    <div className="flex flex-col">
                      <span
                        className={cn(
                          'text-sm font-semibold text-slate-900',
                          isCompleted && !isCurrent && 'text-slate-900/60',
                        )}
                      >
                        {meta.title}
                      </span>
                      <span
                        className={cn(
                          'mt-1 text-xs leading-snug text-slate-500',
                          isCompleted && !isCurrent && 'text-slate-500/60',
                        )}
                      >
                        {meta.description}
                      </span>
                    </div>
                  </button>
                  {index < totalSteps - 1 && (
                    <span
                      aria-hidden="true"
                      className={cn(
                        'flex items-center justify-center text-slate-300 transition sm:flex-1',
                      )}
                    >
                      <ArrowRight
                        className={cn(
                          'h-5 w-5 rotate-90 sm:h-6 sm:w-6 sm:rotate-0',
                          connectorActive
                            ? 'text-emerald-400'
                            : 'text-slate-300',
                        )}
                      />
                    </span>
                  )}
                </li>
              )
            })}
          </ol>

          <div className="hidden h-1 w-full overflow-hidden rounded-full bg-slate-100 sm:block">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
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
            isPaid={isPaid}
            setCustomer={(customerId) => setCustomer(customerId)}
            nextStep={nextStep}
            initialClientId={sale?.clientId}
            initialClient={sale?.client ?? null}
          />
        )}
        {step === 2 && (
          <AddItems
            isPaid={isPaid}
            saleId={saleId}
            nextStep={nextStep}
            prevStep={prevStep}
          />
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
