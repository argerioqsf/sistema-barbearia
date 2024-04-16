import { Option } from '@/types/general'
import React, { ChangeEventHandler } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

type SelectFormPros = {
  type?: string
  placeholder?: string
  className?: string
  classNameOptions?: string
  propsSelect?: UseFormRegisterReturn<string>
  options?: Option[]
  value?: string
  onChange?: ChangeEventHandler<HTMLSelectElement>
  size?: number
  onBlur?: () => void
}

export default function SelectForm({
  className,
  propsSelect,
  options,
  value,
  onChange,
  size,
  onBlur,
  classNameOptions,
}: SelectFormPros) {
  return (
    <>
      <select
        size={size}
        value={value}
        className={twMerge(
          'appearance-none border-0 outline-0 w-full',
          className,
        )}
        {...propsSelect}
        onChange={onChange ?? propsSelect?.onChange}
        onBlur={onBlur ?? propsSelect?.onBlur}
      >
        {options &&
          options.map((option, index) => (
            <option
              key={index}
              value={option.value}
              className={twMerge(classNameOptions)}
            >
              {option.label}
            </option>
          ))}
      </select>
    </>
  )
}
