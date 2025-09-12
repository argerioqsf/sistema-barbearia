import { Button } from '@/components/atoms'
import { handleIcons } from '@/utils/handleIcons'
import React, { Dispatch, SetStateAction } from 'react'
import { twMerge } from 'tailwind-merge'

type NavBarProps = {
  setOpenMenu: Dispatch<SetStateAction<boolean | null>>
  openMenu: boolean | null
}

const NavBar: React.FC<NavBarProps> = ({ openMenu }) => {
  const UserIcon = handleIcons('User')

  return (
    <nav
      className={twMerge(
        'w-screen z-40 h-auto items-center fixed whitespace-nowrap bg-gray-300',
      )}
    >
      <div
        className={twMerge(
          'h-[var(--navbar-height)]',
          'flex w-full flex-row relative flex-nowrap items-center justify-between',
          !openMenu ? 'px-6' : 'md:px-6',
        )}
      >
        {/* Botão de abrir menu removido. O toggle fica ao lado do menu lateral. */}
        <div
          className={twMerge(
            'ml-auto flex flex-row gap-2',
            openMenu && 'hidden md:flex',
          )}
        >
          <Button
            type="button"
            className="h-11 w-11 md:h-12 md:w-12 rounded-full bg-secondary-50 hover:bg-secondary-100/80 transition-colors flex items-center justify-center shadow"
            onClick={() => {
              // simple client-side redirect to profile
              window.location.href = '/dashboard/profile'
            }}
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
