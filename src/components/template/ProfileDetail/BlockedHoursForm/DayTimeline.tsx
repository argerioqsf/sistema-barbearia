'use client'

import { Text } from '@/components/atoms'
import React from 'react'
import { TimelineBlock } from './hooks'

type Props = {
  selectedDate: Date
  slotHeight: number
  dayHeight: number
  workBlocks: TimelineBlock[]
  dayBlocks: TimelineBlock[]
  isToday: boolean
  onCreateSlot: (start: Date, end: Date) => void
  onEditBlock: (id: string, start: Date, end: Date) => void
  filtered: Array<{ id?: string; startHour: string; endHour: string }>
  createPreview?: { start: Date; end: Date } | null
  onInvalidSelection?: () => void
  mode?: 'blocked' | 'work'
}

export default function DayTimeline({
  selectedDate,
  slotHeight,
  dayHeight,
  workBlocks,
  dayBlocks,
  isToday,
  onCreateSlot,
  onEditBlock,
  filtered,
  createPreview,
  onInvalidSelection,
  mode = 'blocked',
}: Props) {
  const minWorkHeight = 16
  const minBlockHeight = 20
  const gutterPx = 4
  const insetPx = 12
  const shrinkPx = 8

  function minutesOf(d: Date) {
    return d.getHours() * 60 + d.getMinutes()
  }

  type LaneItem = { key: number; startMin: number; endMin: number }
  const computeLanes = React.useCallback((items: LaneItem[]) => {
    const sorted = [...items].sort((a, b) =>
      a.startMin === b.startMin ? b.endMin - a.endMin : a.startMin - b.startMin,
    )
    let laneEnds: number[] = []
    let group: number[] = []
    let groupMax = 0
    const assigned = new Map<number, { lane: number; lanes: number }>()
    function flush() {
      if (!group.length) return
      for (const k of group) {
        const a = assigned.get(k)!
        assigned.set(k, { lane: a.lane, lanes: Math.max(groupMax, 1) })
      }
      laneEnds = []
      group = []
      groupMax = 0
    }
    for (const it of sorted) {
      if (laneEnds.length > 0 && laneEnds.every((e) => e <= it.startMin))
        flush()
      let lane = laneEnds.findIndex((e) => e <= it.startMin)
      if (lane === -1) {
        lane = laneEnds.length
        laneEnds.push(it.endMin)
      } else {
        laneEnds[lane] = it.endMin
      }
      assigned.set(it.key, { lane, lanes: 0 })
      group.push(it.key)
      groupMax = Math.max(groupMax, laneEnds.length)
    }
    flush()
    return assigned
  }, [])

  const laneLayout = React.useMemo(() => {
    const items: LaneItem[] = dayBlocks.map((blk, idx) => ({
      key: idx,
      startMin: minutesOf(blk.start),
      endMin: minutesOf(blk.end),
    }))
    const map = computeLanes(items)
    const out: Record<number, { lane: number; lanes: number }> = {}
    map.forEach((v, k) => {
      out[k] = v
    })
    return out
  }, [dayBlocks, computeLanes])

  const previewLayout = React.useMemo(() => {
    if (!createPreview) return { lane: 0, lanes: 1 }
    const items: LaneItem[] = dayBlocks.map((blk, idx) => ({
      key: idx,
      startMin: minutesOf(blk.start),
      endMin: minutesOf(blk.end),
    }))
    const previewKey = -1
    items.push({
      key: previewKey,
      startMin: minutesOf(createPreview.start),
      endMin: minutesOf(createPreview.end),
    })
    const map = computeLanes(items)
    const pv = map.get(previewKey)
    return pv ?? { lane: 0, lanes: 1 }
  }, [dayBlocks, createPreview, computeLanes])

  function fontSizeClass(h: number) {
    if (h >= 36) return 'text-xs'
    if (h >= 28) return 'text-[11px]'
    if (h >= 22) return 'text-[10px]'
    return 'text-[9px]'
  }
  return (
    <div className="mt-2 w-full rounded-xl p-3 bg-white border">
      <Text className="font-semibold text-gray-800 mb-3">
        {selectedDate.toLocaleDateString(undefined, {
          weekday: 'long',
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })}
      </Text>
      <div className="flex items-center gap-4 mb-2 text-xs text-gray-600">
        <div className="flex items-center gap-1">
          <span
            className="inline-block h-3 w-3 rounded-sm"
            style={{
              background:
                'repeating-linear-gradient(45deg, rgba(16,185,129,0.10) 0, rgba(16,185,129,0.10) 8px, transparent 8px, transparent 16px)',
              border: '1px solid rgba(16,185,129,0.35)',
            }}
          />
          Jornada de trabalho
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block h-3 w-3 rounded-sm bg-red-500" />
          Bloqueado
        </div>
      </div>
      <div className="grid grid-cols-[4rem_1fr] gap-4">
        <div className="relative" style={{ height: dayHeight }}>
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
        <div
          className="relative cursor-crosshair"
          style={{ height: dayHeight }}
          onClick={(e) => {
            const el = e.currentTarget
            const rect = el.getBoundingClientRect()
            const y = e.clientY - rect.top
            const minutes = (y / dayHeight) * 24 * 60
            const step = 30
            const startMin = Math.floor(minutes / step) * step
            const start = new Date(
              selectedDate.getFullYear(),
              selectedDate.getMonth(),
              selectedDate.getDate(),
              Math.floor(startMin / 60),
              startMin % 60,
              0,
              0,
            )
            const end = new Date(start.getTime() + step * 60000)
            // Permitir criação apenas dentro de um intervalo de trabalho
            const allowed = workBlocks.some(
              (w) => start >= w.start && end <= w.end,
            )
            if (!allowed) {
              onInvalidSelection?.()
              return
            }
            onCreateSlot(start, end)
          }}
        >
          {Array.from({ length: 25 }, (_, h) => (
            <div
              key={h}
              className="absolute left-0 right-0 border-t border-gray-200 z-0"
              style={{ top: h * slotHeight }}
            />
          ))}
          {mode !== 'blocked' &&
            workBlocks.map((blk, idx) => (
              <div
                key={`w-${idx}`}
                className="absolute left-1 right-1 rounded-md text-[10px] px-2 py-0.5 border shadow-inner pointer-events-none z-0"
                style={{
                  top: blk.top,
                  height: Math.max(blk.height, minWorkHeight),
                  borderColor: 'rgba(16,185,129,0.35)',
                  background:
                    'repeating-linear-gradient(45deg, rgba(16,185,129,0.10) 0, rgba(16,185,129,0.10) 8px, transparent 8px, transparent 16px)',
                }}
              >
                <span className="text-emerald-700/80">{blk.label}</span>
              </div>
            ))}
          {dayBlocks.map((blk, idx) => {
            const b = filtered[idx]
            const id = b?.id ? String(b.id) : undefined
            const pos = laneLayout[idx] || { lane: 0, lanes: 1 }
            const lanes = Math.max(pos.lanes || 1, 1)
            const lane = pos.lane || 0
            const widthOuter = `calc(100% - ${insetPx * 2}px)`
            const baseLaneWidth = `calc((${widthOuter} - ${(lanes - 1) * gutterPx}px) / ${lanes})`
            const widthCalc = `calc(${baseLaneWidth} - ${(lanes - 1 - lane) * shrinkPx}px)`
            const leftCalc = `calc(${insetPx}px + ${lane} * (${baseLaneWidth} + ${gutterPx}px))`
            const h = Math.max(blk.height, minBlockHeight)
            const textClass = fontSizeClass(h)
            return (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  id && onEditBlock(id, blk.start, blk.end)
                }}
                className={`absolute rounded-md bg-red-500 text-white px-2 py-1 shadow-md border border-red-600 z-10 text-left ${textClass}`}
                style={{
                  top: blk.top,
                  height: h,
                  left: leftCalc,
                  width: widthCalc,
                }}
              >
                {blk.label}
              </button>
            )
          })}
          {createPreview &&
            (() => {
              const startMin = minutesOf(createPreview.start)
              const endMin = minutesOf(createPreview.end)
              const top = (startMin / 60) * slotHeight
              const height = Math.max(
                ((endMin - startMin) / 60) * slotHeight,
                minBlockHeight,
              )
              const label = `${createPreview.start.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })} - ${createPreview.end.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}`
              const textClass = fontSizeClass(height)
              const lanes = Math.max(previewLayout.lanes || 1, 1)
              const lane = previewLayout.lane || 0
              const widthOuter = `calc(100% - ${insetPx * 2}px)`
              const baseLaneWidth = `calc((${widthOuter} - ${(lanes - 1) * gutterPx}px) / ${lanes})`
              const widthCalc = `calc(${baseLaneWidth} - ${(lanes - 1 - lane) * shrinkPx}px)`
              const leftCalc = `calc(${insetPx}px + ${lane} * (${baseLaneWidth} + ${gutterPx}px))`
              return (
                <div
                  className={`absolute rounded-md bg-amber-400/70 text-black px-2 py-1 border border-amber-500 z-20 ${textClass}`}
                  style={{ top, height, left: leftCalc, width: widthCalc }}
                >
                  {label}
                </div>
              )
            })()}
          {isToday && (
            <div
              className="absolute left-0 right-0 border-t-2 border-green-500"
              style={{
                top:
                  ((new Date().getHours() * 60 + new Date().getMinutes()) /
                    60) *
                  slotHeight,
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
