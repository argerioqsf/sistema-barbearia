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
  SectionTemplateForm,
  ServerAction,
  ServerActionId,
  TemplateForm,
  Toast,
} from '@/types/general'
import { checkUserPermissions } from '@/utils/checkUserPermissions'
import { Fragment, useEffect, useRef, useState } from 'react'
import { useFormState } from 'react-dom'
import { FieldValues, Path, useForm } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import grid from '../../../constants/grid.json'
import { RoleName } from '@/features/roles/schemas'

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
  roleUser?: RoleName
  renderHeader?: boolean
  submitLabel?: string
  formId?: string
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
  roleUser,
  renderHeader = true,
  submitLabel,
  formId,
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

  const handledSuccess = useRef(false)
  useEffect(() => {
    if (!state.ok || handledSuccess.current) return
    handledSuccess.current = true
    if (pathSuccess) {
      pushRouter(pathSuccess)
    } else {
      goBack()
    }
    if (toastInfo) {
      toast({ title: toastInfo?.title, description: toastInfo?.description })
    }
  }, [state.ok, pathSuccess, pushRouter, goBack, toast, toastInfo])

  const handlerBoxRender = (boxItem: BoxTemplateForm<T>) => {
    const cols: LimitColsGrid = boxItem?.cols ?? 1
    const row: LimitColsGrid = boxItem?.row ?? 1

    return (
      <Box cols={cols} row={row}>
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

    let gridColsGeral = 0
    if (section.cols) {
      gridColsGeral = section.cols
    } else {
      section?.boxes.forEach((element) => {
        gridColsGeral = (gridColsGeral +
          (element?.fields.length ?? 1)) as LimitColsGrid
      })
    }

    return (
      <div key={idx} className="w-full mt-10 lg:mt-8">
        <div
          className={twMerge(
            grid.gridCols[gridColsGeral - 1],
            'w-full grid gap-4 py-6 rounded-b-xl lg:rounded-xl lg:rounded-tl-none',
          )}
        >
          {!loading && !errorMessage ? (
            section?.boxes.map((boxItem, idx) => {
              return <Fragment key={idx}>{handlerBoxRender(boxItem)}</Fragment>
            })
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

  const computedSubmitLabel = submitLabel ?? templateForm?.textButton

  return (
    <div className="w-full">
      <Form action={handleAction} className="mb-8" id={formId}>
        {renderHeader && (
          <div className="w-full flex flex-row justify-between items-center">
            <Text className="uppercase font-bold text-2xl lg:text-4xl text-black whitespace-nowrap overflow-hidden text-ellipsis">
              {title ?? templateForm?.title}
            </Text>
            {!loading && computedSubmitLabel && (
              <Button
                className="h-10 rounded-xl px-2 sm:px-5 md:px-10"
                type="submit"
                variant="secondary"
              >
                {computedSubmitLabel}
              </Button>
            )}
          </div>
        )}

        {(state?.errors?.request || errorRequest) && (
          <Text
            role="alert"
            className="text-red-400 font-semibold whitespace-nowrap overflow-hidden text-ellipsis"
          >
            {errorRequest ?? state?.errors?.request}
          </Text>
        )}

        {templateForm?.sections.map((section, idx) =>
          renderSection(section, idx),
        )}
      </Form>
    </div>
  )
}
