'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { AddItems } from './add-items'
import { CustomerInfo } from './customer-info'
import { Payment } from './payment'
import { useSale } from '@/modules/sales-pos/ui/hooks/useSale'
import { cn } from '@/lib/utils'

interface StepsProps {
  saleId: string
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

export function Steps({ saleId }: StepsProps) {
  const { sale, setCustomer, paySale, setPaymentMethod } = useSale(saleId)
  const [step, setStep] = useState(1)

  const nextStep = () => setStep((prev) => Math.min(prev + 1, stepsMeta.length))
  const prevStep = () => setStep((prev) => Math.max(1, prev - 1))

  function handlerStepIsCompleted(isPaid: boolean, meta: StepsMeta) {
    if (isPaid) return true

    switch (meta.title) {
      case 'Cliente':
        return !!sale?.clientId

      case 'Itens':
        console.log('saleItems: ', sale?.items)
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
    console.log('isActive: ', isActive)
    console.log('isCompleted: ', isCompleted)
    console.log('isPaid: ', isPaid)
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
    <section className="flex min-h-0 flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 shadow-xl shadow-slate-900/10 backdrop-blur">
      <header className="border-b border-slate-200/70 bg-white/70 px-6 py-5 sm:px-8">
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
                    // isActive
                    //   ? 'border-primary/80 bg-primary/10 shadow-sm shadow-primary/20'
                    //   : isCompleted
                    //     ? 'border-emerald- bg-emerald-50/60 text-emerald-900 shadow-sm shadow-emerald-200/50'
                    //     : 'border-slate-200/80 bg-white/60 text-slate-500 hover:border-slate-300 hover:bg-white/70',
                  )}
                >
                  <span
                    className={cn(
                      'flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition',
                      circleStepStyles,
                      // isActive
                      //   ? 'bg-primary text-primary-foreground'
                      //   : isCompleted
                      //     ? 'bg-emerald-500 text-white'
                      //     : 'bg-slate-200 text-slate-600 group-hover:bg-slate-300 group-hover:text-slate-700',
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
      <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8 sm:py-8">
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
          />
        )}
      </div>
    </section>
  )
}
