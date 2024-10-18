import { Option } from '@/types/general'
import React, { ChangeEventHandler } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

type SelectFormPros = {
  id?: string
  className?: string
  classNameOptions?: string
  propsSelect?: UseFormRegisterReturn<string>
  options?: Option[]
  value?: string
  onChange?: ChangeEventHandler<HTMLSelectElement>
  size?: number
  onBlur?: () => void
  selectRef?: React.RefObject<HTMLSelectElement>
  disabled?: boolean
  placeholder?: string
  defaultValue?: string
}

export default function SelectForm({
  id,
  className,
  propsSelect,
  options,
  value,
  onChange,
  size,
  onBlur,
  classNameOptions,
  selectRef,
  disabled,
  placeholder,
  defaultValue,
}: SelectFormPros) {
  if (placeholder) {
    const ifExists = options?.find((option) => option.label === placeholder)
    if (ifExists === undefined) {
      options?.unshift({
        label: placeholder,
        value: '',
      })
    }
  }
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
        ref={selectRef ?? propsSelect?.ref}
        disabled={disabled}
        id={id}
        name={id}
        defaultValue={defaultValue}
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
