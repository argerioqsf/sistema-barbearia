'use client'

import { Button, InputForm, Text } from '@/components/atoms'
import { useToast } from '@/components/ui/use-toast'
import { InitialState } from '@/types/general'
import React, { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { toLocal, toLocalInputValue } from './hooks'
import type { SubmitAction } from './hooks'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { handleIcons } from '@/utils/handleIcons'

export type ManageCtx =
  | { open: true; mode: 'create'; start: Date; end: Date }
  | { open: true; mode: 'edit'; id: string; start: Date; end: Date }

export default function ManageDialog({
  context,
  onClose,
  onCreate,
  onUpdate,
  onDelete,
  onDraftChange,
  isWithinWorkHours,
}: {
  context: ManageCtx
  onClose: () => void
  onCreate: SubmitAction
  onUpdate?: (
    id: string,
    prev: InitialState<Record<string, unknown>>,
    fd: FormData,
  ) => Promise<InitialState<Record<string, unknown>>>
  onDelete?: (
    prev: InitialState<Record<string, unknown>>,
    fd: FormData,
  ) => Promise<InitialState<Record<string, unknown>>>
  onDraftChange?: (start: Date, end: Date) => void
  isWithinWorkHours?: (start: Date, end: Date) => boolean
}) {
  if (context.mode === 'create') {
    return (
      <CreateDialog
        start={context.start}
        end={context.end}
        onClose={onClose}
        onCreate={onCreate}
        onDraftChange={onDraftChange}
        isWithinWorkHours={isWithinWorkHours}
      />
    )
  }
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40">
      <EditDialogContent
        id={context.id}
        defaultStart={context.start.toISOString()}
        defaultEnd={context.end.toISOString()}
        onUpdate={onUpdate!}
        onDelete={onDelete}
        onClose={onClose}
      />
    </div>
  )
}

function CreateDialog({
  start,
  end,
  onCreate,
  onClose,
  onDraftChange,
  isWithinWorkHours,
}: {
  start: Date
  end: Date
  onCreate: SubmitAction
  onClose: () => void
  onDraftChange?: (start: Date, end: Date) => void
  isWithinWorkHours?: (start: Date, end: Date) => boolean
}) {
  const [state, formAction] = useFormState<
    InitialState<Record<string, unknown>>,
    FormData
  >(onCreate, {})
  const { toast } = useToast()
  const [s, setS] = React.useState<Date>(start)
  const [e, setE] = React.useState<Date>(end)
  React.useEffect(() => {
    setS(start)
    setE(end)
  }, [start, end])
  const canCreate = React.useMemo(() => {
    if (!s || !e) return false
    if (s >= e) return false
    if (isWithinWorkHours) return isWithinWorkHours(s, e)
    return true
  }, [s, e, isWithinWorkHours])
  useEffect(() => {
    if (!state) return
    if (state.ok) {
      toast({ title: 'Bloqueio adicionado com sucesso!' })
      onClose()
    } else if (state.errors?.request) {
      toast({
        title: 'Falha ao criar bloqueio',
        description: String(state.errors.request),
        variant: 'destructive',
      })
    }
  }, [state, toast, onClose])
  function parseLocalInput(val: string) {
    const m = val.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/)
    if (!m) return null
    const [, y, mo, d, hh, mm] = m
    return new Date(
      Number(y),
      Number(mo) - 1,
      Number(d),
      Number(hh),
      Number(mm),
    )
  }
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const sh = fd.get('startHour') as string | null
    const eh = fd.get('endHour') as string | null
    if (!sh || !eh) return
    const ss = parseLocalInput(sh)
    const ee = parseLocalInput(eh)
    if (!ss || !ee) return
    if (isWithinWorkHours && !isWithinWorkHours(ss, ee)) {
      toast({
        title: 'Fora do horário de trabalho',
        description: 'Selecione um horário dentro da sua jornada.',
        variant: 'destructive',
      })
      return
    }
    ;(formAction as unknown as (fd: FormData) => void)(fd)
  }
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40">
      <div className="w-[90vw] max-w-md rounded-xl bg-white p-4 shadow">
        <Text className="text-gray-900 font-semibold mb-3">Novo bloqueio</Text>
        <form onSubmit={onSubmit} className="grid grid-cols-1 gap-3">
          <div>
            <Text className="mb-1 text-gray-700">Início</Text>
            <InputForm
              type="datetime-local"
              name="startHour"
              defaultValue={toLocal(start)}
              onChange={(ev) => {
                const nd = parseLocalInput(
                  (ev.target as HTMLInputElement).value,
                )
                if (!nd) return
                setS(nd)
                onDraftChange?.(nd, e)
              }}
            />
          </div>
          <div>
            <Text className="mb-1 text-gray-700">Fim</Text>
            <InputForm
              type="datetime-local"
              name="endHour"
              defaultValue={toLocal(end)}
              onChange={(ev) => {
                const nd = parseLocalInput(
                  (ev.target as HTMLInputElement).value,
                )
                if (!nd) return
                setE(nd)
                onDraftChange?.(s, nd)
              }}
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
            <Button
              type="submit"
              className="bg-secondary-100 text-white"
              disabled={!canCreate}
            >
              Criar
            </Button>
          </div>
          {!canCreate && (
            <Text className="text-[12px] text-red-600 mt-1">
              Selecione um intervalo válido dentro do horário de trabalho.
            </Text>
          )}
        </form>
      </div>
    </div>
  )
}

