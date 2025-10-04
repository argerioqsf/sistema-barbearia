'use client'

import { InitialState } from '@/types/general'
import React from 'react'
import WeekCalendar from './BlockedHoursForm/WeekCalendar'
import ManageDialog from './BlockedHoursForm/ManageDialog'
import {
  useBlockedHoursForm,
  BlockedItem,
  WorkHourItem,
} from './BlockedHoursForm/hooks'
import { UnitOpeningHours } from '@/features/units/schemas'

type Props = {
  onSubmit: (
    prev: InitialState<Record<string, unknown>>,
    fd: FormData,
  ) => Promise<InitialState<Record<string, unknown>>>
  blocked?: Array<{ id?: string; startHour: string; endHour: string }>
  onDelete?: (
    prev: InitialState<Record<string, unknown>>,
    fd: FormData,
  ) => Promise<InitialState<Record<string, unknown>>>
  onUpdate?: (
    id: string,
    prev: InitialState<Record<string, unknown>>,
    fd: FormData,
  ) => Promise<InitialState<Record<string, unknown>>>
  workHours?: Array<{
    id?: string
    weekDay: number
    startHour: string
    endHour: string
  }>
  openingHours?: UnitOpeningHours[]
  onCreateWorkHour?: (
    prev: InitialState<Record<string, unknown>>,
    fd: FormData,
  ) => Promise<InitialState<Record<string, unknown>>>
  onDeleteWorkHour?: (
    prev: InitialState<Record<string, unknown>>,
    fd: FormData,
  ) => Promise<InitialState<Record<string, unknown>>>
}

export default function BlockedHoursForm({
  onSubmit,
  blocked = [],
  onDelete,
  onUpdate,
  workHours = [],
  openingHours = [],
  onCreateWorkHour,
  onDeleteWorkHour,
}: Props) {
  const { editor, setEditor } = useBlockedHoursForm({
    blocked: blocked as BlockedItem[],
    workHours: workHours as WorkHourItem[],
  })
  // Nada a limpar aqui; criação só é aplicada após sucesso do servidor

  return (
    <div className="mt-3 grid grid-cols-1 gap-4">
      <WeekCalendar
        blocked={blocked as BlockedItem[]}
        workHours={workHours as WorkHourItem[]}
        openingHours={openingHours as WorkHourItem[]}
        onCreate={(start, end) =>
          setEditor({ open: true, mode: 'create', start, end })
        }
        onEdit={(id, start, end) =>
          setEditor({ open: true, mode: 'edit', id, start, end })
        }
        createPreview={
          editor && editor.mode === 'create'
            ? { start: editor.start, end: editor.end }
            : null
        }
        onCreateWorkHour={onCreateWorkHour}
        onDeleteWorkHour={onDeleteWorkHour}
      />

      {editor && (
        <ManageDialog
          context={editor}
          onClose={() => setEditor(null)}
          onCreate={onSubmit}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onDraftChange={(start, end) =>
            setEditor((prev) =>
              prev && prev.mode === 'create' ? { ...prev, start, end } : prev,
            )
          }
          isWithinWorkHours={(start, end) =>
            workHours
              .filter((w) => w.weekDay === start.getDay())
              .some((w) => {
                const ws = new Date(
                  start.getFullYear(),
                  start.getMonth(),
                  start.getDate(),
                  parseInt(String(w.startHour).split(':')[0] || '0', 10),
                  parseInt(String(w.startHour).split(':')[1] || '0', 10),
                  0,
                  0,
                )
                const we = new Date(
                  start.getFullYear(),
                  start.getMonth(),
                  start.getDate(),
                  parseInt(String(w.endHour).split(':')[0] || '0', 10),
                  parseInt(String(w.endHour).split(':')[1] || '0', 10),
                  0,
                  0,
                )
                return start >= ws && end <= we
              })
          }
        />
      )}
    </div>
  )
}
