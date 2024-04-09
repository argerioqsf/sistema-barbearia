import InputForm from '@/components/atoms/InputForm'
import LabelForm from '@/components/atoms/LabelForm'
import React from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

type FormFieldTextProps = {
  label: string
  id: string
  className?: string
  props: UseFormRegisterReturn<string>
}

const FormFieldCheckBox = ({
  label,
  className,
  props,
  ...rest
}: FormFieldTextProps) => {
  return (
    <div className={twMerge('flex items-start', className)}>
      <div className="flex items-center h-5">
        <InputForm
          {...rest}
          propsInput={{ ...props }}
          type="checkbox"
          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600"
        />
      </div>
      <div className="ml-3 text-sm">
        <LabelForm className="text-white" label={label} />
      </div>
    </div>
  )
}

export default FormFieldCheckBox
