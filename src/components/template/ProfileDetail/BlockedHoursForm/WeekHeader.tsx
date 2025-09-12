'use client'

import React from 'react'
import { Button, Text } from '@/components/atoms'
import type { Mode } from './utils'

type Props = {
  anchor: Date
  mode: Mode
  onToday: () => void
  onPrevWeek: () => void
  onNextWeek: () => void
  onChangeMode: (m: Mode) => void
}

export default function WeekHeader({
  anchor,
  mode,
  onToday,
  onPrevWeek,
  onNextWeek,
  onChangeMode,
}: Props) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between px-3 py-2 border-b rounded-t-xl bg-primary text-primary-foreground border-primary/20">
      <div className="flex flex-wrap items-center gap-2 gap-y-1 min-w-0">
        <Button
          className="px-3 py-1 bg-white/10 text-primary-foreground hover:bg-white/20"
          onClick={onToday}
        >
          Hoje
        </Button>
        <Button
          className="px-3 py-1 bg-white/10 text-primary-foreground hover:bg-white/20"
          onClick={onPrevWeek}
        >
          ‹
        </Button>
        <Button
          className="px-3 py-1 bg-white/10 text-primary-foreground hover:bg-white/20"
          onClick={onNextWeek}
        >
          ›
        </Button>
        <Text className="mb-0 ml-2 font-semibold truncate max-w-full sm:max-w-[40vw]">
          {anchor.toLocaleDateString(undefined, {
            month: 'long',
            year: 'numeric',
          })}
        </Text>
      </div>
      <div className="flex items-center gap-1 bg-white/15 rounded-md p-1 w-full sm:w-auto justify-center sm:justify-end shrink-0">
        <button
          type="button"
          className={`px-2 py-1 rounded text-sm ${mode === 'blocked' ? 'bg-white/25' : 'hover:bg-white/10'}`}
          onClick={() => onChangeMode('blocked')}
        >
          Bloqueios
        </button>
        <button
          type="button"
          className={`px-2 py-1 rounded text-sm ${mode === 'work' ? 'bg-white/25' : 'hover:bg-white/10'}`}
          onClick={() => onChangeMode('work')}
        >
          Jornada
        </button>
      </div>
    </div>
  )
}
