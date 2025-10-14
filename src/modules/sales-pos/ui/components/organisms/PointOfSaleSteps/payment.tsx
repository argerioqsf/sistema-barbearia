'use client'

import {
  ForwardRefExoticComponent,
  RefAttributes,
  useEffect,
  useState,
} from 'react'
import { Button, TitleForm } from '@/components/atoms'
import {
  CreditCard,
  DollarSign,
  LucideProps,
  QrCode,
  CircleSlash,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { GetSaleOutput } from '@/modules/sales/application'
import { PaymentMethod } from '@/features/sales/schemas'

type paymentMethodsList = {
  id: PaymentMethod
  name: string
  description: string
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >
}
interface PaymentProps {
  sale?: GetSaleOutput['sale']
  paySale: (method: PaymentMethod) => Promise<unknown> | unknown
  prevStep: () => void
  setPaymentMethod: (method: PaymentMethod) => Promise<unknown> | unknown
  onPaymentSuccess?: () => void
}

const paymentMethodsList: paymentMethodsList[] = [
  {
    id: 'PIX',
    name: 'PIX',
    description: 'Pagamento instantâneo via QR Code.',
    icon: QrCode,
  },
  {
    id: 'CREDIT_CARD',
    name: 'Cartão de Crédito',
    description: 'Aproveite múltiplas formas de parcelamento.',
    icon: CreditCard,
  },
  {
    id: 'DEBIT_CARD',
    name: 'Cartão de Débito',
    description: 'Aproveite múltiplas formas de parcelamento.',
    icon: CreditCard,
  },
  {
    id: 'CASH',
    name: 'Dinheiro',
    description: 'Registre pagamentos presenciais com troco.',
    icon: DollarSign,
  },
  {
    id: 'EXEMPT',
    name: 'ISENTO',
    description: 'Venda izenta de pagamento',
    icon: CircleSlash,
  },
] as const

export function Payment({
  sale,
  paySale,
  prevStep,
  setPaymentMethod,
  onPaymentSuccess,
}: PaymentProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    sale?.method,
  )
  const [isPaying, setIsPaying] = useState(false)

  useEffect(() => {
    if (sale?.method) {
      setSelectedPaymentMethod(sale.method)
    }
  }, [sale?.method])

  const handleSelection = (method: PaymentMethod) => {
    setSelectedPaymentMethod(method)
    setPaymentMethod(method)
  }

  const handleConfirm = async () => {
    if (!selectedPaymentMethod || isPaying) return
    try {
      setIsPaying(true)
      await Promise.resolve(paySale(selectedPaymentMethod))
      onPaymentSuccess?.()
    } finally {
      setIsPaying(false)
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <TitleForm
          title="Pagamento"
          className="text-2xl font-semibold text-slate-900"
        />
        <p className="mt-2 text-sm text-slate-500">
          Escolha a forma de pagamento para concluir a venda com segurança.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {paymentMethodsList.map((method) => {
          const Icon = method.icon
          const isActive = selectedPaymentMethod === method.id
          return (
            <button
              key={method.id}
              type="button"
              onClick={() => handleSelection(method.id)}
              className={cn(
                'flex h-full flex-col items-start gap-4 rounded-2xl border px-5 py-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2',
                isActive
                  ? 'border-primary/80 bg-primary/10 shadow-sm shadow-primary/30'
                  : 'border-slate-200 bg-white/70 hover:border-primary/40 hover:bg-primary/5',
              )}
            >
              <span
                className={cn(
                  'inline-flex h-12 w-12 items-center justify-center rounded-xl text-primary',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-primary/10',
                )}
              >
                <Icon className="h-6 w-6" />
              </span>
              <div className="space-y-1">
                <p className="text-base font-semibold text-slate-900">
                  {method.name}
                </p>
                <p className="text-xs text-slate-500">{method.description}</p>
              </div>
              <span
                className={cn(
                  'mt-auto rounded-full px-3 py-1 text-xs font-medium transition',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-slate-200 text-slate-600',
                )}
              >
                {isActive ? 'Selecionado' : 'Selecionar'}
              </span>
            </button>
          )
        })}
      </div>

      <div className="flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500">
          Confirme a forma de pagamento para registrar a venda.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button
            onClick={prevStep}
            variant="outline"
            className="h-12 w-full rounded-xl border-slate-300 text-slate-600 hover:border-slate-400 hover:bg-white sm:w-auto"
          >
            Voltar
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!selectedPaymentMethod || isPaying}
            variant="default"
          >
            {isPaying ? 'Processando...' : 'Finalizar venda'}
          </Button>
        </div>
      </div>
    </div>
  )
}
