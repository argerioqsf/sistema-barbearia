'use client'

import { siteConfig } from '@/config/siteConfig'
import ItemSideMenu from '@/components/molecules/ItemSideMenu'
import { useGeneral } from '@/contexts/general-context'
import React, { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { getUserFromCookie } from '@/utils/cookieClient'
import { User } from '@/types/general'

function SideMenu() {
  const { openMenu, setOpenMenu } = useGeneral()
  const [user, setUser] = useState<User>()
  useEffect(() => {
    const user = getUserFromCookie()
    setUser(user)
  }, [])
  return (
    <div className="fixed flex flex-row w-auto z-50">
      <div
        className={twMerge(
          'bg-primary-100',
          'w-0 h-svh',
          'flex flex-row items-start justify-start',
          'whitespace-nowrap overflow-auto',
          openMenu === true && 'animate-openMenu',
          openMenu === false && 'animate-closeMenu',
        )}
      >
        <div className="w-full flex flex-col justify-between items-center">
          <ItemSideMenu
            setOpenMenu={setOpenMenu}
            label={user?.name ?? 'Carregando...'}
            href={'/dashboard/profile'}
            userAction={'profile.view'}
          />
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
      <div
        onClick={() => setOpenMenu(false)}
        className={twMerge(
          'hidden w-[var(--width-nav-bar)] h-svh cursor-pointer bg-transparent justify-center items-center',
          openMenu && 'md:hidden flex',
        )}
      />
    </div>
  )
}

export default SideMenu
