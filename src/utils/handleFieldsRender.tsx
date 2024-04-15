import { InputForm } from '@/components/atoms'
import { FormFieldText } from '@/components/molecules'
import FormFieldSelect from '@/components/molecules/FormFieldSelect'
import SelectFormWithSearch from '@/components/molecules/SelectFormWithSearch'
import { FieldsTemplateForm, InitialState } from '@/types/general'
import { Dispatch, ReactElement, SetStateAction } from 'react'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form'

export default function handleFieldsRender<T>(
  field: FieldsTemplateForm<T>,
  state: InitialState<T & { request?: string }>,
  setFormDataExtra: Dispatch<SetStateAction<FormData>>,
  register: UseFormRegister<T & FieldValues>,
): ReactElement {
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
        type="select"
        options={field.options ?? []}
        optionKeyLabel={field.optionKeyLabel}
        optionKeyValue={field.optionKeyValue}
      />
    )
  } else if (field.type === 'selectSearch') {
    return (
      <SelectFormWithSearch<T>
        {...propsField}
        options={field.options ?? []}
        optionKeyLabel={field.optionKeyLabel}
        optionKeyValue={field.optionKeyValue}
        label={field.label}
        setFormDataExtra={setFormDataExtra}
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
