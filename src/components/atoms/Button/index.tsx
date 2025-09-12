'use client'

import React, { ReactNode } from 'react'
import { useFormStatus } from 'react-dom'
import { Button as UIButton } from '@/components/ui/button'
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
  // TODO: analisar mudanças que ia fez, se faz sentido
  return (
    <UIButton
      onClick={onClick as never}
      type={type}
      className={twMerge(className)}
      aria-disabled={pending}
      disabled={disabled ?? pending}
    >
      {!pending ? children : 'Loading...'}
    </UIButton>
  )
}

export default Button
