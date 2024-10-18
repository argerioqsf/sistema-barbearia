'use client'

import { Text } from '@/components/atoms'
import SelectForm from '@/components/atoms/SelectForm'
import { Option, SearchType } from '@/types/general'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { twMerge } from 'tailwind-merge'

const Filter = ({
  errorRequest,
  paramsName = 'q',
  placeholder = 'Buscar...',
  options,
}: {
  errorRequest: string | null
  paramsName?: keyof SearchType
  placeholder?: string
  options: Option[]
}) => {
  const paths = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const queryDefault = searchParams.get(paramsName)

  const handleSearch = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const query = event.target.value
    const lastQuery = searchParams.toString()
    if (lastQuery.includes(paramsName)) {
      const regex = new RegExp(`${paramsName}=([^&]*)`, 'g')
      const nweQueryString = lastQuery.replace(regex, `${paramsName}=${query}`)
      router.push(`${paths}?${nweQueryString}`)
    } else {
      router.push(`${paths}?${paramsName}=${query}&${searchParams.toString()}`)
    }
  }

  return (
    <div className="flex flex-col">
      <div className="w-[90vw] md:w-full flex flex-col md:flex-row justify-start items-center">
        <div className="w-[90vw] md:w-full flex flex-row justify-start items-center">
          <SelectForm
            defaultValue={queryDefault ?? ''}
            id={paramsName}
            placeholder={placeholder}
            options={options}
            onChange={handleSearch}
            className={twMerge(
              'block w-full md:w-56 rounded-full border-2 pl-4 border-primary-100 h-10 ring-blue',
            )}
          />
        </div>
      </div>
      {errorRequest && (
        <Text
          role="alert"
          className="text-red-400 font-semibold whitespace-nowrap overflow-hidden text-ellipsis"
        >
          {errorRequest}
        </Text>
      )}
    </div>
  )
}

export default Filter
