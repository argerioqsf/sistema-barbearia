'use client'

import React, { ReactNode } from 'react'
import { useFormStatus } from 'react-dom'
import { twMerge } from 'tailwind-merge'

type ButtonProps = {
  type?: 'submit' | 'reset' | 'button' | undefined
  className?: string
  children: ReactNode
  onClick?: (state: unknown) => void
  disabled?: boolean
}

const Button = ({
  type = 'button',
  className,
  children,
  onClick = () => {},
  disabled,
}: ButtonProps) => {
  const { pending } = useFormStatus()
  return (
    <button
      onClick={onClick}
      type={type}
      className={twMerge('rounded-md p-4', className, pending && 'opacity-50')}
      aria-disabled={pending}
      disabled={disabled ?? pending}
    >
      {!pending ? children : 'Loading...'}
    </button>
  )
}

export default Button
