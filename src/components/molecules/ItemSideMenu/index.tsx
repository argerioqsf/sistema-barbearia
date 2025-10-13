'use client'

import { Button } from '@/components/atoms'
import { ItemMenu } from '@/config/siteConfig'
import { useHandlerRouter } from '@/hooks/use-handler-router'
import { CatalogIcons, handleIcons } from '@/utils/handleIcons'
import { UserAction, checkUserPermissions } from '@/utils/checkUserPermissions'
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
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
  setOpenMenu: Dispatch<SetStateAction<boolean>>
  userAction: UserAction
  hidden?: boolean
  isExpanded?: boolean
  classTextItem?: string
  isSub?: boolean
}

const SUB_ICON_SIZE = 16
const ROOT_ICON_SIZE = 26
const ChevronRightIcon = handleIcons('ChevronRight')
const ChevronDownIcon = handleIcons('ChevronDown')

export default function ItemSideMenu({
  label,
  icon,
  image,
  subMenuList,
  href = '',
  sizeAvatar = 32,
  setOpenMenu,
  userAction,
  hidden,
  classTextItem,
  isExpanded = true,
  isSub = false,
}: ItemSideMenuProps) {
  const [open, setOpen] = useState(false)
  const { pushRouter } = useHandlerRouter()
  const { role } = useAuth()

  const hasChildren = Boolean(subMenuList?.length)

  const iconSize = isSub ? SUB_ICON_SIZE : ROOT_ICON_SIZE
  const labelVisible = isExpanded
  const showCaret = labelVisible && hasChildren

  useEffect(() => {
    if (!labelVisible) {
      setOpen(false)
    }
  }, [labelVisible])

  const canRender = useMemo(() => {
    if (hidden) return false
    if (!role) return false
    return checkUserPermissions(userAction, role)
  }, [hidden, role, userAction])

  if (!canRender) return null

  const closeMenuOnMobile = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setOpenMenu(false)
    }
  }

  const handleNavigation = async () => {
    if (!href) return
    closeMenuOnMobile()
    await pushRouter(href)
  }

  const handleClick = () => {
    if (href) {
      handleNavigation()
      return
    }
    if (!labelVisible && hasChildren) {
      setOpenMenu(true)
      setOpen(true)
      return
    }
    setOpen((prev) => !prev)
  }

  const iconNode = (
    <Avatar
      size={iconSize}
      icon={icon}
      image={image}
      classAvatar={twMerge(
        'flex items-center justify-center rounded-2xl shadow-inner',
        isSub
          ? 'bg-transparent shadow-none border border-white/20'
          : 'bg-transparent',
        !labelVisible && !isSub && 'mx-auto',
      )}
      classIcon={twMerge('border-transparent p-0', isSub && 'p-0')}
      classIconReal={twMerge(isSub ? 'stroke-secondary' : 'stroke-primary-100')}
    />
  )

  const baseButtonClasses = twMerge(
    'group flex w-full items-center rounded-2xl border border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2',
    labelVisible ? 'gap-3 px-3 py-2.5' : 'justify-center px-0 py-2.5',
    isSub
      ? 'text-white hover:bg-white/10'
      : 'text-sm font-medium text-slate-600 hover:bg-primary/5 hover:text-primary-700',
    open && !isSub && 'border-primary/30 bg-primary/10 text-primary-700',
  )

  return (
    <div>
      <Button
        variant="ghost"
        type="button"
        onClick={handleClick}
        className={twMerge(baseButtonClasses, classTextItem)}
      >
        {iconNode}
        {labelVisible && (
          <span className="flex-1 truncate text-left text-sm font-semibold text-slate-700">
            {label}
          </span>
        )}
        {showCaret && (
          <span className="ml-auto inline-flex h-6 w-6 items-center justify-center text-slate-400 transition-transform group-hover:text-primary-600">
            {open ? (
              <ChevronDownIcon size={18} />
            ) : (
              <ChevronRightIcon size={18} />
            )}
          </span>
        )}
      </Button>

      {labelVisible && hasChildren && open && (
        <div className="mt-1 space-y-1 pl-6">
          {subMenuList!.map((menu) => (
            <ItemSideMenu
              key={menu.id}
              setOpenMenu={setOpenMenu}
              sizeAvatar={sizeAvatar}
              icon={menu.icon}
              subMenuList={menu.subMenuList}
              label={menu.label}
              href={menu.href}
              userAction={menu.userAction}
              hidden={menu.hidden}
              isExpanded={isExpanded}
              isSub
            />
          ))}
        </div>
      )}
    </div>
  )
}
