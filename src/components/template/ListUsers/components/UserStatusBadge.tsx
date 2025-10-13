'use client'

import { cn } from '@/lib/utils'

type UserStatusBadgeProps = {
  active: boolean
}

export function UserStatusBadge({ active }: UserStatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em]',
        active
          ? 'bg-emerald-100 text-emerald-700'
          : 'bg-slate-200 text-slate-600',
      )}
    >
      <span className="h-2 w-2 rounded-full bg-current" />
      {active ? 'Ativo' : 'Inativo'}
    </span>
  )
}
