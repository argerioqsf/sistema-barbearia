'use client'

import { InputForm, Text } from '@/components/atoms'
import { SearchType } from '@/types/general'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { SubmitHandler } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

let timeout: NodeJS.Timeout | null

const Search = ({ errorRequest }: { errorRequest: string | null }) => {
  const paths = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.get('q')

  const handleSearch: SubmitHandler<SearchType> = (data: SearchType) => {
    const query = data.q
    router.push(`${paths}?q=${query}`)
  }

  const onChangeDebounce = (event: React.ChangeEvent<HTMLInputElement>) => {
    timeout && clearTimeout(timeout)
    const target = event.target
    timeout = setTimeout(() => handleSearch({ q: target.value }), 500)
  }

  return (
    <div className="flex flex-col">
      <div className="w-[90vw] md:w-full flex flex-col md:flex-row justify-start items-center gap-4 md:gap-2">
        <div className="w-[90vw] md:w-96 flex flex-row justify-start items-center">
          <InputForm
            defaultValue={query ?? ''}
            type="text"
            id="q"
            onChange={onChangeDebounce}
            className={twMerge(
              'block w-full rounded-full border-2 border-primary-100 h-10 ring-blue',
            )}
            placeholder="Search..."
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

export default Search
