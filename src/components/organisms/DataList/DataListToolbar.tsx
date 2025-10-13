import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

type DataListToolbarProps = {
  children: ReactNode
  className?: string
}

export function DataListToolbar({ children, className }: DataListToolbarProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white/60 px-4 py-4 sm:flex-row sm:items-center sm:gap-4',
        className,
      )}
    >
      {children}
    </div>
  )
}
