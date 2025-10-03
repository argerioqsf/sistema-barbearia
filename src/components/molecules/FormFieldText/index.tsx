'use client'

import { Text } from '@/components/atoms'
import InputForm from '@/components/atoms/InputForm'
import LabelForm from '@/components/atoms/LabelForm'
import Image from 'next/image'
import React, { useState } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

type FormFieldTextProps = {
  label: string
  type: string
  placeholder?: string
  classInput?: string
  classLabel?: string
  props?: UseFormRegisterReturn<string>
  error?: string
  hidden?: boolean
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onFocus?: () => void
  onBlur?: () => void
  disabled?: boolean
  className?: string
}

const FormFieldText = ({
  label,
  type,
  placeholder,
  classInput,
  classLabel,
  props,
  error,
  value,
  onChange,
  onFocus,
  onBlur,
  disabled,
  className,
  ...rest
}: FormFieldTextProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  function addImagePreview(event: React.ChangeEvent<HTMLInputElement>) {
    if (event?.target?.files) {
      const url = URL.createObjectURL(event?.target?.files[0])
      setImagePreview(url)
    }
    if (onChange) {
      onChange(event)
    }
  }

  return (
    <div className={className}>
      {label && (
        <LabelForm htmlFor={props?.name} label={label} className={classLabel} />
      )}
      <div className="mt-2 flex flex-col justify-start items-center">
        <InputForm
          disabled={disabled}
          onBlur={onBlur}
          onFocus={onFocus}
          onChange={type === 'file' ? addImagePreview : onChange}
          value={value}
          {...rest}
          propsInput={props ? { ...props } : undefined}
          type={type}
          placeholder={placeholder}
          className={twMerge(
            'rounded-md border-0 bg-zinc-100',
            'ring-gray-300 placeholder:text-gray-400 text-gray-900',
            'py-1.5 shadow-none ring-1 ring-inset  focus:ring-inset focus:ring-2 sm:text-sm sm:leading-6',
            classInput,
          )}
        />
        {type === 'file' && imagePreview && (
          <div className="w-full bg-gray-300 p-4 flex flex-col justify-start items-center">
            <Image
              width={400}
              height={600}
              src={imagePreview}
              alt="image-preview"
            />
          </div>
        )}
      </div>

      {error && error.length > 0 && (
        <Text
          title={error}
          role="alert"
          className="text-red-400 font-semibold whitespace-nowrap overflow-hidden text-ellipsis"
        >
          {error}
        </Text>
      )}
    </div>
  )
}

export default FormFieldText
