import { Button, InputForm, LabelForm, Text } from '@/components/atoms'
import SelectForm from '@/components/atoms/SelectForm'
import React, { useState } from 'react'
import { FieldValues, UseFormRegisterReturn, UseFormSetValue } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import FormFieldText from '../FormFieldText'
import { Option } from '@/types/general'
import { Trash } from 'lucide-react'


interface Props<T> {
  options: T[]
  value: string
  onChange?: (value: string) => void
  optionKeyLabel?: keyof T
  optionKeyValue?: keyof T
  error: string
  props: UseFormRegisterReturn<string>
  label: string
  setValue: UseFormSetValue<FieldValues>
}

export function SelectFormWithSearch<T>({
  options,
  value,
  onChange,
  optionKeyLabel,
  optionKeyValue,
  error,
  props,
  label,
  setValue
}: Props<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const getOptionLabel = (option: T, key: keyof T) => String(option[key])
  const getOptionValue = (option: T, key: keyof T) => String(option[key])

  const OrderOptions: Option[] = options.map((option) => {
    console.log('getOptionValue: ',getOptionValue)
    return {
      label: optionKeyLabel?getOptionLabel(option, optionKeyLabel):'',
      value: optionKeyValue?getOptionValue(option, optionKeyValue):'',
    };
  });

  const filteredOptions: Option[] = OrderOptions.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setIsFocused(false);
    onChange?onChange(event.target.value):console.log('change:', event.target.value);
    if (!selectedItems.includes(event.target.value)) {
      setSelectedItems((state)=>[...state,event.target.value])
    }
  };

  const removeItem = (id:string)=>{
    if (selectedItems.includes(id)) {
      const itemsFilter = selectedItems.filter(item=>item != id)
      setSelectedItems([...itemsFilter])
    }
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div>
      <FormFieldText
        props={props}
        error={error}
        label={label}
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
        onFocus={handleFocus}
        classInput={ `bg-gray-300 ${
          error && 'ring-red-500 focus:ring-red-500'
        }`}
      />
      <div className="mt-2 relative">
        {isFocused && (
          <SelectForm
            options={filteredOptions}
            onChange={handleChange}
            onBlur={handleBlur}
            size={5}
            className={twMerge(
              'rounded-md border-0 absolute top-full',
              'ring-gray-300 placeholder:text-gray-400 text-gray-900 focus:ring-secondary-100',
              'py-1.5 shadow-sm ring-1 ring-inset  focus:ring-inset focus:ring-2 sm:text-sm sm:leading-6'
            )}
          />
        )}
      </div>

      <div className='bg-gray-300 rounded-lg p-6'>
        <ul>
          {selectedItems?.map((item)=>(
            <div className='bg-slate-50 px-8 mb-2 w-full flex flex-row items-center justify-between rounded-full'>
              <li className='min-w-20 flex justify-center'>{item}</li>
              <Button type='button' onClick={()=>removeItem(item)}>
                <Trash color='red'/>
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

    // <div className="relative">
    //   <input
    //     type="text"
    //     placeholder="Search..."
    //     value={searchTerm}
    //     onChange={handleSearchChange}
    //     onFocus={handleFocus}
    //     onBlur={handleBlur}
    //     className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
    //   />
    //   {isFocused && (
    //     <SelectForm
    //       options={filteredOptions}
    //       value={value}
    //       onChange={handleChange}
    //       size={5}
    //       className={twMerge(
    //         'rounded-md border-0',
    //         'ring-gray-300 placeholder:text-gray-400 text-gray-900 focus:ring-secondary-100',
    //         'py-1.5 shadow-sm ring-1 ring-inset  focus:ring-inset focus:ring-2 sm:text-sm sm:leading-6'
    //       )}
    //     />
    //   )}
    // </div>
  );
}

export default SelectFormWithSearch;
