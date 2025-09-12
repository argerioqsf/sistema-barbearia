'use client'

import { Button, InputForm, Text } from '@/components/atoms'
import { useToast } from '@/components/ui/use-toast'
import { InitialState } from '@/types/general'
import React, { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'

type Props = {
  onSubmit: (
    prev: InitialState<Record<string, unknown>>,
    fd: FormData,
  ) => Promise<InitialState<Record<string, unknown>>>
}

const WEEK_DAYS = [
  { label: 'Dom', value: 0 },
  { label: 'Seg', value: 1 },
  { label: 'Ter', value: 2 },
  { label: 'Qua', value: 3 },
  { label: 'Qui', value: 4 },
  { label: 'Sex', value: 5 },
  { label: 'Sáb', value: 6 },
]

export default function WorkHoursForm({ onSubmit }: Props) {
  const [selectedDay, setSelectedDay] = useState<number>(1)
  const { toast } = useToast()
  const [state, formAction] = useFormState(onSubmit, {})

  useEffect(() => {
    if (state?.errors?.request) {
      toast({
        title: 'Falha ao salvar horário',
        description: state.errors.request,
        variant: 'destructive',
      })
    } else if (state?.ok) {
      toast({ title: 'Horário adicionado com sucesso!' })
    }
  }, [state, toast])

  return (
    <form
      action={(fd: FormData) => {
        const start = String(fd.get('startHour') ?? '')
        const end = String(fd.get('endHour') ?? '')
        if (start && end && start >= end) {
          toast({
            title: 'Dados inválidos',
            description: 'Hora final deve ser maior que a inicial.',
            variant: 'destructive',
          })
          return
        }
        fd.set('weekDay', String(selectedDay))
        formAction(fd)
      }}
      className="mt-3 grid grid-cols-1 md:grid-cols-4 gap-3 items-end"
    >
      <div className="md:col-span-4">
        <Text className="mb-2">Dia da semana</Text>
        <div className="flex flex-wrap gap-2">
          {WEEK_DAYS.map((d) => (
            <button
              key={d.value}
              type="button"
              onClick={() => setSelectedDay(d.value)}
              className={
                'px-3 py-2 rounded-md text-sm border transition-colors ' +
                (selectedDay === d.value
                  ? 'bg-secondary-50 text-white border-transparent'
                  : 'bg-transparent text-white/90 border-white/20 hover:bg-white/10')
              }
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <Text className="mb-1">Início</Text>
        <InputForm type="time" id="startHour" name="startHour" />
      </div>
      <div>
        <Text className="mb-1">Fim</Text>
        <InputForm type="time" id="endHour" name="endHour" />
      </div>
      <div>
        <Button type="submit" className="bg-secondary-100 text-white">
          Adicionar
        </Button>
      </div>
      <input type="hidden" name="weekDay" value={String(selectedDay)} />
    </form>
  )
}
