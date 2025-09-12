'use client'

import { siteConfig } from '@/config/siteConfig'
import ItemSideMenu from '@/components/molecules/ItemSideMenu'
import { useGeneral } from '@/contexts/general-context'
import React, { useEffect } from 'react'
import { twMerge } from 'tailwind-merge'
import { Avatar } from '@/components/molecules'
import { handleIcons } from '@/utils/handleIcons'
import logoBarbearia from '../../../../public/logo_barbearia.png'

function SideMenu() {
  const { openMenu, setOpenMenu } = useGeneral()

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpenMenu(false)
    }
    if (openMenu) {
      window.addEventListener('keydown', onKeyDown)
    }
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [openMenu, setOpenMenu])

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Fullscreen overlay for mobile to capture scroll/taps */}
      <div
        onClick={() => setOpenMenu(false)}
        className={twMerge(
          'absolute inset-0 bg-black/40 transition-opacity md:hidden z-40',
          openMenu
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none',
        )}
        // Prevent horizontal gestures from scrolling the page beneath
        style={{ touchAction: 'none' }}
      />
      {/* Drawer */}
      <aside
        className={twMerge(
          'absolute left-0 top-0 bottom-0 bg-primary-100/95 backdrop-blur-sm shadow-xl z-50',
          'h-full pointer-events-auto w-[var(--width-side-menu)]',
          'flex flex-row items-start justify-start',
          // Permite rolagem vertical no aside em telas pequenas; evita horizontal
          'whitespace-nowrap overflow-y-auto overflow-x-hidden overscroll-contain',
          'transform transition-transform duration-300 ease-out',
          openMenu ? 'translate-x-0' : '-translate-x-full',
        )}
        aria-hidden={!openMenu}
        role="dialog"
        aria-modal="true"
        id="sidebar-drawer"
        style={{
          touchAction: 'pan-y',
          willChange: 'transform',
        }}
      >
        <div className="relative w-full gap-4 pt-4 h-full flex flex-col justify-start items-center">
          <Avatar
            router={'/dashboard/profile'}
            size={140}
            image={logoBarbearia}
            classAvatar="mb-2"
          />
          <div className="w-full">
            {siteConfig.map((config) => (
              <ItemSideMenu
                setOpenMenu={setOpenMenu}
                image={config.image}
                sizeAvatar={config.size}
                icon={config.icon}
                subMenuList={config.subMenuList}
                key={config.id}
                label={config.label}
                href={config.href}
                userAction={config.userAction}
                hidden={config.hidden}
              />
            ))}
          </div>
        </div>
      </aside>

      {/* Toggle button fixo ao lado do menu */}
      <button
        type="button"
        aria-label={openMenu ? 'Fechar menu' : 'Abrir menu'}
        onClick={() => setOpenMenu(!openMenu)}
        className={twMerge(
          'pointer-events-auto fixed top-10 -translate-y-1/2 z-[70]',
          'h-11 w-11 md:h-12 md:w-12 rounded-r-xl shadow flex items-center justify-center',
          // Usa cores do tema (primária) para manter padrão e acompanhar o menu
          'bg-primary-100 hover:bg-primary-100/90',
          // Transição unificada (transform + cores) padronizada pelo Tailwind
          'transition ease-out duration-300',
        )}
        style={{
          left: '0px',
          willChange: 'transform',
          // Gruda no bordo do drawer (remove espaço)
          transform: openMenu
            ? 'translate(calc(var(--width-side-menu) - 1px), -50%)'
            : 'translate(0, -50%)',
        }}
      >
        {(() => {
          const Icon = handleIcons(openMenu ? 'X' : 'ChevronRight')
          return <Icon size={22} className="stroke-white" />
        })()}
      </button>
    </div>
  )
}

export default SideMenu
