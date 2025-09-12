'use client'

import React from 'react'
// atoms used inside child components
import WeekHeader from './WeekHeader'
import CreateWorkHourDialog from './dialogs/CreateWorkHourDialog'
import WorkHourDetailsDialog from './dialogs/WorkHourDetailsDialog'
import {
  computeLanes,
  dayLabel,
  formatHM,
  minutesOf,
  startOfWeek,
} from './utils'
import {
  BlockedItem,
  WorkHourItem,
  buildDateFromTime,
  type SubmitAction,
} from './hooks'

type Props = {
  blocked: BlockedItem[]
  workHours: WorkHourItem[]
  openingHours?: WorkHourItem[]
  onCreate: (start: Date, end: Date) => void
  onEdit: (id: string, start: Date, end: Date) => void
  createPreview?: { start: Date; end: Date } | null
  onCreateWorkHour?: SubmitAction
  onDeleteWorkHour?: SubmitAction
}

type TimelineBlock = {
  top: number
  height: number
  label: string
  start: Date
  end: Date
  id?: string
}

const slotHeight = 36
const dayHeight = slotHeight * 24
const gutterPx = 4
const insetPx = 12
const minWorkHeight = 16
const minBlockHeight = 20
const shrinkPx = 8

// moved to utils

export default function WeekCalendar({
  blocked,
  workHours,
  openingHours = [],
  onCreate,
  onEdit,
  createPreview,
  onCreateWorkHour,
  onDeleteWorkHour,
}: Props) {
  const [anchor, setAnchor] = React.useState<Date>(startOfWeek(new Date()))
  const days = React.useMemo(
    () =>
      Array.from(
        { length: 7 },
        (_, i) => new Date(anchor.getTime() + i * 86400000),
      ),
    [anchor],
  )
  // Estado do modo: inicia em 'blocked' e persiste após mount
  const [mode, setMode] = React.useState<'blocked' | 'work'>('blocked')
  React.useEffect(() => {
    if (typeof window === 'undefined') return
    const saved = window.localStorage.getItem('calendar-mode')
    if (saved === 'blocked' || saved === 'work') setMode(saved)
  }, [])

  React.useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem('calendar-mode', mode)
  }, [mode])

  const [createWH, setCreateWH] = React.useState<null | {
    start: Date
    end: Date
    weekDay: number
  }>(null)

  // Preview provisório ao selecionar no modo 'work'
  const workPreview = createWH
  const [viewWH, setViewWH] = React.useState<null | {
    id: string
    start: Date
    end: Date
  }>(null)

  // ---------- Helpers extracted for readability ----------
  function laneMetrics(total: number, lane: number) {
    const widthOuter = `calc(100% - ${insetPx * 2}px)`
    const baseLaneWidth = `calc((${widthOuter} - ${(total - 1) * gutterPx}px) / ${total})`
    const widthCalc = `calc(${baseLaneWidth} - ${(total - 1 - lane) * shrinkPx}px)`
    const leftCalc = `calc(${insetPx}px + ${lane} * (${baseLaneWidth} + ${gutterPx}px))`
    return { leftCalc, widthCalc }
  }

  function hourLines() {
    return Array.from({ length: 25 }, (_, h) => (
      <div
        key={h}
        className="absolute left-0 right-0 border-t border-gray-300 z-10"
        style={{ top: h * slotHeight }}
      />
    ))
  }

  function buildOffSegments(base: TimelineBlock[], dayDate: Date) {
    const startOfDay = new Date(
      dayDate.getFullYear(),
      dayDate.getMonth(),
      dayDate.getDate(),
      0,
      0,
      0,
      0,
    )
    const endOfDay = new Date(
      dayDate.getFullYear(),
      dayDate.getMonth(),
      dayDate.getDate(),
      23,
      59,
      59,
      999,
    )
    const sorted = [...base].sort(
      (a, b) => a.start.getTime() - b.start.getTime(),
    )
    const off: Array<{ top: number; height: number }> = []
    let cursor = startOfDay
    for (const w of sorted) {
      if (w.start > cursor) {
        const top = (minutesOf(cursor) / 60) * slotHeight
        const height = Math.max(
          ((minutesOf(w.start) - minutesOf(cursor)) / 60) * slotHeight,
          1,
        )
        off.push({ top, height })
      }
      if (w.end > cursor) cursor = w.end
    }
    if (cursor < endOfDay) {
      const top = (minutesOf(cursor) / 60) * slotHeight
      const height = Math.max(
        ((minutesOf(endOfDay) - minutesOf(cursor)) / 60) * slotHeight,
        1,
      )
      off.push({ top, height })
    }
    return off
  }

  function renderOffAreas(off: Array<{ top: number; height: number }>) {
    return off.map((o, i) => (
      <div
        key={`off-${i}`}
        className="absolute left-0 right-0 bg-gray-200 pointer-events-none z-0"
        style={{ top: o.top, height: o.height }}
      />
    ))
  }

  function renderOpeningHighlights(openBlocks: TimelineBlock[]) {
    return openBlocks.map((o, i) => (
      <div
        key={`open-${i}`}
        className="absolute left-[12px] right-[12px] rounded-md pointer-events-none z-0"
        style={{
          top: o.top,
          height: o.height,
          border: '1px solid rgba(16,185,129,0.35)',
          background:
            'repeating-linear-gradient(45deg, rgba(16,185,129,0.10) 0, rgba(16,185,129,0.10) 8px, transparent 8px, transparent 16px)',
        }}
      />
    ))
  }

  function renderBlockedItems(
    dayBlocks: TimelineBlock[],
    lanesMap: Record<number, { lane: number; lanes: number }>,
  ) {
    return dayBlocks.map((blk, idx) => {
      const pos = lanesMap[idx] || { lane: 0, lanes: 1 }
      const total = Math.max(pos.lanes || 1, 1)
      const lane = pos.lane || 0
      const { leftCalc, widthCalc } = laneMetrics(total, lane)
      return (
        <button
          key={idx}
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            blk.id && onEdit(String(blk.id), blk.start, blk.end)
          }}
          className="absolute rounded-md bg-red-500 text-white text-xs px-2 py-1 shadow-md border border-red-600 z-10 text-left"
          style={{
            top: blk.top,
            height: blk.height,
            left: leftCalc,
            width: widthCalc,
          }}
        >
          {blk.label}
        </button>
      )
    })
  }

  function renderWorkItems(workBlocks: TimelineBlock[]) {
    if (!onDeleteWorkHour) return null
    return workBlocks.map((w, i) => (
      <button
        key={`wh-${i}`}
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          w.id && setViewWH({ id: String(w.id), start: w.start, end: w.end })
        }}
        className="absolute rounded-md border border-secondary/60 text-secondary-foreground/80 text-[10px] bg-secondary/40 hover:bg-secondary/30"
        style={{ top: w.top, height: w.height, left: insetPx, right: insetPx }}
        title="Detalhes do horário de trabalho"
      >
        {w.label}
      </button>
    ))
  }

  function renderPreviewBlock(
    preview: { start: Date; end: Date } | null,
    dayBlocks: TimelineBlock[],
  ) {
    if (!preview) return null
    const startMin = minutesOf(preview.start)
    const endMin = minutesOf(preview.end)
    const top = (startMin / 60) * slotHeight
    const height = Math.max(
      ((endMin - startMin) / 60) * slotHeight,
      minBlockHeight,
    )
    const label = `${formatHM(preview.start)} - ${formatHM(preview.end)}`
    const previewBlock: TimelineBlock = {
      top,
      height,
      label: '',
      start: preview.start,
      end: preview.end,
    }
    const map = computeLanes([...dayBlocks, previewBlock])
    const pv = map[dayBlocks.length] || { lane: 0, lanes: 1 }
    const total = Math.max(pv.lanes || 1, 1)
    const lane = pv.lane || 0
    const { leftCalc, widthCalc } = laneMetrics(total, lane)
    return (
      <div
        className="absolute rounded-md bg-amber-400/70 text-black text-xs px-2 py-1 border border-amber-500 z-30"
        style={{ top, height, left: leftCalc, width: widthCalc }}
      >
        {label}
      </div>
    )
  }

  function renderWorkPreview(preview: { start: Date; end: Date } | null) {
    if (!preview) return null
    const startMin = minutesOf(preview.start)
    const endMin = minutesOf(preview.end)
    const top = (startMin / 60) * slotHeight
    const height = Math.max(
      ((endMin - startMin) / 60) * slotHeight,
      minBlockHeight,
    )
    const label = `${formatHM(preview.start)} - ${formatHM(preview.end)}`
    return (
      <div
        className="absolute rounded-md bg-amber-400/70 text-black text-xs px-2 py-1 border border-amber-500 z-30"
        style={{ top, height, left: insetPx, right: insetPx }}
      >
        {label}
      </div>
    )
  }

  function handleDayClick(
    dayDate: Date,
    workBlocks: TimelineBlock[],
    e: React.MouseEvent<HTMLDivElement>,
  ) {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect()
    const y = e.clientY - rect.top
    const minutes = (y / dayHeight) * 24 * 60
    const step = 30
    const startMin = Math.floor(minutes / step) * step
    const start = new Date(
      dayDate.getFullYear(),
      dayDate.getMonth(),
      dayDate.getDate(),
      Math.floor(startMin / 60),
      startMin % 60,
      0,
      0,
    )
    const end = new Date(start.getTime() + step * 60000)
    if (mode === 'blocked') {
      const allowed = workBlocks.some((w) => start >= w.start && end <= w.end)
      if (!allowed) return
      onCreate(start, end)
    } else {
      const weekday = dayDate.getDay()
      const withinOpen = (openingHours || [])
        .filter((o) => o.weekDay === weekday)
        .some((o) => {
          const os = buildDateFromTime(dayDate, o.startHour)
          const oe = buildDateFromTime(dayDate, o.endHour)
          return start >= os && end <= oe
        })
      const overlapsWork = workBlocks.some(
        (w) => start >= w.start && end <= w.end,
      )
      if (!withinOpen || overlapsWork || !onCreateWorkHour) return
      setCreateWH({ start, end, weekDay: weekday })
    }
  }

  function computeBlocks(dayDate: Date) {
    // Work blocks
    const weekday = dayDate.getDay()
    const work = (workHours || []).filter((w) => w.weekDay === weekday)
    const workBlocks: TimelineBlock[] = work.map((w) => {
      const ws = buildDateFromTime(dayDate, w.startHour)
      const we = buildDateFromTime(dayDate, w.endHour)
      const startMin = minutesOf(ws)
      const endMin = minutesOf(we)
      return {
        top: (startMin / 60) * slotHeight,
        height: Math.max(
          ((endMin - startMin) / 60) * slotHeight,
          minWorkHeight,
        ),
        label: `${formatHM(ws)} - ${formatHM(we)}`,
        start: ws,
        end: we,
        id: w.id ? String(w.id) : undefined,
      }
    })
    // Opening hours blocks (unit schedule)
    const open = (openingHours || []).filter((o) => o.weekDay === weekday)
    const openBlocks: TimelineBlock[] = open.map((o) => {
      const os = buildDateFromTime(dayDate, o.startHour)
      const oe = buildDateFromTime(dayDate, o.endHour)
      const startMin = minutesOf(os)
      const endMin = minutesOf(oe)
      return {
        top: (startMin / 60) * slotHeight,
        height: Math.max(
          ((endMin - startMin) / 60) * slotHeight,
          minWorkHeight,
        ),
        label: `${formatHM(os)} - ${formatHM(oe)}`,
        start: os,
        end: oe,
        id: o.id ? String(o.id) : undefined,
      }
    })
    // Blocked items for the day
    const list = (blocked || []).filter((b) => {
      const bs = new Date(b.startHour)
      return (
        bs.getFullYear() === dayDate.getFullYear() &&
        bs.getMonth() === dayDate.getMonth() &&
        bs.getDate() === dayDate.getDate()
      )
    })
    const dayBlocks: TimelineBlock[] = list.map((b) => {
      const bs = buildDateFromTime(dayDate, b.startHour)
      const be = buildDateFromTime(dayDate, b.endHour)
      const startMin = minutesOf(bs)
      const endMin = minutesOf(be)
      return {
        top: (startMin / 60) * slotHeight,
        height: Math.max(
          ((endMin - startMin) / 60) * slotHeight,
          minBlockHeight,
        ),
        label: `${formatHM(bs)} - ${formatHM(be)}`,
        start: bs,
        end: be,
        id: b.id,
      }
    })
    return { workBlocks, openBlocks, dayBlocks }
  }

  // lanes computation imported from utils

  return (
    <div className="w-full rounded-xl bg-white border">
      <WeekHeader
        anchor={anchor}
        mode={mode}
        onToday={() => setAnchor(startOfWeek(new Date()))}
        onPrevWeek={() => setAnchor(new Date(anchor.getTime() - 7 * 86400000))}
        onNextWeek={() => setAnchor(new Date(anchor.getTime() + 7 * 86400000))}
        onChangeMode={setMode}
      />

      <div className="w-full">
        <div className="px-3">
          {/* Scroller único para X e Y para manter sticky consistente em mobile */}
          <div className="overflow-x-auto overflow-y-auto overscroll-x-contain max-h-[70vh]">
            {/* Cabeçalho dos dias com sticky (linha inteira) */}
            <div className="sticky top-0 z-30 relative w-full">
              <div
                className="absolute inset-0 w-full h-full bg-white"
                aria-hidden
              />
              <div className="relative bg-white grid grid-cols-[4rem_repeat(7,12rem)] min-w-max gap-4 pt-3 pb-2">
                <div
                  className="left-0 w-[4rem] shrink-0 shadow-[inset_-1px_0_0_rgba(0,0,0,0.08)]"
                  style={{ willChange: 'left' }}
                />
                {days.map((d) => (
                  <div
                    key={d.toDateString()}
                    className="text-center font-medium text-gray-700 py-1"
                  >
                    {dayLabel(d)}
                  </div>
                ))}
              </div>
            </div>

            {/* Corpo com linhas e blocos */}
            <div className="grid grid-cols-[4rem_repeat(7,12rem)] min-w-max gap-4 pb-3">
              {/* Coluna de horários sticky à esquerda durante scroll horizontal */}
              <div
                className="sticky left-0 bg-white z-40 w-[4rem] shrink-0 shadow-[inset_-1px_0_0_rgba(0,0,0,0.08)]"
                style={{ height: dayHeight, willChange: 'left' }}
              >
                {Array.from({ length: 24 }, (_, h) => (
                  <div
                    key={h}
                    className="absolute left-0 w-full text-right pr-2 text-[11px] text-gray-500"
                    style={{ top: h * slotHeight - 6 }}
                  >
                    {String(h).padStart(2, '0')}:00
                  </div>
                ))}
              </div>

              {/* 7 colunas de dias */}
              {days.map((dayDate) => {
                const { workBlocks, openBlocks, dayBlocks } =
                  computeBlocks(dayDate)
                const lanes = computeLanes(dayBlocks)

                const previewForDay =
                  mode === 'blocked' &&
                  createPreview &&
                  createPreview.start.getFullYear() === dayDate.getFullYear() &&
                  createPreview.start.getMonth() === dayDate.getMonth() &&
                  createPreview.start.getDate() === dayDate.getDate()
                    ? createPreview
                    : null

                const workPreviewForDay =
                  mode === 'work' &&
                  workPreview &&
                  workPreview.start.getFullYear() === dayDate.getFullYear() &&
                  workPreview.start.getMonth() === dayDate.getMonth() &&
                  workPreview.start.getDate() === dayDate.getDate()
                    ? { start: workPreview.start, end: workPreview.end }
                    : null

                // preview lane handled inside renderPreviewBlock

                const isToday = (() => {
                  const now = new Date()
                  return (
                    now.getFullYear() === dayDate.getFullYear() &&
                    now.getMonth() === dayDate.getMonth() &&
                    now.getDate() === dayDate.getDate()
                  )
                })()

                return (
                  <div
                    key={dayDate.toDateString()}
                    className="relative cursor-crosshair border-l"
                    style={{ height: dayHeight }}
                    onClick={(e) => handleDayClick(dayDate, workBlocks, e)}
                    onMouseDown={undefined}
                    onMouseMove={undefined}
                    onMouseUp={undefined}
                    onTouchStart={undefined}
                    onTouchMove={undefined}
                    onTouchEnd={undefined}
                  >
                    {hourLines()}

                    {renderOffAreas(
                      buildOffSegments(
                        mode === 'work' ? openBlocks : workBlocks,
                        dayDate,
                      ),
                    )}
                    {/* Opening hours highlight in Jornada mode */}
                    {mode === 'work' && renderOpeningHighlights(openBlocks)}

                    {mode === 'blocked' && renderBlockedItems(dayBlocks, lanes)}

                    {mode === 'work' && renderWorkItems(workBlocks)}

                    {renderPreviewBlock(previewForDay, dayBlocks)}

                    {renderWorkPreview(workPreviewForDay)}

                    {isToday && (
                      <div
                        className="absolute left-0 right-0 border-t-2 border-green-500"
                        style={{
                          top:
                            ((new Date().getHours() * 60 +
                              new Date().getMinutes()) /
                              60) *
                            slotHeight,
                        }}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      {createWH && onCreateWorkHour && (
        <CreateWorkHourDialog
          ctx={createWH}
          onClose={() => setCreateWH(null)}
          onCreate={onCreateWorkHour}
          onDraftChange={(s, e) =>
            setCreateWH((prev) => (prev ? { ...prev, start: s, end: e } : prev))
          }
        />
      )}
      {viewWH && (
        <WorkHourDetailsDialog
          ctx={viewWH}
          onClose={() => setViewWH(null)}
          onDelete={onDeleteWorkHour}
        />
      )}
    </div>
  )
}
