import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type DataListEmptyStateProps = {
  title?: string
  description?: ReactNode
  className?: string
}

export function DataListEmptyState({
  title = 'Nenhum registro encontrado.',
  description = 'Use a busca ou registre um novo item.',
  className,
}: DataListEmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 px-6 py-10 text-center text-sm text-slate-500',
        className,
      )}
    >
      <span>{title}</span>
      {description ? (
        <span className="max-w-md text-xs sm:text-sm">{description}</span>
      ) : null}
    </div>
  )
}
