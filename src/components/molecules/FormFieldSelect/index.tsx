'use client'

import { Text } from '@/components/atoms'
import LabelForm from '@/components/atoms/LabelForm'
import SelectForm from '@/components/atoms/SelectForm'
import { Option, OptionGeneric, OptionKey } from '@/types/general'
import React from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

type FormFieldTextProps<T> = {
  label: string
  type: string
  placeholder?: string
  classInput?: string
  bgColor?: string
  props: UseFormRegisterReturn<string>
  error: string
  options: OptionGeneric<T>[]
  optionKeyLabel?: OptionKey<T>
  optionKeyValue?: OptionKey<T>
}

export default function FormFieldSelect<T>({
  label,
  classInput,
  props,
  error,
  options,
  optionKeyLabel,
  optionKeyValue,
}: FormFieldTextProps<T>) {
  const getOptionLabel = (option: OptionGeneric<T>, key: OptionKey<T>) =>
    String(option[key as keyof OptionGeneric<T>])
  const getOptionValue = (option: OptionGeneric<T>, key: OptionKey<T>) =>
    String(option[key as keyof OptionGeneric<T>])

  const OrderOptions: Option[] = options.map((option) => {
    return {
      label: optionKeyLabel ? getOptionLabel(option, optionKeyLabel) : '',
      value: optionKeyValue ? getOptionValue(option, optionKeyValue) : '',
    }
  })

  return (
    <div>
      {label && <LabelForm htmlFor={props.name} label={label} />}
      <div className="mt-2">
        <SelectForm
          options={OrderOptions}
          className={twMerge(
            'rounded-md border-0',
            'ring-gray-300 placeholder:text-gray-400 text-gray-900 focus:ring-secondary-100',
            'py-1.5 shadow-sm ring-1 ring-inset  focus:ring-inset focus:ring-2 sm:text-sm sm:leading-6',
            classInput,
          )}
          propsSelect={{ ...props }}
        />
      </div>

      {error && (
        <Text
          role="alert"
          className="text-red-400 font-semibold whitespace-nowrap overflow-hidden text-ellipsis"
        >
          {error}
        </Text>
      )}
    </div>
  )
}
