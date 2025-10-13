'use client'

import { Button } from '@/components/atoms'
import { handleIcons } from '@/utils/handleIcons'
import { RoleName } from '@/features/roles/schemas'
import type { ZUnit } from '@/features/units/schemas'
import { useRouter } from 'next/navigation'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import { UnitSwitcher } from './UnitSwitcher'
import { useGeneral } from '@/contexts/general-context'
import { cn } from '@/lib/utils'

type NavBarProps = {
  openMenu: boolean
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
  const MenuIcon = handleIcons('Menu')
  const CloseIcon = handleIcons('X')
  const { setOpenMenu } = useGeneral()

  const sidebarExpandedClass = 'lg:pl-10'
  const sidebarCollapsedClass = 'lg:pl-10'

  return (
    <nav
      className={twMerge(
        'fixed z-20 bg-white/85 shadow-sm backdrop-blur-md transition-colors',
        openMenu
          ? 'lg:w-[calc(100vw-var(--width-side-menu))] w-screen'
          : 'lg:w-[calc(100vw-var(--width-side-menu-collapsed))] w-screen',
      )}
    >
      <div
        className={twMerge(
          'flex w-full h-[var(--navbar-height)] items-center justify-between gap-4 px-4 py-3',
          'sm:px-6 sm:py-4',
          openMenu ? sidebarExpandedClass : sidebarCollapsedClass,
        )}
      >
        <div className="flex flex-1 items-center gap-3 md:max-w-xl">
          <Button
            type="button"
            variant="ghost"
            className={cn(
              'h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-500 shadow-sm transition hover:bg-slate-100',
              openMenu ? 'hidden' : 'flex lg:hidden',
            )}
            onClick={() => setOpenMenu((prev) => !prev)}
            aria-label={openMenu ? 'Fechar menu' : 'Abrir menu'}
          >
            {openMenu
              ? CloseIcon && <CloseIcon size={22} />
              : MenuIcon && <MenuIcon size={22} />}
          </Button>
          <div className="min-w-0 flex-1">
            <UnitSwitcher
              role={role}
              units={units}
              currentUnitId={currentUnitId}
            />
          </div>
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
