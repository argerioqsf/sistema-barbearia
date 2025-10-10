'use client'

import { NavBar } from '@/components/organisms'
import { useGeneral } from '@/contexts/general-context'
import { RoleName } from '@/features/roles/schemas'
import type { ZUnit } from '@/features/units/schemas'
import { twMerge } from 'tailwind-merge'

type ContainerLayoutDashboardProps = {
  children: React.ReactNode
  navBarProps?: {
    role?: RoleName
    units?: ZUnit[]
    currentUnitId?: string
  }
}

export default function ContainerLayoutDashboard({
  children,
  navBarProps,
}: ContainerLayoutDashboardProps) {
  const { openMenu } = useGeneral()
  return (
    <div className={twMerge('w-full pl-0')}>
      <NavBar
        openMenu={openMenu}
        role={navBarProps?.role}
        units={navBarProps?.units}
        currentUnitId={navBarProps?.currentUnitId}
      />
      <main className="pt-[calc(var(--navbar-height))]">{children}</main>
    </div>
  )
}
