'use client'

import { Button, Text } from '@/components/atoms'
import { ItemMenu } from '@/config/siteConfig'
import { useHandlerRouter } from '@/hooks/use-handler-router'
import { Role } from '@/types/general'
import { getRoleFromCookie } from '@/utils/cookieClient'
import { CatalogIcons, handleIcons } from '@/utils/handleIcons'
import { UserAction, checkUserPermissions } from '@/utils/checkUserPermissions'
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
  hidden?: boolean
  classIconReal?: string
  classItem?: string
  classTextItem?: string
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
  hidden,
  classIconReal,
  classItem,
  classTextItem,
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

  if (role && !checkUserPermissions(userAction, role)) return null

  const ArrowRightIcon = handleIcons('ChevronRight')
  const ArrowDownIcon = handleIcons('ChevronDown')
  return (
    !hidden && (
      <div className="flex pb-4 w-full flex-col min-h-[var(--sidebar-height)] justify-center items-center">
        <Button
          className={twMerge(
            'w-[80%] bg-secondary-50 rounded-lg h-[60px] flex flex-row justify-start items-center px-4 py-4',
            classItem,
          )}
          type="button"
          onClick={openSubMenu}
        >
          <div className="w-[80%] flex flex-row justify-start items-center gap-4">
            <Avatar
              classIcon={`border-transparent size-[${sizeAvatar}px]`}
              size={sizeAvatar}
              icon={icon && icon}
              image={image && image}
              classIconReal={twMerge('stroke-primary-100', classIconReal)}
            />
            <Text
              className={twMerge(
                'text-base font-bold text-primary-100 whitespace-nowrap overflow-hidden text-ellipsis',
                classTextItem,
              )}
            >
              {label}
            </Text>
          </div>

          <div className="w-[20%] flex flex-row justify-end pr-1">
            {href.length > 0 ||
              (subMenuList &&
                (open ? (
                  <ArrowDownIcon size={20} className="stroke-primary-100" />
                ) : (
                  <ArrowRightIcon size={20} className="stroke-primary-100" />
                )))}
          </div>
        </Button>

        {subMenuList && (
          <div
            className={twMerge(
              'w-full mt-4 pt-4 bg-secondary-100 flex flex-col justify-between items-start overflow-y-auto overflow-x-hidden whitespace-nowrap',
              open === false && 'hidden',
              open === true && 'flex',
            )}
          >
            {subMenuList.map((menu: ItemMenu) => {
              return (
                <ItemSideMenu
                  setOpenMenu={setOpenMenu}
                  sizeAvatar={15}
                  icon={menu.icon}
                  href={menu.href}
                  label={menu.label}
                  key={menu.id}
                  userAction={menu.userAction}
                  hidden={menu.hidden}
                  classIconReal="fill-white"
                  classTextItem="text-white"
                  classItem="bg-primary-100"
                />
              )
            })}
          </div>
        )}
      </div>
    )
  )
}

export default ItemSideMenu
