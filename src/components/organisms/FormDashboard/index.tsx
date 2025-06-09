'use client'

import { actionDefault } from '@/actions/auth'
import { Button, Form, Text } from '@/components/atoms'
import Box from '@/components/atoms/Box'
import FieldsForm from '@/components/molecules/FieldsForm'
import { useToast } from '@/components/ui/use-toast'
import { useHandlerRouter } from '@/hooks/use-handler-router'
import {
  BoxTemplateForm,
  GetDefaultValues,
  InitialState,
  LimitColsGrid,
  Roles,
  SectionTemplateForm,
  ServerAction,
  ServerActionId,
  TemplateForm,
  Toast,
} from '@/types/general'
import { checkUserPermissions } from '@/utils/checkUserPermissions'
import { Fragment, useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { FieldValues, Path, useForm } from 'react-hook-form'

type FormDashboardProps<T> = {
  templateForm?: TemplateForm<T>
  loading?: boolean
  getDefaultValues?: GetDefaultValues<T>
  title?: string
  action?: ServerAction<T>
  actionWithId?: ServerActionId<T>
  pathSuccess?: string
  errorMessage?: string
  defaultValues?: T & FieldValues
  errorRequest?: string
  id?: string
  toastInfo?: Toast
  roleUser?: keyof Roles
}

export default function FormDashboard<T>({
  templateForm,
  loading = false,
  title,
  action,
  actionWithId,
  errorMessage,
  defaultValues,
  errorRequest,
  id,
  toastInfo,
  pathSuccess,
  roleUser
}: FormDashboardProps<T>) {
  const { register, watch } = useForm<T & FieldValues>({
    values: defaultValues ?? undefined,
  })
  const { goBack, pushRouter } = useHandlerRouter()
  const [formDataExtra, setFormDataExtra] = useState<FormData>(new FormData())
  const initialStateForm: InitialState<T> = {
    errors: undefined,
    ok: false,
  }
  const { toast } = useToast()

  const [state, formAction] = useFormState<InitialState<T>, FormData>(
    actionWithId ? actionWithId.bind(null, id ?? '') : action ?? actionDefault,
    initialStateForm,
  )

  useEffect(() => {
    if (state.ok) {
      if (pathSuccess) {
        pushRouter(pathSuccess)
      } else {
        goBack()
      }
      if (toastInfo) {
        toast({
          title: toastInfo?.title,
          description: toastInfo?.description,
        })
      }
    }
  }, [state])

  const handlerBoxRender = (boxItem: BoxTemplateForm<T>) => {
    const quantInputHidden = boxItem?.fields?.filter(
      (field) => field.type === 'hidden' || ((roleUser !== undefined && field.roleVisible !== undefined) && !checkUserPermissions(field.roleVisible, roleUser)),
    )
    
    const gridCols = (boxItem?.fields?.length -
      quantInputHidden.length) as LimitColsGrid

    return (
      <Box cols={gridCols}>
        {boxItem.fields.map((field, idx) => {
          if (field.displayLogic && field.displayLogic.fieldId) {
            const idField = field?.displayLogic?.fieldId as Path<
              T & FieldValues
            >
            const whatchField = watch([idField])
            const valueField = whatchField[0]

            if (
              field.displayLogic.expectedValue &&
              valueField !== field.displayLogic.expectedValue
            ) {
              return null
            } else if (valueField && valueField.length === 0) {
              return null
            }
          }

          return (
            <FieldsForm
              key={idx}
              field={field}
              state={state}
              setFormDataExtra={setFormDataExtra}
              formDataExtra={formDataExtra}
              register={register}
              roleUser={roleUser}
            />
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

  function renderSection(section: SectionTemplateForm<T>, idx: number) {
    
    if (roleUser !== undefined && section.roleVisible !== undefined) {
      if (!checkUserPermissions(section.roleVisible, roleUser)) {
        return null
      }
    }

    return (
      <div key={idx} className="w-[90vw] md:w-full mt-10 lg:mt-8">
        <div className="p-4 pb-2 bg-gray-200 rounded-xl rounded-b-none w-full lg:w-56 shadow-md lg:shadow-slate-400">
          <Text className="text-black font-normal text-sm text-center uppercase whitespace-nowrap overflow-hidden text-ellipsis">
            {section.title}
          </Text>
        </div>
        <div className="w-[90vw] grid-cols-12 md:w-full border-2 flex flex-col gap-4 bg-gray-200 p-6 rounded-b-xl lg:rounded-xl lg:rounded-tl-none lg:shadow-md shadow-slate-400">
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
    )

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
          renderSection(section, idx)
        ))}

      </Form>
    </div>
  )
}
