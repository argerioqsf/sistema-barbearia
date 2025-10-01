'use client'

import React, { ReactNode } from 'react'
import { useFormStatus } from 'react-dom'
import { Button as UIButton } from '@/components/ui/button'
import { twMerge } from 'tailwind-merge'

type ButtonProps = {
  type?: 'submit' | 'reset' | 'button' | undefined
  className?: string
  children: ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

const Button = ({
  type = 'button',
  className,
  children,
  onClick = () => {},
  disabled,
  variant,
  size,
}: ButtonProps) => {
  const { pending } = useFormStatus()
  // TODO: analisar mudanças que ia fez, se faz sentido
  return (
    <UIButton
      size={size}
      variant={variant}
      onClick={onClick}
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
