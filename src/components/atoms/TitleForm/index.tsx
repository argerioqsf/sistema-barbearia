import React from 'react'
import { twMerge } from 'tailwind-merge'

type TitleFormProps = {
  title: string
  className?: string
}

const TitleForm = ({ title, className }: TitleFormProps) => {
  return (
    <h1
      className={twMerge(
        'text-xl font-bold leading-tight tracking-tight md:text-2xl',
        className,
      )}
    >
      {title}
    </h1>
  )
}

export default TitleForm
