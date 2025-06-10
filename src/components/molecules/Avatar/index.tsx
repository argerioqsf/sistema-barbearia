'use client'

import { useHandlerRouter } from '@/hooks/use-handler-router'
import { CatalogIcons, handleIcons } from '@/utils/handleIcons'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { twMerge } from 'tailwind-merge'

type AvatarProps = {
  href?: string
  classIcon?: string
  classIconReal?: string
  size?: number
  image?: string | StaticImport
  alt?: string
  icon?: keyof CatalogIcons
  colorIcon?: string
  children?: React.ReactNode
  classAvatar?: string
  router?: string
}

const Avatar: React.FC<AvatarProps> = ({
  href = '',
  classIcon = '',
  classIconReal = '',
  colorIcon = 'white',
  size = 36,
  image = '',
  icon,
  alt = '',
  children,
  classAvatar,
  router,
}) => {
  const { generatePath } = useHandlerRouter()
  const Icon = handleIcons(icon)
  const Component =
    href.length > 0 || (router && router.length > 0) ? Link : 'div'
  const routerPath = generatePath(router)
  return (
    <div className={twMerge(`size-[${size}px]`)}>
      <Component
        className={twMerge('flex justify-center items-center', classAvatar)}
        href={routerPath}
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
            {children ?? (
              <Icon size={size} className={classIconReal} color={colorIcon} />
            )}
          </div>
        )}
      </Component>
    </div>
  )
}

export default Avatar
