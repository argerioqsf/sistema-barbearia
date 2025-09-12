'use client'

import React from 'react'
import { Button, Text } from '@/components/atoms'
import { useToast } from '@/components/ui/use-toast'
import type { SubmitAction } from '../hooks'

export default function CreateWorkHourDialog({
  ctx,
  onClose,
  onCreate,
  onDraftChange,
}: {
  ctx: { start: Date; end: Date; weekDay: number }
  onClose: () => void
  onCreate: SubmitAction
  onDraftChange?: (start: Date, end: Date) => void
}) {
  const [submitting, setSubmitting] = React.useState(false)
  const { toast } = useToast()
  const [startVal, setStartVal] = React.useState(() => toTime(ctx.start))
  const [endVal, setEndVal] = React.useState(() => toTime(ctx.end))

  function toTime(d: Date) {
    return d
      .toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
      .padStart(5, '0')
  }
  function atTime(base: Date, hhmm: string) {
    const [hh = '0', mm = '0'] = hhmm.split(':')
    return new Date(
      base.getFullYear(),
      base.getMonth(),
      base.getDate(),
      Number(hh),
      Number(mm),
      0,
      0,
    )
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40">
      <div className="w-[90vw] max-w-md rounded-xl bg-white p-4 shadow">
        <Text className="text-gray-900 font-semibold mb-3">Criar jornada</Text>
        <form
          action={async (fd: FormData) => {
            if (submitting) return
            const start = String(fd.get('startHour') ?? startVal)
            const end = String(fd.get('endHour') ?? endVal)
            if (start && end && start >= end) {
              toast({
                title: 'Dados inválidos',
                description: 'Hora final deve ser maior que a inicial.',
                variant: 'destructive',
              })
              return
            }
            fd.set('weekDay', String(ctx.weekDay))
            try {
              setSubmitting(true)
              const result = await onCreate({}, fd)
              if (result?.ok) {
                toast({ title: 'Jornada criada com sucesso!' })
                onClose()
              } else if (result?.errors?.request) {
                toast({
                  title: 'Falha ao criar jornada',
                  description: String(result.errors.request),
                  variant: 'destructive',
                })
              } else {
                toast({
                  title: 'Falha ao criar jornada',
                  variant: 'destructive',
                })
              }
            } finally {
              setSubmitting(false)
            }
          }}
          className="grid grid-cols-1 gap-3"
        >
          <div>
            <Text className="mb-1 text-gray-700">Dia da semana</Text>
            <input
              value={
                ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'][ctx.weekDay]
              }
              readOnly
              className="w-full rounded-md border px-3 py-2 bg-gray-50 text-gray-700"
            />
          </div>
          <div>
            <Text className="mb-1 text-gray-700">Início</Text>
            <input
              type="time"
              name="startHour"
              value={startVal}
              onChange={(e) => {
                const v = e.target.value
                setStartVal(v)
                const s = atTime(ctx.start, v)
                const eDate = atTime(ctx.end, endVal)
                onDraftChange?.(s, eDate)
              }}
              className="w-full rounded-md border px-3 py-2"
            />
          </div>
          <div>
            <Text className="mb-1 text-gray-700">Fim</Text>
            <input
              type="time"
              name="endHour"
              value={endVal}
              onChange={(e) => {
                const v = e.target.value
                setEndVal(v)
                const sDate = atTime(ctx.start, startVal)
                const eNew = atTime(ctx.end, v)
                onDraftChange?.(sDate, eNew)
              }}
              className="w-full rounded-md border px-3 py-2"
            />
          </div>
          <div className="flex items-center justify-end gap-2 mt-2">
            <Button
              type="button"
              className="bg-gray-200 text-gray-800"
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button type="submit" className="bg-secondary-100 text-white">
              Criar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
