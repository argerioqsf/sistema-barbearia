'use client'

import { Button, TitleForm } from '@/components/atoms'
import { useState } from 'react'
import { CreditCard, DollarSign, QrCode } from 'lucide-react'

interface PaymentProps {
  paySale: (body: string) => void
  prevStep: () => void
}

export function Payment({ paySale, prevStep }: PaymentProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')

  const paymentMethods = [
    { id: 'pix', name: 'PIX', icon: QrCode },
    { id: 'credit_card', name: 'Cartão de Crédito', icon: CreditCard },
    { id: 'cash', name: 'Dinheiro', icon: DollarSign },
  ]

  return (
    <div>
      <TitleForm title="Pagamento" />
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paymentMethods.map((method) => {
          const Icon = method.icon
          return (
            <div
              key={method.id}
              className={`p-8 border rounded-xl cursor-pointer transition-all duration-200 ease-in-out ${selectedPaymentMethod === method.id ? 'bg-primary-50/20 border-primary shadow-lg' : 'bg-gray-100 border-gray-200 hover:bg-gray-200'}`}
              onClick={() => setSelectedPaymentMethod(method.id)}
            >
              <Icon className="w-10 h-10 text-primary" />
              <p className="font-bold text-xl text-gray-900">{method.name}</p>
            </div>
          )
        })}
      </div>
      <div className="flex justify-between mt-8">
        <Button
          onClick={prevStep}
          className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 text-lg"
        >
          Anterior
        </Button>
        <Button
          onClick={() => paySale(selectedPaymentMethod)}
          disabled={!selectedPaymentMethod}
          className="bg-secondary-600 hover:bg-secondary-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 text-lg"
        >
          Finalizar Venda
        </Button>
      </div>
    </div>
  )
}
