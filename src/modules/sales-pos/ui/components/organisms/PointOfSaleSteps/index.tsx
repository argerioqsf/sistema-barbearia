'use client'

import { useState } from 'react'
import { AddItems } from './add-items'
import { CustomerInfo } from './customer-info'
import { Payment } from './payment'
import { useSale } from '@/modules/sales-pos/ui/hooks/useSale'

interface StepsProps {
  saleId: string
}

export function Steps({ saleId }: StepsProps) {
  const { sale, setCustomer, paySale } = useSale(saleId)
  const [step, setStep] = useState(1)

  const nextStep = () => setStep((prev) => prev + 1)
  const prevStep = () => setStep((prev) => Math.max(1, prev - 1))

  return (
    <div className="lg:col-span-8 h-fit overflow-y-auto rounded-2xl shadow-2xl backdrop-blur-lg animate-opacityUp">
      {step === 1 && (
        <CustomerInfo
          setCustomer={(customerId) => setCustomer(customerId)}
          nextStep={nextStep}
          initialClientId={sale?.clientId}
          initialClient={sale?.client ?? null}
        />
      )}
      {step === 2 && <AddItems saleId={saleId} nextStep={nextStep} />}
      {step === 3 && (
        <Payment paySale={(method) => paySale(method)} prevStep={prevStep} />
      )}
    </div>
  )
}
