'use client'

import { cn } from '@/lib/utils'
import type { RoleName } from '@/features/roles/schemas'

type UserRoleBadgeProps = {
  role?: RoleName
}

const roleLabels: Record<RoleName, string> = {
  ADMIN: 'Admin',
  OWNER: 'Owner',
  MANAGER: 'Manager',
  BARBER: 'Barber',
  ATTENDANT: 'Atendente',
  CLIENT: 'Cliente',
}

export function UserRoleBadge({ role }: UserRoleBadgeProps) {
  console.log('role', role)
  if (!role) {
    return <span className="text-sm text-slate-500">—</span>
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary',
      )}
    >
      {roleLabels[role] ?? role}
    </span>
  )
}
