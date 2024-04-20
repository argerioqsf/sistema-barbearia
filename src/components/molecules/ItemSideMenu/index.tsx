'use client'

import { Button, Text } from '@/components/atoms'
import { ItemMenu } from '@/config/siteConfig'
import { useHandlerRouter } from '@/hooks/use-handler-router'
import { Role } from '@/types/general'
import { getRoleFromCookie } from '@/utils/cookieClient'
import { CatalogIcons, handleIcons } from '@/utils/handleIcons'
import { UserAction, verifyPermissionUser } from '@/utils/verifyPermissionUser'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { Avatar } from '..'

type ItemSideMenuProps = {
  onClick?: () => void
  label: string
  icon?: keyof CatalogIcons
  image?: string
  subMenuList?: ItemMenu[] | undefined
  href?: string
  sizeAvatar?: number
  setOpenMenu: Dispatch<SetStateAction<boolean | null>>
  userAction: UserAction
}

const ItemSideMenu: React.FC<ItemSideMenuProps> = ({
  label,
  icon,
  image,
  subMenuList,
  href = '',
  sizeAvatar = 32,
  setOpenMenu,
  userAction,
}) => {
  const [open, setOpen] = useState(false)
  const { pushRouter } = useHandlerRouter()
  const [role, setRole] = useState<Role>()

  useEffect(() => {
    const roleUser = getRoleFromCookie() as Role
    setRole(roleUser)
  }, [])

  function openSubMenu() {
    if (href) {
      setOpenMenu(false)
      return pushRouter(href)
    }
    setOpen(!open)
  }

  if (role && !verifyPermissionUser(userAction, role)) return null

  const ArrowRightIcon = handleIcons('ChevronRight')
  const ArrowDownIcon = handleIcons('ChevronDown')
  return (
    <div className="flex w-full flex-col min-h-[var(--navbar-height)] justify-start items-center border-b border-primary-50">
      <Button
        className="w-full rounded-none h-full flex flex-row justify-start items-center px-4 py-4"
        type="button"
        onClick={openSubMenu}
      >
        <div className="w-[80%] flex flex-row justify-start items-center gap-4">
          <Avatar
            classIcon={`border-transparent size-[${sizeAvatar}px]`}
            size={sizeAvatar}
            icon={icon && icon}
            image={image && image}
          />
          <Text className="text-lg font-bold text-white whitespace-nowrap overflow-hidden text-ellipsis">
            {label}
          </Text>
        </div>

        <div className="w-[20%] flex flex-row justify-end pr-1">
          {href.length > 0 ||
            (subMenuList &&
              (open ? (
                <ArrowDownIcon size={15} color="white" />
              ) : (
                <ArrowRightIcon size={20} color="white" />
              )))}
        </div>
      </Button>

      {subMenuList && (
        <div
          className={twMerge(
            'w-full bg-primary-50 flex flex-col justify-between items-start overflow-y-auto overflow-x-hidden whitespace-nowrap',
            open === false && 'hidden',
            open === true && 'flex',
          )}
        >
          {subMenuList.map((menu: ItemMenu) => {
            return (
              !menu.hidden && (
                <ItemSideMenu
                  setOpenMenu={setOpenMenu}
                  sizeAvatar={15}
                  icon={menu.icon}
                  href={menu.href}
                  label={menu.label}
                  key={menu.id}
                  userAction={menu.userAction}
                />
              )
            )
          })}
        </div>
      )}
    </div>
  )
}

export default ItemSideMenu
