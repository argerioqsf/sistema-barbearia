import { ComponentProps, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export function Skeleton({
  className,
  children,
  ...props
}: ComponentProps<'div'> & { children?: ReactNode }) {
  return (
    <div
      className={twMerge('bg-gray-400 animate-pulse rounded-md', className)}
      {...props}
    >
      {children}
    </div>
  )
}
