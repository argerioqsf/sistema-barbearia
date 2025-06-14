'use client'

import { siteConfig } from '@/config/siteConfig'
import ItemSideMenu from '@/components/molecules/ItemSideMenu'
import { useGeneral } from '@/contexts/general-context'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import { Avatar } from '@/components/molecules'
import logoBarbearia from '../../../../public/logo_barbearia.png'

function SideMenu() {
  const { openMenu, setOpenMenu } = useGeneral()
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
          <Avatar
            router={'/dashboard/profile'}
            size={140}
            image={logoBarbearia}
            classAvatar='mb-2'
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
