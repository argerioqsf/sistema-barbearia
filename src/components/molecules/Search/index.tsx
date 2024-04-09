'use client'

import React from 'react'
import { Avatar } from '..'
import { twMerge } from 'tailwind-merge'
import { Button, Form, InputForm, Text } from '@/components/atoms'
import { searchSchema } from './schema'
import { SearchType } from '@/types/general'
import { usePathname, useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

type SchemaSearch = z.infer<typeof searchSchema>

const Search = ({ errorRequest }: { errorRequest: string | null }) => {
  const paths = usePathname()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SchemaSearch>({
    resolver: zodResolver(searchSchema),
  })
  const router = useRouter()

  const handleSearch: SubmitHandler<SearchType> = (data: SearchType) => {
    const query = data.q
    if (!query) {
      return null
    }
    router.push(`${paths}?q=${query}`)
  }

  return (
    <div className="flex flex-col">
      <Form
        onSubmit={handleSubmit(handleSearch)}
        className="w-[90vw] md:w-full flex flex-col md:flex-row justify-start items-center gap-4 md:gap-2"
      >
        <div className="w-[90vw] md:w-96 flex flex-row justify-start items-center">
          <InputForm
            propsInput={{ ...register('q') }}
            type="text"
            className={twMerge(
              'block w-full rounded-full border-2 border-primary-100 h-10',
            )}
            placeholder="Search..."
          />
        </div>
        <Button
          type="submit"
          className="bg-primary-100 rounded-full p-0 w-[90vw] md:w-fit flex justify-center items-center"
        >
          <Avatar
            classIcon="bg-primary-100 border-transparent size-[40px]"
            size={40}
            colorIcon="white"
            icon={'Search'}
          />
        </Button>
      </Form>

      {errors?.q && (
        <Text
          role="alert"
          className="text-red-400 font-semibold whitespace-nowrap overflow-hidden text-ellipsis"
        >
          {errors.q?.message}
        </Text>
      )}
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
