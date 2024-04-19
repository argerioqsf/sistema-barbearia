import { Button } from '@/components/atoms'
import LinkDefault from '@/components/atoms/LinkDefault'
import { CatalogIcons, handleIcons } from '@/utils/handleIcons'
import React from 'react'
import { twMerge } from 'tailwind-merge'

type AvatarProps = {
  classIcon?: string
  size?: number
  icon?: keyof CatalogIcons
  colorIcon?: string
  children?: React.ReactNode
  onClick?: () => void
  href?: string
}

const IconAction: React.FC<AvatarProps> = ({
  href = '',
  classIcon = '',
  colorIcon = 'white',
  size = 36,
  icon,
  children,
  onClick,
}) => {
  const Icon = handleIcons(icon)
  return href.length > 0 ? (
    <LinkDefault className="flex justify-center items-center" href={href}>
      <span
        className={twMerge(
          'p-2 rounded-full flex justify-center items-center border-2',
          classIcon,
        )}
      >
        {children ?? <Icon size={size} color={colorIcon} />}
      </span>
    </LinkDefault>
  ) : (
    <Button
      onClick={onClick}
      type="button"
      className="flex justify-center items-center p-0"
    >
      <span
        className={twMerge(
          'p-2 rounded-full flex justify-center items-center border-2',
          classIcon,
        )}
      >
        {children ?? <Icon size={size} color={colorIcon} />}
      </span>
    </Button>
  )
}

export default IconAction
