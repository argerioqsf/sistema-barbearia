'use client'

import { Button } from '@/components/atoms'
import { handleIcons } from '@/utils/handleIcons'
import { RoleName } from '@/features/roles/schemas'
import type { ZUnit } from '@/features/units/schemas'
import { useRouter } from 'next/navigation'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import { UnitSwitcher } from './UnitSwitcher'

type NavBarProps = {
  openMenu: boolean | null
  role?: RoleName
  units?: ZUnit[]
  currentUnitId?: string
}

const NavBar: React.FC<NavBarProps> = ({
  openMenu,
  role,
  units,
  currentUnitId,
}) => {
  const router = useRouter()
  const UserIcon = handleIcons('User')

  return (
    <nav
      className={twMerge(
        'fixed z-40 w-screen bg-white/85 shadow-sm backdrop-blur-md transition-colors',
      )}
    >
      <div
        className={twMerge(
          'flex h-[var(--navbar-height)] w-full items-center justify-between gap-4 px-4 py-3',
          'sm:px-6 sm:py-4 ',
        )}
      >
        <div className="flex-1 min-w-0 md:max-w-xl pl-12">
          <UnitSwitcher
            role={role}
            units={units}
            currentUnitId={currentUnitId}
          />
        </div>

        <div
          className={twMerge(
            'flex shrink-0 items-center justify-end gap-2',
            openMenu && 'md:justify-end',
          )}
        >
          <Button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary-50 shadow transition-colors hover:bg-secondary-100/80 md:h-12 md:w-12"
            onClick={() => router.push('/dashboard/profile')}
            aria-label="Perfil"
          >
            <UserIcon size={24} className="stroke-white" />
          </Button>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
