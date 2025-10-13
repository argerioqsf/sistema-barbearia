'use client'

import { FloatingBottomBar } from '@/components/organisms/FloatingBottomBar'
import { Button } from '@/components/ui/button'
import { PageCard, PageCardContent } from '@/components/ui/page-card'
import { ZUser } from '@/features/users/schemas'
import { Check, Info } from 'lucide-react'

const formatCurrency = (value?: number) => {
  if (value === undefined || value === null) return 'R$ 0,00'
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

function SummaryPlaceholder({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <PageCard className="flex items-center justify-center h-full">
      <PageCardContent className="text-center text-muted-foreground">
        <Info className="mx-auto h-12 w-12" />
        <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
        <p className="mt-1 text-sm">{description}</p>
      </PageCardContent>
    </PageCard>
  )
}

interface WithdrawalSummaryProps {
  showSummary: boolean
  withdrawalType?: 'UNIT' | 'COLLABORATOR'
  selectedUser?: ZUser | null
  currentBalance: number
  finalBalance: number
  amount?: number
  formId: string
}

export function WithdrawalSummary({
  showSummary,
  withdrawalType,
  selectedUser,
  currentBalance,
  finalBalance,
  amount,
  formId,
}: WithdrawalSummaryProps) {
  const summaryContent = (
    <div className="mt-4 space-y-4 text-sm">
      <div className="flex justify-between">
        <span className="text-muted-foreground">Destino</span>
        <span>
          {withdrawalType === 'UNIT' ? 'Unidade' : selectedUser?.name ?? '-'}
        </span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">Saldo Atual</span>
        <span className="font-medium">{formatCurrency(currentBalance)}</span>
      </div>
      <div className="flex justify-between text-red-600">
        <span className="text-muted-foreground">Valor da Retirada</span>
        <span className="font-medium">- {formatCurrency(amount)}</span>
      </div>
      <div className="border-t border-dashed my-2"></div>
      <div className="flex justify-between font-semibold text-base">
        <span>Saldo Final</span>
        <span>{formatCurrency(finalBalance)}</span>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Summary Card */}
      <div className="hidden lg:block">
        {!showSummary ? (
          <div className="h-80">
            <SummaryPlaceholder
              title="Nenhum destino selecionado"
              description="Selecione se a retirada é da unidade ou de um colaborador."
            />
          </div>
        ) : (
          <PageCard>
            <PageCardContent>
              <h3 className="text-lg font-semibold">Resumo da Retirada</h3>
              {summaryContent}
              <div className="pt-6 w-full flex justify-end">
                <Button className="w-full" form={formId} type="submit">
                  Confirmar Retirada
                </Button>
              </div>
            </PageCardContent>
          </PageCard>
        )}
      </div>

      {/* Mobile Bottom Bar */}
      <FloatingBottomBar hidden={!showSummary}>
        <div className="flex justify-between items-center w-full gap-4">
          <div>
            <p className="text-xs text-red-400/80">Retirada</p>
            <p className="text-md font-semibold text-red-400">
              - {formatCurrency(amount)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-primary/40">Saldo Final</p>
            <p className="text-lg font-semibold text-primary-foreground">
              {formatCurrency(finalBalance)}
            </p>
          </div>
          <div className="flex-shrink-0">
            <Button
              form={formId}
              type="submit"
              size="icon"
              className="rounded-full h-14 w-14 bg-primary"
            >
              <Check className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </FloatingBottomBar>
    </>
  )
}
