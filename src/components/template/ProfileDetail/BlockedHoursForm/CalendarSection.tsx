'use client'

import InlineCalendar from '@/components/molecules/InlineCalendar'
import { Text } from '@/components/atoms'
import React from 'react'

type Props = {
  selected: Date | null
  onSelect: (d: Date | null) => void
  highlighted: Date[]
}

export default function CalendarSection({
  selected,
  onSelect,
  highlighted,
}: Props) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <Text className="mb-0">Selecione o dia</Text>
      </div>
      <InlineCalendar
        selected={selected ?? undefined}
        onSelect={(d) => onSelect(d)}
        highlighted={highlighted}
      />
    </div>
  )
}