function EditDialogContent({
  id,
  defaultStart,
  defaultEnd,
  onDelete,
  onClose,
}: {
  id: string
  defaultStart: string
  defaultEnd: string
  onUpdate?: (
    id: string,
    prev: InitialState<Record<string, unknown>>,
    fd: FormData,
  ) => Promise<InitialState<Record<string, unknown>>>
  onDelete?: (
    prev: InitialState<Record<string, unknown>>,
    fd: FormData,
  ) => Promise<InitialState<Record<string, unknown>>>
  onClose: () => void
}) {
  return (
    <div className="w-[90vw] max-w-md rounded-xl bg-white p-4 shadow">
      <Text className="text-gray-900 font-semibold mb-3">Editar bloqueio</Text>
      <div className="grid grid-cols-1 gap-3">
        <div>
          <Text className="mb-1 text-gray-700">Início</Text>
          <InputForm
            type="datetime-local"
            name="startHour"
            defaultValue={toLocalInputValue(defaultStart)}
            disabled
          />
        </div>
        <div>
          <Text className="mb-1 text-gray-700">Fim</Text>
          <InputForm
            type="datetime-local"
            name="endHour"
            defaultValue={toLocalInputValue(defaultEnd)}
            disabled
          />
        </div>
        <div className="flex items-center justify-between gap-2 mt-2">
          <Button
            type="button"
            className="bg-gray-200 text-gray-800"
            onClick={onClose}
          >
            Cancelar
          </Button>
          <div className="flex items-center gap-2">
            {onDelete && (
              <DeleteWithConfirm
                id={id}
                onDelete={onDelete}
                onDeleted={onClose}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function DeleteWithConfirm({
  id,
  onDelete,
  onDeleted,
}: {
  id: string
  onDelete: (
    prev: InitialState<Record<string, unknown>>,
    fd: FormData,
  ) => Promise<InitialState<Record<string, unknown>>>
  onDeleted?: () => void
}) {
  const [open, setOpen] = useState(false)
  const [state, formAction] = useFormState(onDelete, {})
  const { toast } = useToast()
  useEffect(() => {
    if (state?.ok) {
      toast({ title: 'Bloqueio removido' })
      setOpen(false)
      onDeleted?.()
    } else if (state?.errors?.request) {
      toast({
        title: 'Falha ao remover',
        description: String(state.errors.request),
        variant: 'destructive',
      })
    }
  }, [state, toast, onDeleted])
  const Trash = handleIcons('Trash')
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <button
          type="button"
          aria-label="Remover"
          className="p-1 rounded-md hover:bg-white/20"
        >
          <Trash size={14} />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-md z-[130]">
        <AlertDialogHeader>
          <AlertDialogTitle>Deseja remover este bloqueio?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não poderá ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-4">
          <AlertDialogCancel asChild>
            <button className="bg-gray-200 text-gray-800 px-3 py-2 rounded-md">
              Cancelar
            </button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <form action={formAction}>
              <input type="hidden" name="id" value={id} />
              <button
                type="submit"
                className="bg-red-600 text-white px-3 py-2 rounded-md"
              >
                Remover
              </button>
            </form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
