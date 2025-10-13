'use client'

import { useEffect, useMemo } from 'react'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'
import { siteConfig } from '@/config/siteConfig'
import ItemSideMenu from '@/components/molecules/ItemSideMenu'
import { useGeneral } from '@/contexts/general-context'
import { handleIcons } from '@/utils/handleIcons'
import logoBarbearia from '../../../../public/logo_barbearia.png'

export default function SideMenu() {
  const { openMenu, setOpenMenu } = useGeneral()
  const ToggleIcon = useMemo(
    () => handleIcons(openMenu ? 'ChevronLeft' : 'ChevronRight'),
    [openMenu],
  )

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!openMenu) return
    if (window.innerWidth >= 768) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpenMenu(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [openMenu, setOpenMenu])

  return (
    <>
      <div
        onClick={() => setOpenMenu(false)}
        className={twMerge(
          'fixed inset-0 z-40 bg-slate-900/60 transition-opacity md:hidden',
          openMenu
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none',
        )}
        style={{ touchAction: 'none' }}
      />

      <aside
        className={twMerge(
          'fixed inset-y-0 left-0 z-50 flex h-full flex-col border-r border-slate-200/70 bg-white/95 backdrop-blur-xl shadow-xl transition-all duration-300 ease-out',
          openMenu ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
          openMenu
            ? 'w-[var(--width-side-menu)]'
            : 'w-0 hidden lg:flex lg:w-[var(--width-side-menu-collapsed)]',
        )}
        style={{
          maxWidth: '320px',
          willChange: 'width, transform',
        }}
      >
        <header className="flex h-[calc(var(--navbar-height)+1px)] items-center gap-3 border-b border-slate-200/70 px-4 py-4">
          {openMenu && (
            <>
              <div className="h-10 w-10 overflow-hidden rounded-2xl border border-slate-200 bg-black shadow-inner shadow-slate-900/5">
                <Image
                  src={logoBarbearia}
                  alt="Barbearia"
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-400">
                  Sistema
                </span>
                <span className="truncate text-lg font-semibold text-slate-900">
                  Barbearia
                </span>
              </div>
            </>
          )}
          <button
            type="button"
            aria-label={
              openMenu ? 'Recolher menu lateral' : 'Expandir menu lateral'
            }
            onClick={() => setOpenMenu(!openMenu)}
            className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-100"
          >
            {ToggleIcon && <ToggleIcon size={20} />}
          </button>
        </header>

        <nav className="flex-1 space-y-1 h-full overflow-y-auto px-2 py-4">
          {siteConfig.map((config) => (
            <ItemSideMenu
              key={config.id}
              setOpenMenu={setOpenMenu}
              image={config.image}
              icon={config.icon}
              sizeAvatar={config.size}
              subMenuList={config.subMenuList}
              label={config.label}
              href={config.href}
              userAction={config.userAction}
              hidden={config.hidden}
              isExpanded={openMenu}
            />
          ))}
        </nav>
        {openMenu && (
          <div className="px-4 pb-6">
            <p
              className={twMerge(
                'text-xs text-slate-400 transition-opacity duration-300',
                openMenu ? 'opacity-100' : 'opacity-0 md:opacity-0',
              )}
            >
              © {new Date().getFullYear()} komtrole. Todos os direitos
              reservados.
            </p>
          </div>
        )}
      </aside>
    </>
  )
}
