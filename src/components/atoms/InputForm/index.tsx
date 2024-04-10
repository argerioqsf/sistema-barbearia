import React from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

type InputFormPros = {
  type?: string
  placeholder?: string
  className?: string
  propsInput: UseFormRegisterReturn<string>
  defaultValue?: string
}

const InputForm = ({
  type,
  placeholder,
  className,
  propsInput,
  defaultValue,
  ...rest
}: InputFormPros) => {
  return (
    <input
      {...rest}
      {...propsInput}
      defaultValue={defaultValue}
      type={type}
      className={twMerge('block w-full', className)}
      placeholder={placeholder}
    />
  )
}

export default InputForm
