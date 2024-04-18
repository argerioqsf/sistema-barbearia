import { Button, InputForm, LabelForm, Text } from '@/components/atoms'
import SelectForm from '@/components/atoms/SelectForm'
import { useItemListTransform } from '@/hooks/use-item-list-transform'
import {
  Option,
  OptionGeneric,
  OptionKey,
  VariantOption,
} from '@/types/general'
import { Trash } from 'lucide-react'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

interface Props<T> {
  options: OptionGeneric<T>[]
  onChange?: (value: string) => void
  optionKeyLabel?: OptionKey<T>
  optionKeyValue?: OptionKey<T>
  error: string
  props: UseFormRegisterReturn<string>
  label: string
  setFormDataExtra: Dispatch<SetStateAction<FormData>>
  variant: VariantOption
  values?: string[]
}

export function SelectFormWithSearch<T>({
  options,
  onChange,
  optionKeyLabel,
  optionKeyValue,
  error,
  props,
  label,
  variant,
  setFormDataExtra,
  values,
}: Props<T>) {
  const { getItemValue } = useItemListTransform()
  const getOptionLabel = (option: OptionGeneric<T>, key: OptionKey<T>) =>
    String(getItemValue(option, key))
  const getOptionValue = (option: OptionGeneric<T>, key: OptionKey<T>) =>
    String(getItemValue(option, key))

  const OrderOptions: Option[] = options.map((option) => {
    return {
      label: optionKeyLabel ? getOptionLabel(option, optionKeyLabel) : '',
      value: optionKeyValue ? getOptionValue(option, optionKeyValue) : '',
    }
  })

  const returnExistingValues = (state: FormData) => {
    const newState = new FormData()
    const extraDataKeys = Array.from(state.keys()).filter(
      (key) => key !== props.name,
    )
    extraDataKeys.forEach((key) => {
      const valueString = String(state.get(key)) ?? '[]'
      if (key !== props.name) {
        newState.append(key, valueString)
      }
    })
    return newState
  }

  const [searchTerm, setSearchTerm] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [selectedItems, setSelectedItems] = useState<Option[]>(
    values ? setInitialValue() : [],
  )

  function setInitialValue() {
    let initialSelectedItems = []
    const optionsOrder = OrderOptions
    initialSelectedItems = values
      ? values.map((value) => {
          const itemInOption = optionsOrder.find(
            (option) => option.value === value,
          )
          if (itemInOption) {
            return {
              value: itemInOption.value,
              label: itemInOption.label,
            }
          }
          return {
            value: '',
            label: 'Not Found',
          }
        })
      : []

    return initialSelectedItems
  }

  useEffect(() => {
    // TODO: pegar o initialValue direto do lead
    if (variant === 'multiple') {
      setFormDataExtra((state) => {
        const newState = returnExistingValues(state)
        const extraDataJson = selectedItems.map((item) => item.value)
        const newValue = [...extraDataJson]
        const newValueString = JSON.stringify(newValue)
        newState.append(props.name, newValueString)
        return newState
      })
    }
    if (variant === 'single') {
      setFormDataExtra((state) => {
        const newState = returnExistingValues(state)
        const extraDataJson = selectedItems.map((item) => item.value)
        const newValue = extraDataJson[0] ?? ''
        const newValueString = JSON.stringify(newValue)
        newState.append(props.name, newValueString)
        return newState
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filteredOptions: Option[] = OrderOptions.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const parseCurrentValueFormDataToJson = (state: FormData): string[] => {
    const extraData = state.get(props.name)
    return JSON.parse(String(extraData ?? '[]'))
  }

  const verifyExistsItem = (value: string) => {
    return optionKeyValue
      ? selectedItems.filter((item) => item.value === value)
      : []
  }

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setIsFocused(false)
    onChange ? onChange(event.target.value) : console.log('onChange')

    const itemExists = verifyExistsItem(event.target.value)

    if (itemExists.length === 0) {
      if (variant === 'multiple') {
        setFormDataExtra((state) => {
          const newState = returnExistingValues(state)
          const extraDataJson = parseCurrentValueFormDataToJson(state)
          const newValue = [...extraDataJson, event.target.value]
          const newValueString = JSON.stringify(newValue)
          newState.append(props.name, newValueString)
          return newState
        })
        const itemSelected = filteredOptions.filter(
          (option) => option.value === event.target.value,
        )
        setSelectedItems((state) => [...state, itemSelected[0]])
      } else {
        setFormDataExtra((state) => {
          const newState = returnExistingValues(state)
          newState.append(props.name, event.target.value)
          return newState
        })
        const itemSelected = filteredOptions.filter(
          (option) => option.value === event.target.value,
        )
        setSelectedItems([itemSelected[0]])
      }
      setSearchTerm('')
    }
  }

  const removeItem = (id: string) => {
    const itemExists = verifyExistsItem(id)
    if (itemExists) {
      if (variant === 'multiple') {
        setFormDataExtra((state) => {
          const newState = returnExistingValues(state)
          const extraDataJson = parseCurrentValueFormDataToJson(state)
          const itemsFormDataFilter = extraDataJson.filter(
            (item) => item !== id,
          )
          const newValue = [...itemsFormDataFilter]
          const newValueString = JSON.stringify(newValue)
          newState.append(props.name, newValueString)
          return newState
        })
        const itemsFilter = selectedItems.filter((item) => item.value !== id)
        setSelectedItems([...itemsFilter])
      } else {
        setFormDataExtra((state) => {
          const newState = returnExistingValues(state)
          newState.append(props.name, '')
          return newState
        })
        const itemsFilter = selectedItems.filter((item) => item.value !== id)
        setSelectedItems([...itemsFilter])
      }
    }
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div>
      {label && <LabelForm htmlFor={props.name} label={label} />}
      <div className="mt-2">
        <InputForm
          onChange={handleSearchChange}
          onFocus={() => setIsFocused(true)}
          value={searchTerm}
          id="searchSelectMult"
          type={'text'}
          placeholder="Search..."
          className={twMerge(
            'rounded-full border-0',
            'ring-gray-300 placeholder:text-gray-400 text-gray-900 focus:ring-secondary-100',
            'py-1.5 shadow-sm ring-1 ring-inset  focus:ring-inset focus:ring-2 sm:text-sm sm:leading-6',
            `bg-white ${error && 'ring-red-500 focus:ring-red-500'}`,
          )}
        />

        <div className="mt-6 relative">
          {isFocused && (
            <SelectForm
              classNameOptions="py-2 px-4 mb-2 block w-full text-left bg-white hover:bg-gray-100 border rounded-xl border-gray-300"
              options={filteredOptions}
              onChange={handleChange}
              size={4}
              onBlur={() => setIsFocused(false)}
              className={twMerge(
                'rounded-md border-0 absolute top-full shadow-gray-500',
                'ring-gray-300 placeholder:text-gray-400 text-gray-900 focus:ring-secondary-100',
                'py-1.5 shadow-sm ring-1 ring-inset  focus:ring-inset focus:ring-2 sm:text-sm sm:leading-6',
              )}
            />
          )}
        </div>

        <div
          className={
            variant === 'multiple'
              ? 'bg-gray-300 p-4 rounded-lg min-h-24'
              : 'rounded-md'
          }
        >
          <ul>
            {selectedItems?.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-50 px-8 mb-4 w-full flex flex-row items-center justify-between rounded-full"
              >
                <li className="min-w-20 flex justify-center">{item.label}</li>
                <Button type="button" onClick={() => removeItem(item.value)}>
                  <Trash color="red" />
                </Button>
              </div>
            ))}
          </ul>
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
    </div>
  )
}

export default SelectFormWithSearch
