'use client'
import { listSelectCourses } from '@/actions/course'
import { registerLeadPublic } from '@/actions/lead'
import { listSelectSegments } from '@/actions/segments'
import { listUnits } from '@/actions/unit'
import { Button, Link, Text } from '@/components/atoms'
import SelectFormWithSearch from '@/components/molecules/SelectFormWithSearch'
import { useHandlerRouter } from '@/hooks/use-handler-router'
import { Course, InitialState, Lead, Segment, Unit } from '@/types/general'
import { useLocale } from 'next-intl'
import { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { FieldValues, useForm } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

export function FormRegisterLeadPublic({ userId }: { userId: string }) {
  const { pushRouter } = useHandlerRouter()
  const [formDataExtra, setFormDataExtra] = useState<FormData>(new FormData())
  const [segmentsSelect, setSegmentsSelect] = useState<Segment[]>()
  const [unitSelect, setUnitSelect] = useState<Unit[]>()
  const [courseSelect, setCourseSelect] = useState<Course[]>()
  const [selecteds, setSelecteds] = useState<{
    segmentId: null | string
    unitId: null | string
    courseId: null | string
  }>({
    segmentId: null,
    unitId: null,
    courseId: null,
  })
  const initialStateForm: InitialState<Lead> = {
    errors: undefined,
    ok: false,
  }

  const locale = useLocale()
  const { register } = useForm<Lead & FieldValues>()
  const [state, formAction] = useFormState<InitialState<Lead>, FormData>(
    registerLeadPublic.bind(null, userId),
    initialStateForm,
  )

  useEffect(() => {
    async function loadSegments() {
      const response = await listSelectSegments()
      const segments = response?.response
      setSegmentsSelect(segments)
    }
    async function loadUnits() {
      const response = await listUnits('', '')
      const units = response?.response
      setUnitSelect(units)
    }
    async function loadCourses() {
      const response = await listSelectCourses()
      const courses = response?.response
      setCourseSelect(courses)
    }
    loadSegments()
    if (selecteds.segmentId) {
      loadUnits()
    }
    if (selecteds.unitId) {
      loadCourses()
    }
  }, [selecteds])

  useEffect(() => {
    if (state.ok) {
      pushRouter('/')
    }
  }, [state.ok])

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
    <form
      className="flex flex-col justify-center items-center gap-3 px-10 w-full lg:w-[80%]"
      action={handleAction}
    >
      <SelectFormWithSearch<Lead | Segment>
        classNameInput="rounded-xl py-3"
        props={{ ...register('segmentId', { required: true }) }}
        onChange={(value) => setSelecteds({ ...selecteds, segmentId: value })}
        onDelete={() =>
          setSelecteds({ unitId: '', segmentId: '', courseId: '' })
        }
        placeholder={'Selecione uma Formação:'}
        setFormDataExtra={setFormDataExtra}
        options={segmentsSelect ?? []}
        optionKeyLabel={'name'}
        optionKeyValue={'id'}
        variant={'single'}
        error={(state?.errors?.segmentId && state.errors?.segmentId[0]) ?? ''}
        light={true}
        iconDeleteName="X"
        classNameItem="bg-zinc-200"
        values={[]}
      />
      {selecteds.segmentId && (
        <SelectFormWithSearch<Lead | Unit>
          props={{ ...register('unitId', { required: true }) }}
          onChange={(value) => setSelecteds({ ...selecteds, unitId: value })}
          onDelete={() =>
            setSelecteds({ ...selecteds, unitId: '', courseId: '' })
          }
          placeholder={'Escolha local/modalidade:'}
          setFormDataExtra={setFormDataExtra}
          options={unitSelect ?? []}
          optionKeyLabel={'name'}
          optionKeyValue={'id'}
          variant={'single'}
          values={[]}
          error={(state?.errors?.unitId && state.errors?.unitId[0]) ?? ''}
          light={true}
          iconDeleteName="X"
          classNameItem="bg-zinc-200"
        />
      )}
      {selecteds.unitId && (
        <SelectFormWithSearch<Lead | Course>
          props={{ ...register('courseId', { required: true }) }}
          onChange={(value) => setSelecteds({ ...selecteds, unitId: value })}
          onDelete={() => setSelecteds({ ...selecteds, courseId: '' })}
          placeholder={'Escolha o curso:'}
          setFormDataExtra={setFormDataExtra}
          options={courseSelect ?? []}
          optionKeyLabel={'name'}
          optionKeyValue={'id'}
          variant={'single'}
          values={[]}
          error={(state?.errors?.courseId && state.errors?.courseId[0]) ?? ''}
          light={true}
          iconDeleteName="X"
          classNameItem="bg-zinc-200"
        />
      )}
      <div className="w-full">
        <input
          className={twMerge(
            'block w-full',
            'rounded-xl border-0',
            'ring-gray-300 placeholder:text-gray-400 text-gray-900 focus:ring-secondary-100',
            'py-3 pl-8 shadow-sm ring-1 ring-inset  focus:ring-inset focus:ring-2 sm:text-sm sm:leading-6',
          )}
          {...register('name', { required: true })}
          type={'text'}
          placeholder={'Seu nome'}
        />
        {state?.errors?.name && (
          <Text
            title={state?.errors?.name}
            role="alert"
            className="text-red-400 font-semibold whitespace-nowrap overflow-hidden text-ellipsis"
          >
            {state?.errors?.name}
          </Text>
        )}
      </div>
      <div className="w-full">
        <input
          className={twMerge(
            'block w-full',
            'rounded-xl border-0',
            'ring-gray-300 placeholder:text-gray-400 text-gray-900 focus:ring-secondary-100',
            'py-3 pl-8 shadow-sm ring-1 ring-inset  focus:ring-inset focus:ring-2 sm:text-sm sm:leading-6',
          )}
          {...register('email', { required: true })}
          type={'text'}
          placeholder={'Seu E-mail'}
        />
        {state?.errors?.email && (
          <Text
            title={state?.errors?.email}
            role="alert"
            className="text-red-400 font-semibold whitespace-nowrap overflow-hidden text-ellipsis"
          >
            {state?.errors?.email}
          </Text>
        )}
      </div>
      <div className="w-full">
        <input
          className={twMerge(
            'block w-full',
            'rounded-xl border-0',
            'ring-gray-300 placeholder:text-gray-400 text-gray-900 focus:ring-secondary-100',
            'py-3 pl-8 shadow-sm ring-1 ring-inset  focus:ring-inset focus:ring-2 sm:text-sm sm:leading-6',
          )}
          {...register('phone', { required: true })}
          type={'text'}
          placeholder={'Seu Whatsapp'}
        />
        {state?.errors?.phone && (
          <Text
            title={state?.errors?.phone}
            role="alert"
            className="text-red-400 font-semibold whitespace-nowrap overflow-hidden text-ellipsis"
          >
            {state?.errors?.phone}
          </Text>
        )}
      </div>
      <div className="flex flex-col justify-center items-center ">
        <Button type="submit" className="bg-primary-100 rounded-xl w-fit">
          <span className="text-white font-semibold">QUERO ME INSCREVER</span>
        </Button>
        {state?.errors?.request && (
          <Text
            title={state?.errors?.request}
            role="alert"
            className="text-red-400 font-semibold whitespace-nowrap overflow-hidden text-ellipsis"
          >
            {state?.errors?.request}
          </Text>
        )}
      </div>
      <Link
        href={`/${locale}/sim/indicator`}
        className="text-stone-500 font-semibold text-sm"
      >
        QUERO SER UM INDICADOR
      </Link>
    </form>
  )
}
