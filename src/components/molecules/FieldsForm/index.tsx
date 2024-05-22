import { InputForm } from '@/components/atoms'
import { FormFieldText } from '@/components/molecules'
import FormFieldSelect from '@/components/molecules/FormFieldSelect'
import SelectFormWithSearch from '@/components/molecules/SelectFormWithSearch'
import { FieldsTemplateForm, InitialState } from '@/types/general'
import { Dispatch, SetStateAction } from 'react'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form'

type PropsFieldsForm<T> = {
  field: FieldsTemplateForm<T>
  state: InitialState<T>
  setFormDataExtra: Dispatch<SetStateAction<FormData>>
  register: UseFormRegister<T & FieldValues>
  formDataExtra: FormData
}

export default function FieldsForm<T>({
  field,
  state,
  setFormDataExtra,
  formDataExtra,
  register,
}: PropsFieldsForm<T>) {
  const id = field.id as Path<T & { request?: string }>

  const propsField = {
    props: { ...register(id, { required: field.required }) },
    label: field.label,
    classInput: `bg-gray-300 ${field.classInput ?? ''} ${
      state?.errors?.[id] && 'ring-red-500 focus:ring-red-500'
    }`,
    error: (state?.errors?.[id] && state.errors[id]?.[0]) ?? '',
    disabled: field.disabled,
  }

  if (field.type === 'select') {
    return (
      <FormFieldSelect
        {...propsField}
        options={field?.option?.list ?? []}
        optionKeyLabel={field?.option?.keyLabel}
        optionKeyValue={field?.option?.keyValue}
      />
    )
  } else if (field.type === 'selectSearch') {
    return (
      <SelectFormWithSearch
        {...propsField}
        label={field.label}
        setFormDataExtra={setFormDataExtra}
        formDataExtra={formDataExtra}
        options={field?.option?.list ?? []}
        optionKeyLabel={field?.option?.keyLabel}
        optionKeyValue={field?.option?.keyValue}
        variant={field?.option?.variant ?? 'multiple'}
        values={field.option?.values}
        disable={field.disabled}
        onChange={field.option?.onChange}
        onDelete={field.option?.onDelete}
      />
    )
  } else if (field.type === 'hidden') {
    return (
      <InputForm
        propsInput={{ ...propsField.props }}
        type={field.type}
        placeholder={field.placeholder}
      />
    )
  } else {
    return <FormFieldText {...propsField} type={field.type} />
  }
}
