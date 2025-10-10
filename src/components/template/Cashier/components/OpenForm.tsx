'use client'

import { Button, InputForm, Text } from '@/components/atoms'
import { openCashSession } from '@/actions/cash-session'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import { useToast } from '@/components/ui/use-toast'
import type { InitialState } from '@/types/general'

type Props = { visible?: boolean }

export default function OpenForm({ visible = true }: Props) {
  const initial: InitialState<object> = {}
  const [state, action] = useFormState<InitialState<object>, FormData>(
    openCashSession,
    initial,
  )
  const { toast } = useToast()

  useEffect(() => {
    if (state?.ok) {
      toast({ title: 'Caixa aberto com sucesso!' })
    } else if (state?.errors?.request) {
      toast({ title: state.errors.request, variant: 'destructive' })
    }
  }, [state, toast])

  return (
    <div
      className={`w-full rounded-2xl border bg-white shadow-sm ${visible ? '' : 'hidden'}`}
    >
      <div className="px-6 py-4 border-b bg-gray-50 rounded-t-2xl">
        <Text className="font-semibold text-gray-800">Abrir caixa</Text>
      </div>
      <div className="p-6">
        <form
          action={action}
          className="flex flex-col sm:flex-row gap-4 sm:items-end"
        >
          <div>
            <Text className="mb-1">Valor inicial</Text>
            <InputForm
              type="number"
              id="initialAmount"
              name="initialAmount"
              className="w-full"
            />
          </div>
          <Button type="submit" className="bg-secondary-100 text-white">
            Abrir
          </Button>
        </form>
      </div>
    </div>
  )
}
