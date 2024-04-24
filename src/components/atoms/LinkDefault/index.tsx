import React, { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import Link from 'next/link'
import { useHandlerRouter } from '@/hooks/use-handler-router'

type LinkProps = {
  children: ReactNode
  href?: string
  className?: string
  absolute?: boolean
}

const LinkDefault = ({ children, href, className, absolute }: LinkProps) => {
  const { generatePath } = useHandlerRouter()
  return (
    <Link
      href={absolute ? href ?? '' : generatePath(href)}
      className={twMerge('text-sm font-medium text-primary-600', className)}
    >
      {children}
    </Link>
  )
}

export default LinkDefault
