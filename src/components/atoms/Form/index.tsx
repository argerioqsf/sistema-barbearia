import React, { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type FormProps = Omit<
  React.FormHTMLAttributes<HTMLFormElement>,
  'action' | 'onSubmit'
> & {
  children: ReactNode
  className?: string
  onSubmit?: () => void
  action?: (payload: FormData) => void
}

const Form = ({
  children,
  className,
  action,
  onSubmit = () => {},
  ...rest
}: FormProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className={twMerge(className)}
      action={action}
      {...rest}
    >
      {children}
    </form>
  )
}

export default Form
