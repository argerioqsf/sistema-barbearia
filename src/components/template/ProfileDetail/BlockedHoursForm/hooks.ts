'use client'

import { useToast } from '@/components/ui/use-toast'
import { InitialState } from '@/types/general'
import { useEffect, useMemo, useState } from 'react'

export type BlockedItem = { id?: string; startHour: string; endHour: string }
export type WorkHourItem = {
  id?: string
  weekDay: number
  startHour: string
  endHour: string
}

export type EditorContext =
  | { open: true; mode: 'create'; start: Date; end: Date }
  | { open: true; mode: 'edit'; id: string; start: Date; end: Date }
  | null

export type SubmitAction = (
  prev: InitialState<Record<string, unknown>>,
  fd: FormData,
) => Promise<InitialState<Record<string, unknown>>>

export function useToastFeedback(
  state?: InitialState<Record<string, unknown>>,
) {
  const { toast } = useToast()
  useEffect(() => {
    if (!state) return
    if (state?.errors?.request) {
      toast({
        title: 'Falha ao criar bloqueio',
        description: String(state.errors.request),
        variant: 'destructive',
      })
    } else if (state?.ok) {
      toast({ title: 'Bloqueio adicionado com sucesso!' })
    }
  }, [state, toast])
}

function parseISOAsLocal(dateStr: string) {
  // Parse ISO-like strings as local time, ignoring timezone (Z or ±HH:MM)
  const m = dateStr.match(
    /^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2})(?::(\d{2}))?/,
  )
  if (m) {
    const [, y, mo, d, hh, mm, ss] = m
    return new Date(
      Number(y),
      Number(mo) - 1,
      Number(d),
      Number(hh),
      Number(mm),
      Number(ss ?? '0'),
    )
  }
  return new Date(dateStr)
}

export function isSameDay(dateStr: string, day: Date) {
  const d = parseISOAsLocal(dateStr)
  return (
    d.getFullYear() === day.getFullYear() &&
    d.getMonth() === day.getMonth() &&
    d.getDate() === day.getDate()
  )
}

export function buildDateFromTime(base: Date, value: string) {
  if (value && !value.includes('T')) {
    const [hh = '0', mm = '0', ss = '0'] = value.split(':')
    return new Date(
      base.getFullYear(),
      base.getMonth(),
      base.getDate(),
      Number(hh),
      Number(mm),
      Number(ss),
    )
  }
  // ISO or datetime string: interpret as local time to avoid timezone shifts
  return parseISOAsLocal(value)
}

export function toLocal(d: Date) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hh = String(d.getHours()).padStart(2, '0')
  const mm = String(d.getMinutes()).padStart(2, '0')
  return `${y}-${m}-${day}T${hh}:${mm}`
}

export function toLocalInputValue(isoString: string) {
  const d = new Date(isoString)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hh = String(d.getHours()).padStart(2, '0')
  const mm = String(d.getMinutes()).padStart(2, '0')
  return `${y}-${m}-${day}T${hh}:${mm}`
}

export type TimelineBlock = {
  top: number
  height: number
  label: string
  start: Date
  end: Date
}

export function useBlockedHoursForm({
  blocked,
  workHours,
}: {
  blocked: BlockedItem[]
  workHours: WorkHourItem[]
}) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [editor, setEditor] = useState<EditorContext>(null)
  const [optimistic, setOptimistic] = useState<BlockedItem[]>([])

  const mergedBlocked = useMemo(
    () => [...blocked, ...optimistic],
    [blocked, optimistic],
  )
  const highlighted = useMemo(
    () => mergedBlocked.map((b) => parseISOAsLocal(b.startHour)),
    [mergedBlocked],
  )

  const slotHeight = 36
  const dayHeight = slotHeight * 24

  const timeline = useMemo(() => {
    if (!selectedDate) return null
    function labelFromDate(d: Date) {
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    const filtered = (mergedBlocked || []).filter((b) =>
      isSameDay(b.startHour, selectedDate),
    )
    const dayBlocks: TimelineBlock[] = filtered.map((b) => {
      const bs = buildDateFromTime(selectedDate, b.startHour)
      const be = buildDateFromTime(selectedDate, b.endHour)
      const startMin = bs.getHours() * 60 + bs.getMinutes()
      const endMin = be.getHours() * 60 + be.getMinutes()
      return {
        top: (startMin / 60) * slotHeight,
        height: Math.max(((endMin - startMin) / 60) * slotHeight, 8),
        label: `${labelFromDate(bs)} - ${labelFromDate(be)}`,
        start: bs,
        end: be,
      }
    })
    const weekday = selectedDate.getDay()
    const work = (workHours || []).filter((w) => w.weekDay === weekday)
    const workBlocks: TimelineBlock[] = work.map((w) => {
      const ws = buildDateFromTime(selectedDate, w.startHour)
      const we = buildDateFromTime(selectedDate, w.endHour)
      const startMin = ws.getHours() * 60 + ws.getMinutes()
      const endMin = we.getHours() * 60 + we.getMinutes()
      return {
        top: (startMin / 60) * slotHeight,
        height: Math.max(((endMin - startMin) / 60) * slotHeight, 6),
        label: `${labelFromDate(ws)} - ${labelFromDate(we)}`,
        start: ws,
        end: we,
      }
    })
    const isToday = (() => {
      const now = new Date()
      return (
        now.getFullYear() === selectedDate.getFullYear() &&
        now.getMonth() === selectedDate.getMonth() &&
        now.getDate() === selectedDate.getDate()
      )
    })()
    return { filtered, dayBlocks, workBlocks, isToday }
  }, [mergedBlocked, workHours, selectedDate])

  function addOptimistic(start: Date, end: Date) {
    // Use local datetime string to avoid timezone jumps (no Z)
    setOptimistic((prev) => [
      ...prev,
      { startHour: toLocal(start), endHour: toLocal(end) },
    ])
  }
  function clearOptimistic() {
    setOptimistic([])
  }

  return {
    selectedDate,
    setSelectedDate,
    editor,
    setEditor,
    highlighted,
    slotHeight,
    dayHeight,
    timeline,
    addOptimistic,
    clearOptimistic,
  }
}
