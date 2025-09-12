'use client'

import { Button, Text } from '@/components/atoms'
import { ItemMenu } from '@/config/siteConfig'
import { useHandlerRouter } from '@/hooks/use-handler-router'
import { CatalogIcons, handleIcons } from '@/utils/handleIcons'
import { UserAction, checkUserPermissions } from '@/utils/checkUserPermissions'
import { Dispatch, SetStateAction, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { Avatar } from '..'
import { useAuth } from '@/contexts/auth-context'

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
  isSub?: boolean
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
  isSub = false,
}) => {
  const [open, setOpen] = useState(false)
  const { pushRouter } = useHandlerRouter()
  const { role } = useAuth()

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
  const wrapperBase = isSub
    ? 'flex w-full flex-col items-stretch py-1 pl-6 pr-3'
    : 'flex w-full flex-col justify-center items-stretch pb-3 px-4'
  const buttonWidth = 'w-full'
  const buttonHeightClass = isSub ? 'h-10' : 'h-[56px]'
  const paddingClass = isSub ? 'px-3 py-1.5' : 'px-4 py-4'
  const labelBase = isSub
    ? 'text-sm font-medium text-white'
    : 'text-base font-bold text-primary-100'
  const baseColors = isSub
    ? 'bg-primary-100 hover:bg-primary-100/80 text-white border border-white/10'
    : 'bg-secondary-50 hover:bg-secondary-100/80 text-primary-100'
  const hoverTextClass = isSub
    ? 'group-hover:text-white'
    : 'group-hover:text-primary-100'

  return (
    !hidden && (
      <div className={twMerge(wrapperBase)}>
        <Button
          className={twMerge(
            'group transition-colors rounded-xl flex flex-row justify-start items-center shadow-sm',
            'focus-visible:ring-2 focus-visible:ring-white/30',
            baseColors,
            buttonHeightClass,
            paddingClass,
            buttonWidth,
            classItem,
          )}
          type="button"
          onClick={openSubMenu}
        >
          <div
            className={twMerge(
              'flex flex-row justify-start items-center gap-4 w-full',
            )}
          >
            <Avatar
              classIcon={twMerge('border-transparent')}
              size={sizeAvatar}
              icon={icon && icon}
              image={image && image}
              classIconReal={twMerge('stroke-primary-100', classIconReal)}
            />
            <Text
              className={twMerge(
                labelBase,
                hoverTextClass,
                'whitespace-nowrap overflow-hidden text-ellipsis',
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
              'w-full mt-1 space-y-1',
              open ? 'block' : 'hidden',
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
                  classIconReal="fill-white stroke-white"
                  classTextItem="text-white group-hover:text-white"
                  classItem="bg-primary-100 hover:bg-primary-100/80 text-white border border-white/10 rounded-lg w-full"
                  isSub
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
