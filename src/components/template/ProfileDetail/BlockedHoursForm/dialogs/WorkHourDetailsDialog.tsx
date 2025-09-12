'use client'

import React from 'react'
import { Button, Text } from '@/components/atoms'
import { useToast } from '@/components/ui/use-toast'
import type { SubmitAction } from '../hooks'

export default function WorkHourDetailsDialog({
  ctx,
  onClose,
  onDelete,
}: {
  ctx: { id: string; start: Date; end: Date }
  onClose: () => void
  onDelete?: SubmitAction
}) {
  const { toast } = useToast()
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40">
      <div className="w-[90vw] max-w-md rounded-xl bg-white p-4 shadow">
        <Text className="text-gray-900 font-semibold mb-3">
          Horário de trabalho
        </Text>
        <div className="grid grid-cols-1 gap-3">
          <div>
            <Text className="mb-1 text-gray-700">Início</Text>
            <input
              value={ctx.start.toLocaleString()}
              readOnly
              className="w-full rounded-md border px-3 py-2 bg-gray-50 text-gray-700"
            />
          </div>
          <div>
            <Text className="mb-1 text-gray-700">Fim</Text>
            <input
              value={ctx.end.toLocaleString()}
              readOnly
              className="w-full rounded-md border px-3 py-2 bg-gray-50 text-gray-700"
            />
          </div>
          <div className="flex items-center justify-between gap-2 mt-2">
            <Button
              type="button"
              className="bg-gray-200 text-gray-800"
              onClick={onClose}
            >
              Fechar
            </Button>
            {onDelete && (
              <form
                action={async (fd: FormData) => {
                  fd.set('id', ctx.id)
                  const res = await onDelete({}, fd)
                  if (res?.ok) {
                    toast({ title: 'Horário removido' })
                    onClose()
                  } else if (res?.errors?.request) {
                    toast({
                      title: 'Falha ao remover',
                      description: String(res.errors.request),
                      variant: 'destructive',
                    })
                  }
                }}
              >
                <Button type="submit" className="bg-red-600 text-white">
                  Remover
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
