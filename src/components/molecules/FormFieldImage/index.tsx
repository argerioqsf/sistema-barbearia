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
  props?: UseFormRegisterReturn<string>
  error: string
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
    <div className={twMerge(className, 'flex justify-center')}>
      <label className="w-full min-h-56 h-full border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-600 cursor-pointer hover:border-gray-500 transition">
        { imagePreview ? (
          <div className="w-full p-4 flex flex-col justify-start items-center">
            <Image
              width={400}
              height={600}
              src={imagePreview}
              alt="image-preview"
            />
          </div>
        ):
        (
          <span className="text-gray-500">Imagem</span>
        )}
        <InputForm
          disabled={disabled}
          onBlur={onBlur}
          onFocus={onFocus}
          onChange={addImagePreview}
          value={value}
          {...rest}
          propsInput={props ? { ...props } : undefined}
          type={type}
          placeholder={placeholder}
          className={twMerge(
            'hidden',
            classInput,
          )}
        />
      </label>

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
