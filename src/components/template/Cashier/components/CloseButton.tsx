'use client'

import { Button } from '@/components/atoms'
import { closeCashSessionForm } from '@/actions/cash-session'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import { useToast } from '@/components/ui/use-toast'
import type { InitialState } from '@/types/general'

export default function CloseButton() {
  const initial: InitialState<object> = {}
  const [state, action] = useFormState<InitialState<object>, FormData>(
    closeCashSessionForm,
    initial,
  )
  const { toast } = useToast()

  useEffect(() => {
    if (state?.ok) {
      toast({ title: 'Caixa fechado com sucesso!' })
    } else if (state?.errors?.request) {
      toast({ title: state.errors.request, variant: 'destructive' })
    }
  }, [state, toast])

  return (
    <form action={action}>
      <Button type="submit" className="bg-red-500 text-white">
        Fechar caixa
      </Button>
    </form>
  )
}
