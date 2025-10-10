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
        'w-full min-h-screen flex-nowrap overflow-auto whitespace-nowrap',
        rest.className,
      )}
    >
      {children}
    </div>
  )
}

export default ContainerDashboard
