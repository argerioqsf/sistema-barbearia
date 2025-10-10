import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

type PageCardProps = {
  children: ReactNode
  className?: string
}

export function PageCard({ children, className }: PageCardProps) {
  return (
    <section
      className={cn(
        'w-full rounded-3xl border border-slate-200/80 bg-white/90 shadow-xl shadow-slate-900/10 backdrop-blur overflow-hidden',
        className,
      )}
    >
      {children}
    </section>
  )
}

export function PageCardContent({ children, className }: PageCardProps) {
  return (
    <div className={cn('min-w-0 px-6 py-6 sm:px-8 sm:py-8', className)}>
      {children}
    </div>
  )
}
