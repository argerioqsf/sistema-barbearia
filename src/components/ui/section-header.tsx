import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

type SectionHeaderProps = {
  label?: string
  title: string
  description?: string
  right?: ReactNode
  className?: string
  cta?: ReactNode
}

export function SectionHeader({
  label,
  title,
  description,
  right,
  className,
  cta,
}: SectionHeaderProps) {
  return (
    <header className={cn('flex min-w-0 flex-col gap-4', className)}>
      <div className="flex items-center justify-between gap-4">
        <div
          className={cn(
            'min-w-0 w-full flex flex-col items-start justify-between',
            'md:flex-row',
          )}
        >
          <div className="w-full">
            {label && (
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                {label}
              </p>
            )}
            <h2 className="mt-1 text-2xl font-semibold truncate text-slate-900">
              {title}
            </h2>
            {description && (
              <p className="mt-1 text-sm text-slate-500 truncate">
                {description}
              </p>
            )}
          </div>
          <div
            className={cn(
              'w-full flex justify-center pt-6',
              'md:p-0 md:justify-end',
            )}
          >
            {cta && <div className="shrink-0">{cta}</div>}
          </div>
        </div>
        {right && <div className="shrink-0">{right}</div>}
      </div>
    </header>
  )
}
