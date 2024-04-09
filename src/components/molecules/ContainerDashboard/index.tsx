'use client'
import React from 'react'
import { twMerge } from 'tailwind-merge'

type ContainerProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

const ContainerDashboard = ({ children, ...rest }: ContainerProps) => {
  return (
    <div
      className={twMerge(
        'w-full flex-nowrap pt-[var(--navbar-height)] overflow-scroll whitespace-nowrap h-svh',
        rest.className,
      )}
    >
      {children}
    </div>
  )
}

export default ContainerDashboard
