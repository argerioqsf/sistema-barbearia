import type { Role } from '@/types/general'

export type RoleObject = { id?: string; name?: string; unitId?: string }
// TODO: revisar os nomes das roles para ver se eta igual ao backend
const roleMap: Record<string, Role> = {
  ADMIN: 'administrator',
  ADMINISTRATOR: 'administrator',
  BARBER: 'barber',
  MANAGER: 'manager',
  RECEPTIONIST: 'receptionist',
  INDICATOR: 'indicator',
  CONSULTANT: 'consultant',
  AUXILIARY: 'auxiliary',
  COORDINATOR: 'coordinator',
  FINANCIAL: 'financial',
  SECRETARY: 'secretary',
}

export function normalizeRole(
  val: string | RoleObject | null | undefined,
): Role | undefined {
  if (typeof val === 'string') {
    const key = val.toUpperCase()
    return roleMap[key]
  }
  const obj: RoleObject | undefined = val ?? undefined
  const name = obj?.name
  if (typeof name === 'string') {
    const key = name.toUpperCase()
    return roleMap[key]
  }
  return undefined
}
