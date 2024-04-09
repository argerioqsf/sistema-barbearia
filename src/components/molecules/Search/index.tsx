import React from 'react'
import { Avatar } from '..'
import { twMerge } from 'tailwind-merge'
import { Button, Form, InputForm, Text } from '@/components/atoms'
import { useHandlerForm } from '@/hooks/use-hanlder-form'
import { searchSchema } from './schema'
import { SchemaForm } from '@/types/general'

type SearchProps = {
  handleForm: () => void
  schema?: SchemaForm
}

const Search = ({ handleForm, schema = searchSchema }: SearchProps) => {
  const { register, handleSubmit, errors } = useHandlerForm(schema)

  return (
    <div className="flex flex-col">
      <Form
        onSubmit={handleSubmit(handleForm)}
        className="w-[90vw] md:w-full flex flex-col md:flex-row justify-start items-center gap-4 md:gap-2"
      >
        <div className="w-[90vw] md:w-96 flex flex-row justify-start items-center">
          <InputForm
            propsInput={{ ...register('search') }}
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

      {errors?.search && (
        <Text
          role="alert"
          className="text-red-400 font-semibold whitespace-nowrap overflow-hidden text-ellipsis"
        >
          {errors?.search as string}
        </Text>
      )}
      {errors?.request && (
        <Text
          role="alert"
          className="text-red-400 font-semibold whitespace-nowrap overflow-hidden text-ellipsis"
        >
          {errors?.request as string}
        </Text>
      )}
    </div>
  )
}

export default Search
