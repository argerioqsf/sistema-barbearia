'use client'

import React, { useMemo } from 'react'

type Range = { start: Date | null; end: Date | null }
type Props = {
  mode?: 'single' | 'range'
  selected?: Date | Range | null
  onSelect?: (d: Date | null) => void
  onRangeChange?: (r: Range) => void
  highlighted?: Date[]
  className?: string
}

function startOfDay(d: Date) {
  const nd = new Date(d)
  nd.setHours(0, 0, 0, 0)
  return nd
}

export default function InlineCalendar({
  mode = 'single',
  selected,
  onSelect,
  onRangeChange,
  highlighted = [],
  className,
}: Props) {
  const [year, month] = useMemo(() => {
    const base =
      selected && (selected as Range).start !== undefined
        ? (selected as Range).start || new Date()
        : (selected as Date) ?? new Date()
    return [base.getFullYear(), base.getMonth()] as const
  }, [selected])

  const [viewYear, setViewYear] = React.useState(year)
  const [viewMonth, setViewMonth] = React.useState(month)

  React.useEffect(() => {
    setViewYear(year)
    setViewMonth(month)
  }, [year, month])

  const firstDayOfMonth = new Date(viewYear, viewMonth, 1)
  const lastDayOfMonth = new Date(viewYear, viewMonth + 1, 0)
  const daysInMonth = lastDayOfMonth.getDate()
  const startWeekday = firstDayOfMonth.getDay() // 0 (Sun) .. 6 (Sat)

  const weeks: (Date | null)[][] = []
  let currentWeek: (Date | null)[] = []
  // Leading empty days
  for (let i = 0; i < startWeekday; i++) currentWeek.push(null)
  for (let day = 1; day <= daysInMonth; day++) {
    currentWeek.push(new Date(viewYear, viewMonth, day))
    if (currentWeek.length === 7) {
      weeks.push(currentWeek)
      currentWeek = []
    }
  }
  if (currentWeek.length) {
    while (currentWeek.length < 7) currentWeek.push(null)
    weeks.push(currentWeek)
  }

  function prevMonth() {
    const d = new Date(viewYear, viewMonth - 1, 1)
    setViewYear(d.getFullYear())
    setViewMonth(d.getMonth())
  }
  function nextMonth() {
    const d = new Date(viewYear, viewMonth + 1, 1)
    setViewYear(d.getFullYear())
    setViewMonth(d.getMonth())
  }

  const sel =
    selected && (selected as Range).start === undefined
      ? startOfDay(selected as Date)
      : undefined
  const range: Range | null =
    selected && (selected as Range).start !== undefined
      ? (selected as Range)
      : null
  function isInRange(d: Date) {
    if (!range || !range.start || !range.end) return false
    const t = startOfDay(d).getTime()
    const a = startOfDay(range.start).getTime()
    const b = startOfDay(range.end).getTime()
    return t >= a && t <= b
  }
  function isHighlighted(d: Date) {
    const t = startOfDay(d).getTime()
    return highlighted.some((hd) => startOfDay(hd).getTime() === t)
  }

  const MONTHS = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ]
  const WEEK = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

  return (
    <div
      className={`w-full rounded-xl border border-white/10 bg-primary-100 p-3 ${
        className ?? ''
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <button
          type="button"
          onClick={prevMonth}
          className="px-2 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white text-sm"
        >
          ◀
        </button>
        <span className="text-white font-semibold">
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button
          type="button"
          onClick={nextMonth}
          className="px-2 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white text-sm"
        >
          ▶
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-white/80 text-xs mb-1">
        {WEEK.map((w) => (
          <div key={w}>{w}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {weeks.map((week, wi) =>
          week.map((d, di) => {
            if (!d)
              return (
                <div
                  key={`${wi}-${di}`}
                  className="h-8 rounded-md bg-transparent"
                />
              )
            const isSelected = sel && startOfDay(d).getTime() === sel.getTime()
            const inRange = isInRange(d)
            const isMark = isHighlighted(d)
            return (
              <button
                key={`${wi}-${di}`}
                type="button"
                className={
                  'h-8 rounded-md text-sm transition-colors relative ' +
                  (isSelected || inRange
                    ? 'bg-secondary-50 text-white'
                    : 'bg-white/10 hover:bg-white/20 text-white')
                }
                onClick={() => {
                  if (mode === 'range' && onRangeChange) {
                    const cur = range ?? { start: null, end: null }
                    if (!cur.start || (cur.start && cur.end)) {
                      onRangeChange({ start: d, end: null })
                    } else if (cur.start && !cur.end) {
                      const start = cur.start
                      const end = d
                      if (startOfDay(end) < startOfDay(start)) {
                        onRangeChange({ start: end, end: start })
                      } else {
                        onRangeChange({ start, end })
                      }
                    }
                  } else {
                    if (sel && startOfDay(d).getTime() === sel.getTime()) {
                      onSelect?.(null)
                    } else {
                      onSelect?.(d)
                    }
                  }
                }}
              >
                {d.getDate()}
                {isMark && (
                  <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-red-400" />
                )}
              </button>
            )
          }),
        )}
      </div>
    </div>
  )
}
