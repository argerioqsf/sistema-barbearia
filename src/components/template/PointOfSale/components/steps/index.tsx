'use client'

import { useState } from 'react'
import { AddItems } from './add-items'
import { CustomerInfo } from './customer-info'
import { Payment } from './payment'
import { ZSale } from '@/features/sales/schemas'
import { usePOS } from '@/hooks/use-pos'

export const Steps: React.FC<{ sale: ZSale }> = ({ sale }) => {
  const { setCustomer, processPayment } = usePOS()
  const [step, setStep] = useState(1)

  const nextStep = () => setStep((prev) => prev + 1)
  const prevStep = () => setStep((prev) => prev - 1)
  return (
    <div className="lg:col-span-8 h-fit overflow-y-auto rounded-2xl shadow-2xl backdrop-blur-lg animate-opacityUp">
      {step === 1 && <AddItems nextStep={nextStep} sale={sale} />}
      {step === 2 && (
        <CustomerInfo
          setCustomer={(customer) => setCustomer(sale.id, customer)}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 3 && (
        <Payment
          paySale={(method) =>
            processPayment({ paymentMethod: method }, sale.id)
          }
          prevStep={prevStep}
        />
      )}
    </div>
  )
}
