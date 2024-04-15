'use client'

import { Button, Form, Text } from '@/components/atoms'
import Box from '@/components/atoms/Box'
import { useHandlerRouter } from '@/hooks/use-handler-router'
import {
  BoxTemplateForm,
  GetDefaultValues,
  InitialState,
  LimitColsGrid,
  ServerAction,
  TemplateForm,
} from '@/types/general'
import handleFieldsRender from '@/utils/handleFieldsRender'
import { Fragment, useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { DefaultValues, FieldValues, useForm } from 'react-hook-form'

type FormDashboardProps<T> = {
  templateForm?: TemplateForm<T>
  loading?: boolean
  getDefaultValues?: GetDefaultValues<T>
  title?: string
  action: ServerAction<T & { request?: string }>
  schemaName: string
  pathSuccess: string
  errorMessage?: string
  defaultValues?: DefaultValues<T & FieldValues>
  errorRequest?: string
}

export default function FormDashboard<T>({
  templateForm,
  loading = false,
  title,
  action,
  pathSuccess,
  errorMessage,
  defaultValues,
  errorRequest,
}: FormDashboardProps<T>) {
  const { pushRouter } = useHandlerRouter()
  const [formDataExtra, setFormDataExtra] = useState<FormData>(new FormData())

  const { register } = useForm<T & FieldValues>({
    defaultValues: defaultValues ?? undefined,
  })

  console.log('formDataExtra: ', formDataExtra)

  const initialStateForm: InitialState<T & { request?: string }> = {
    errors: undefined,
    ok: false,
  }

  const [state, formAction] = useFormState<
    InitialState<T & { request?: string }>,
    FormData
  >(action, initialStateForm)

  useEffect(() => {
    if (state.ok) {
      pushRouter(pathSuccess)
    }
  }, [action, pathSuccess, pushRouter, state.ok])

  const handlerBoxRender = (boxItem: BoxTemplateForm<T>) => {
    const quantInputHidden = boxItem?.fields?.filter(
      (field) => field.type === 'hidden',
    )
    const gridCols: LimitColsGrid = (boxItem?.fields?.length -
      quantInputHidden.length) as LimitColsGrid
    return (
      <Box cols={gridCols}>
        {boxItem.fields.map((field, idx) => {
          return (
            <Fragment key={idx}>
              {handleFieldsRender<T>(field, state, setFormDataExtra, register)}
            </Fragment>
          )
        })}
      </Box>
    )
  }

  function mergeFormData(
    formData1: FormData,
    formData2: FormData | undefined,
  ): FormData {
    const newFormData = formData1
    if (formData2) {
      const extraDataKeys2 = Array.from(formData2.keys()).filter((key) => key)
      extraDataKeys2.forEach((key) => {
        const valueString = String(formData2.get(key)) ?? '[]'
        newFormData.append(key, valueString)
      })
    }
    return newFormData
  }

  function handleAction(payload: FormData) {
    if (formDataExtra) mergeFormData(payload, formDataExtra)
    formAction(payload)
  }

  return (
    <div className="w-full">
      <Form action={handleAction} className="mb-8">
        <div className="w-[90vw] md:w-full flex flex-row justify-between items-center">
          <Text className="uppercase font-bold text-2xl lg:text-4xl text-black whitespace-nowrap overflow-hidden text-ellipsis">
            {title ?? templateForm?.title}
          </Text>
          {!loading && templateForm?.textButton && (
            <Button
              className="rounded-xl h-10 flex justify-center items-center px-2 sm:px-5 md:px-10 bg-secondary-50 text-white"
              type="submit"
            >
              {templateForm?.textButton}
            </Button>
          )}
        </div>

        {(state?.errors?.request || errorRequest) && (
          <Text
            role="alert"
            className="text-red-400 font-semibold whitespace-nowrap overflow-hidden text-ellipsis"
          >
            {errorRequest ?? state?.errors?.request}
          </Text>
        )}

        {templateForm?.sections.map((section, idx) => (
          <div key={idx} className="w-[90vw] md:w-full mt-10 lg:mt-8">
            <div className="p-4 pb-2 bg-gray-200 rounded-xl rounded-b-none w-56 shadow-md shadow-slate-400">
              <Text className="text-black font-normal text-sm text-center uppercase whitespace-nowrap overflow-hidden text-ellipsis">
                {section.title}
              </Text>
            </div>
            <div className="w-[90vw] grid-cols-12 md:w-full border-2 flex flex-col gap-4 bg-gray-200 p-6 rounded-xl rounded-tl-none shadow-md shadow-slate-400">
              {!loading && !errorMessage ? (
                section?.boxes.map((boxItem, idx) => (
                  <Fragment key={idx}>{handlerBoxRender(boxItem)}</Fragment>
                ))
              ) : !errorMessage ? (
                <div className="w-full h-[20vh] p-4 flex justify-center items-center">
                  <Text>Loading...</Text>
                </div>
              ) : (
                <div className="w-full h-[20vh] p-4 flex justify-center items-center">
                  <Text>{errorMessage}</Text>
                </div>
              )}
            </div>
          </div>
        ))}
      </Form>
    </div>
  )
}
