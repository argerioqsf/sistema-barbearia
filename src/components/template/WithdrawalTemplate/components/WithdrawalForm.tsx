'use client'

import { Combobox, type ComboboxOption } from '@/components/ui/combo-box'
import { CurrencyInput } from '@/components/ui/currency-input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { ImageInput } from '@/components/organisms/Form/ImageInput'
import { FormField } from '@/components/organisms/Form/FormField'
import { TRANSACTION_REASON_OPTIONS } from '@/features/transactions/constants'
import { ReasonTransaction } from '@/features/transactions/schemas'
import { NormalizedError } from '@/shared/errors/types'

interface WithdrawalFormProps {
  formId: string
  formAction: (formData: FormData) => void
  formKey: number
  unitId?: string
  states: {
    withdrawalType?: 'UNIT' | 'COLLABORATOR'
    amount?: number
    affectedUserId: string
    collaboratorOptions: ComboboxOption<string>[]
    isLoading: boolean
    receiptFile?: File
    reason: ReasonTransaction | ''
    errors: NormalizedError
  }
  setters: {
    setWithdrawalType: (value: 'UNIT' | 'COLLABORATOR') => void
    setAmount: (value?: number) => void
    setAffectedUser: (value: string | '') => void
    setReceiptFile: (file?: File) => void
    setReason: (value: ReasonTransaction | '') => void
  }
}

export function WithdrawalForm({
  formId,
  formAction,
  formKey,
  states,
  setters,
  unitId,
}: WithdrawalFormProps) {
  const {
    withdrawalType,
    amount,
    affectedUserId,
    collaboratorOptions,
    isLoading,
    receiptFile,
    reason,
    errors,
  } = states

  const {
    setWithdrawalType,
    setAmount,
    setAffectedUser,
    setReceiptFile,
    setReason,
  } = setters

  async function handleFormAction(formData: FormData) {
    if (receiptFile) {
      formData.append('receipt', receiptFile)
    }
    formAction(formData)
  }

  return (
    <form key={formKey} id={formId} action={handleFormAction}>
      <input type="hidden" name="amount" value={amount || 0} />
      <input type="hidden" name="unitId" value={unitId} />
      <input type="hidden" name="reason" value={reason} />

      <div className="mt-6 space-y-6">
        <div className="space-y-2">
          <FormField label="Tipo de Retirada" htmlFor="type">
            <RadioGroup
              name="type"
              value={withdrawalType}
              onValueChange={(value: 'UNIT' | 'COLLABORATOR') => {
                setWithdrawalType(value)
                setAffectedUser('')
              }}
              className="flex items-center gap-4"
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="UNIT" id="unit" />
                <Label htmlFor="unit">Da Unidade</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="COLLABORATOR" id="collaborator" />
                <Label htmlFor="collaborator">De Colaborador</Label>
              </div>
            </RadioGroup>
          </FormField>
        </div>

        {withdrawalType === 'COLLABORATOR' && (
          <div className="space-y-2">
            <Label htmlFor="affectedUserId">Colaborador</Label>
            <input type="hidden" name="affectedUserId" value={affectedUserId} />
            <Combobox
              options={collaboratorOptions}
              onValueChange={setAffectedUser}
              value={affectedUserId}
              placeholder="Selecione um colaborador..."
              searchPlaceholder="Buscar colaborador..."
              emptyPlaceholder={
                isLoading ? 'Carregando...' : 'Nenhum colaborador encontrado.'
              }
              disabled={isLoading}
            />
          </div>
        )}

        <FormField
          errors={
            errors.type === 'validation' ? errors.issues?.issues : undefined
          }
          label="Motivo da Retirada"
          htmlFor="reason"
        >
          <Combobox<ReasonTransaction | ''>
            options={TRANSACTION_REASON_OPTIONS}
            onValueChange={setReason}
            value={reason}
            placeholder="Selecione o motivo de retirada..."
          />
        </FormField>

        <div className="space-y-2">
          <Label htmlFor="amount">Valor da Retirada</Label>
          <CurrencyInput
            placeholder="R$ 0,00"
            value={amount}
            onValueChange={setAmount}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            name="description"
            placeholder="Ex: Adiantamento de salário"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="receipt">Comprovante (Opcional)</Label>
          <ImageInput value={receiptFile} onValueChange={setReceiptFile} />
        </div>
      </div>
    </form>
  )
}
