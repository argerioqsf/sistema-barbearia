import { ArrowDownIcon } from '@/components/Icons/ArrowDownIcon'
import { ArrowRightIcon } from '@/components/Icons/ArrowRightIcon'
import { CircleIcon } from '@/components/Icons/CircleIcon'
import { ClipboardIcon } from '@/components/Icons/ClipboardIcon'
import { ClockIcon } from '@/components/Icons/ClockIcon'
import { DashBoardIcon } from '@/components/Icons/DashBoardIcon'
import { EditIcon } from '@/components/Icons/EditIcon'
import { EyeIcon } from '@/components/Icons/EyeIcon'
import { HandPointLeftIcon } from '@/components/Icons/HandPointLeftIcon'
import { LinkIcon } from '@/components/Icons/LinkIcon'
import { LockIcon } from '@/components/Icons/LockIcon'
import { MenuIcon } from '@/components/Icons/MenuIcon'
import { SearchIcon } from '@/components/Icons/SearchIcon'
import { UserIcon } from '@/components/Icons/UserIcon'
import { UsersIcon } from '@/components/Icons/UsersIcon'
import { IconSvgProps } from '@/types/general'
import React from 'react'

export const useHandlerIcons = (icon: string): React.FC<IconSvgProps> => {
  switch (icon) {
    case 'ArrowDown':
      return ArrowDownIcon
    case 'ArrowRight':
      return ArrowRightIcon
    case 'Circle':
      return CircleIcon
    case 'Clipboard':
      return ClipboardIcon
    case 'DashBoard':
      return DashBoardIcon
    case 'Edit':
      return EditIcon
    case 'Eye':
      return EyeIcon
    case 'HandPointLeft':
      return HandPointLeftIcon
    case 'Lock':
      return LockIcon
    case 'Menu':
      return MenuIcon
    case 'Search':
      return SearchIcon
    case 'User':
      return UserIcon
    case 'Users':
      return UsersIcon
    case 'Link':
      return LinkIcon
    case 'Clock':
      return ClockIcon
    default:
      return UserIcon
  }
}
