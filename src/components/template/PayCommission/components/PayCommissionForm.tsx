'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { FormField } from '@/components/organisms/Form/FormField'
import { FormSection } from '@/components/organisms/Form/FormSection'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import type { ZUser } from '@/features/users/schemas'
import { payCommissionAction } from '@/actions/transaction'
import { getUser } from '@/actions/user'
import { CollaboratorInfoCard } from './CollaboratorInfoCard'

import { ZAppointment } from '@/features/appointments/schemas'
import { getUnpaidSaleItems } from '@/actions/sale'
import { getUnpaidAppointments } from '@/actions/appointment'
import { ZSaleItemWithRemainingValue } from '@/features/saleItems/schema'
import { logger } from '@/shared/logger'
import { DataListEmptyState } from '@/components/organisms/DataList'
import { formatDateCustom } from '@/shared/date'
import { Combobox } from '@/components/ui/combo-box'

type PayCommissionFormProps = {
  users: ZUser[]
  userIdFromQuery?: string
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Processando...' : 'Realizar Pagamento'}
    </Button>
  )
}

export function PayCommissionForm({
  users,
  userIdFromQuery,
}: PayCommissionFormProps) {
  const [state, formAction] = useFormState(payCommissionAction, {
    ok: false,
    error: {
      type: 'validation',
      issues: {
        issues: [],
      },
      message: '',
    },
  })
  const { toast } = useToast()
  const router = useRouter()

  const [affectedUserId, setAffectedUserId] = useState(userIdFromQuery || '')
  const [selectedUser, setSelectedUser] = useState<ZUser | null>(null)
  const [paymentMode, setPaymentMode] = useState('amount') // 'amount' or 'items'

  const [unpaidSaleItems, setUnpaidSaleItems] = useState<
    ZSaleItemWithRemainingValue[]
  >([])
  const [unpaidAppointments, setUnpaidAppointments] = useState<ZAppointment[]>(
    [],
  )

  // Form fields state
  const [amount, setAmount] = useState('')
  const [selectedSaleItemIds, setSelectedSaleItemIds] = useState<string[]>([])
  const [selectedAppointmentIds, setSelectedAppointmentIds] = useState<
    string[]
  >([])
  const [discountLoans, setDiscountLoans] = useState(false)

  // Fetch data when user changes
  useEffect(() => {
    if (!affectedUserId) {
      setUnpaidSaleItems([])
      setUnpaidAppointments([])
      setSelectedUser(null)
      return
    }

    const loadData = async () => {
      const [unpaidSaleItemsResult, unpaidAppointmentsResult, userDataResult] =
        await Promise.all([
          getUnpaidSaleItems(affectedUserId),
          getUnpaidAppointments(affectedUserId),
          getUser(affectedUserId),
        ])

      if (unpaidSaleItemsResult.ok) {
        setUnpaidSaleItems(unpaidSaleItemsResult.data)
      }

      if (unpaidAppointmentsResult.ok) {
        setUnpaidAppointments(unpaidAppointmentsResult.data)
      }

      if (userDataResult.ok) {
        setSelectedUser(userDataResult.data)
      }
    }

    loadData()
  }, [affectedUserId])

  const handleSelectionChange = (
    id: string,
    type: 'saleItem' | 'appointment',
  ) => {
    const updater = (prev: string[]) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]

    if (type === 'saleItem') {
      setSelectedSaleItemIds(updater)
    } else {
      setSelectedAppointmentIds(updater)
    }
  }

  const issues = !state.ok
    ? state.error.type === 'validation'
      ? state.error.issues?.issues
      : []
    : []

  const generalErrorMessage =
    !state.ok && state.error.type !== 'validation'
      ? state.error.message
      : undefined

  // Handle form submission result
  useEffect(() => {
    if (state.ok) {
      toast({ title: 'Pagamento de comissão realizado com sucesso!' })
      router.push('/dashboard/financial/transactions') // Redirect to a relevant page
    } else if (generalErrorMessage) {
      toast({
        title: 'Erro ao processar pagamento',
        description: state.error.message,
        variant: 'destructive',
      })
    }
  }, [state, router, toast, generalErrorMessage])
  logger.debug({ unpaidSaleItems })

  return (
    <form action={formAction} className="space-y-8">
      {/* Hidden fields to submit all relevant data */}
      <input type="hidden" name="affectedUserId" value={affectedUserId} />
      <input type="hidden" name="paymentMode" value={paymentMode} />
      <input
        type="hidden"
        name="saleItemIds"
        value={JSON.stringify(selectedSaleItemIds)}
      />
      <input
        type="hidden"
        name="appointmentIds"
        value={JSON.stringify(selectedAppointmentIds)}
      />
      <input
        type="hidden"
        name="discountLoans"
        value={discountLoans ? 'on' : 'off'}
      />

      {!userIdFromQuery && (
        <FormSection title="Selecione o Colaborador">
          <Combobox
            options={users.map((user) => ({
              value: user.id,
              label: user.name,
            }))}
            onValueChange={setAffectedUserId}
            value={affectedUserId}
            placeholder="Selecione um colaborador..."
            searchPlaceholder="Buscar colaborador..."
          />
        </FormSection>
      )}

      {affectedUserId && selectedUser && (
        <CollaboratorInfoCard user={selectedUser} />
      )}

      {affectedUserId && (
        <>
          <FormSection title="Modo de Pagamento">
            <RadioGroup
              value={paymentMode}
              onValueChange={setPaymentMode}
              className="flex items-center gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="amount" id="mode-amount" />
                <Label htmlFor="mode-amount">Valor Fixo</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="items" id="mode-items" />
                <Label htmlFor="mode-items">Selecionar Itens</Label>
              </div>
            </RadioGroup>
          </FormSection>

          {paymentMode === 'amount' && (
            <FormSection title="Valor do Pagamento">
              <FormField
                label="Valor a Pagar (R$)"
                htmlFor="amount"
                errors={issues}
              >
                <Input
                  name="amount"
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </FormField>
            </FormSection>
          )}

          {paymentMode === 'items' && (
            <>
              <FormSection title="Itens de Venda Pendentes">
                <div className="space-y-2">
                  {unpaidSaleItems.length > 0 ? (
                    unpaidSaleItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-2">
                        <Checkbox
                          id={`sale-item-${item.id}`}
                          onCheckedChange={() =>
                            handleSelectionChange(item.id, 'saleItem')
                          }
                        />
                        <Label
                          className="truncate"
                          htmlFor={`sale-item-${item.id}`}
                        >
                          {`${item.quantity}x`}{' '}
                          {item.product && item.product.name}
                          {item.service && item.service.name} - R${' '}
                          {item.remainingValue.toFixed(2)} -{' '}
                          {formatDateCustom(item.sale.completionDate ?? '')}
                        </Label>
                      </div>
                    ))
                  ) : (
                    <DataListEmptyState
                      title="Nenhum item encontrado."
                      description="Nem um item pendente de pagamento encontrado para esse usuário."
                    />
                  )}
                </div>
              </FormSection>
              <FormSection title="Agendamentos Pendentes">
                <div className="space-y-2">
                  {unpaidAppointments.length > 0 ? (
                    unpaidAppointments.map((item) => (
                      <div key={item.id} className="flex items-center gap-2">
                        <Checkbox
                          id={`appt-item-${item.id}`}
                          onCheckedChange={() =>
                            handleSelectionChange(item.id, 'appointment')
                          }
                        />
                        <Label htmlFor={`appt-item-${item.id}`}>
                          {item.services?.[0]?.service?.name}
                        </Label>
                      </div>
                    ))
                  ) : (
                    <DataListEmptyState
                      title="Nenhum agendamento encontrado."
                      description="Nem um agendamento pendente de pagamento encontrado para esse usuário."
                    />
                  )}
                </div>
              </FormSection>
            </>
          )}

          <FormSection title="Opções Adicionais">
            <FormField label="Descrição" htmlFor="description" errors={issues}>
              <Textarea name="description" />
            </FormField>
            <FormField label="Comprovante" htmlFor="receipt" errors={issues}>
              <Input name="receipt" type="file" />
            </FormField>
            <div className="flex items-center space-x-2 pt-4">
              <Checkbox
                id="discountLoans"
                name="discountLoans"
                onCheckedChange={(checked) =>
                  setDiscountLoans(Boolean(checked))
                }
              />
              <Label htmlFor="discountLoans">
                Descontar empréstimos pendentes do valor final?
              </Label>
            </div>
          </FormSection>
        </>
      )}

      {generalErrorMessage && (
        <p className="text-sm text-red-500 mt-4">{generalErrorMessage}</p>
      )}

      <div className="flex justify-end">
        <SubmitButton />
      </div>
    </form>
  )
}
