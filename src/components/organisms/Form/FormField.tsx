import * as React from 'react'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { ZodIssue } from 'zod'

type FormFieldProps = {
  label: string
  htmlFor?: string
  errors?: ZodIssue[]
  children: React.ReactElement
  className?: string
}

export const FormField = ({
  label,
  htmlFor,
  errors,
  children,
  className,
}: FormFieldProps) => {
  console.log('errors', errors)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const id = htmlFor || React.useId()
  const child = React.Children.only(children)
  const childWithId = React.cloneElement(child, {
    id,
    ...child.props,
  })

  const errorMessage = errors?.find((err) => err.path.includes(id))?.message

  return (
    <div className={cn('space-y-2', className)}>
      <Label htmlFor={id}>{label}</Label>
      {childWithId}
      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
    </div>
  )
}
