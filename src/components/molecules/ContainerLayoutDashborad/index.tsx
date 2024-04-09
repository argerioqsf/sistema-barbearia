'use client'

import { NavBar } from '@/components/organisms'
import { useGeneral } from '@/contexts/general-context'
import { twMerge } from 'tailwind-merge'

export default function ContainerLayoutDashboard({
  children,
}: {
  children: React.ReactNode
}) {
  const { openMenu, setOpenMenu } = useGeneral()
  return (
    <div
      className={twMerge(
        'w-full pl-0',
        openMenu === true && 'animate-openMenuChildren',
        openMenu === false && 'animate-closeMenuChildren',
      )}
    >
      <NavBar setOpenMenu={setOpenMenu} openMenu={openMenu} />

      {children}
    </div>
  )
}
