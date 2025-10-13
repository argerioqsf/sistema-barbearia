'use client'

import { FormLayout } from '@/components/organisms/Form/FormLayout'
import { cn } from '@/lib/utils'
import { WithdrawalForm } from './components/WithdrawalForm'
import { WithdrawalSummary } from './components/WithdrawalSummary'
import { useWithdrawal } from './hooks/use-withdrawal'

export function WithdrawalTemplate({ unitId }: { unitId?: string }) {
  const { formId, formAction, formKey, states, setters } = useWithdrawal(unitId)

  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-8 min-w-0 px-6 py-6 pb-16',
        'sm:px-8 sm:py-8 sm:pb-20',
        'lg:grid-cols-3',
      )}
    >
      <FormLayout
        className="lg:col-span-2"
        label="Financeiro"
        title="Nova Retirada"
        description="Registre uma nova retirada de valor da unidade ou de um colaborador."
      >
        <WithdrawalForm
          unitId={unitId}
          formId={formId}
          formAction={formAction}
          formKey={formKey}
          states={states}
          setters={setters}
        />
      </FormLayout>

      <div className="lg:col-span-1">
        <WithdrawalSummary
          formId={formId}
          showSummary={states.showSummary}
          withdrawalType={states.withdrawalType}
          selectedUser={states.selectedUser}
          currentBalance={states.currentBalance}
          finalBalance={states.finalBalance}
          amount={states.amount}
        />
      </div>
    </div>
  )
}
