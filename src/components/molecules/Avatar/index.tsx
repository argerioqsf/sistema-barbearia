import LinkDefault from '@/components/atoms/LinkDefault'
import { CatalogIcons, handleIcons } from '@/utils/handleIcons'
import Image from 'next/image'
import React from 'react'
import { twMerge } from 'tailwind-merge'

type AvatarProps = {
  href?: string
  classIcon?: string
  size?: number
  image?: string
  alt?: string
  icon?: keyof CatalogIcons
  colorIcon?: string
  children?: React.ReactNode
  classAvatar?: string
}

const Avatar: React.FC<AvatarProps> = ({
  href = '',
  classIcon = '',
  colorIcon = 'white',
  size = 36,
  image = '',
  icon,
  alt = '',
  children,
  classAvatar,
}) => {
  const Icon = handleIcons(icon)
  const Component = href.length > 0 ? LinkDefault : 'div'
  return (
    <div className={twMerge(`size-[${size}px]`)}>
      <Component
        className={twMerge('flex justify-center items-center', classAvatar)}
        href={href}
      >
        {image ? (
          <Image
            className="align-middle rounded-full m-0 p-0 aspect-square"
            src={image}
            width={size}
            height={size}
            alt={alt}
          />
        ) : (
          <div
            className={twMerge(
              'p-2 rounded-full flex justify-center items-center border-2',
              classIcon,
            )}
          >
            {children ?? <Icon size={size} color={colorIcon} />}
          </div>
        )}
      </Component>
    </div>
  )
}

export default Avatar
