'use client'

import { registerLeadPublic } from '@/actions/lead'
import { listSelectSegments } from '@/actions/segments'
import { Button, Link, Text } from '@/components/atoms'
import SelectFormWithSearch from '@/components/molecules/SelectFormWithSearch'
import { Course, InitialState, Lead, Segment, Unit } from '@/types/general'
import { useLocale } from 'next-intl'
import { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { FieldValues, useForm } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

export function FormRegisterLeadPublic({
  userId,
}: {
  userId: string
  name: string
}) {
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
    loadSegments()
  }, [])

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

  function onChangeSegment(value: string) {
    const segment = segmentsSelect?.find((segment) => segment.id === value)
    if (segment) {
      const unitsSegment = segment?.units?.map((unit) => unit.unit)
      setUnitSelect([...(unitsSegment ?? [])])
    }
    setSelecteds({ ...selecteds, segmentId: value })
  }

  function onChangeUnit(value: string) {
    const unit = unitSelect?.find((unit) => unit.id === value)
    const segment = segmentsSelect?.find(
      (segment) => segment.id === selecteds.segmentId,
    )
    if (unit && segment) {
      const idsCourseunit = unit.courses?.map((course) => course.course.id)
      const coursesSegment = segment?.courses
        ?.filter((course) => idsCourseunit?.includes(course.course.id))
        .map((course) => course.course)
      setCourseSelect([...(coursesSegment ?? [])])
    }
    setSelecteds({ ...selecteds, unitId: value })
  }

  return (
    <div className="w-full m-8 py-10 flex flex-col justify-center items-center gap-4 lg:gap-6 bg-white rounded-md">
      {!state.ok ? (
        <>
          <div className="px-4 sm:px-24 flex flex-col gap-4">
            <h1 className="text-2xl lg:text-4xl font-bold text-center text-primary-100">
              Vem Ser Madre!
            </h1>

            <h3 className="text-center text-md lg:text-lg text-primary-100 font-semibold">
              O <b>GRUPO MADRE TEREZA</b>, disponibiliza bolsas de desconto para
              você, escolha sua formação
            </h3>
          </div>
          <form
            className="flex flex-col justify-center items-center gap-3 px-4 sm:px-20 md:px-32 lg:px-2 w-full lg:w-[80%]"
            action={handleAction}
          >
            <SelectFormWithSearch<Lead | Segment>
              classNameInput="rounded-xl py-3 bg-primary-100"
              props={{ ...register('segmentId', { required: true }) }}
              onChange={onChangeSegment}
              onDelete={() => {
                setCourseSelect([])
                setUnitSelect([])
                setSelecteds({ unitId: '', segmentId: '', courseId: '' })
              }}
              placeholder={'Selecione uma Formação:'}
              setFormDataExtra={setFormDataExtra}
              options={segmentsSelect ?? []}
              optionKeyLabel={'name'}
              optionKeyValue={'id'}
              variant={'single'}
              error={
                (state?.errors?.segmentId && state.errors?.segmentId[0]) ?? ''
              }
              light={true}
              iconDeleteName="X"
              classNameItem="bg-zinc-400 text-white"
              formDataExtra={formDataExtra}
            />
            {selecteds.segmentId && (
              <SelectFormWithSearch<Lead | Unit>
                classNameInput="rounded-xl py-3 bg-primary-100"
                props={{ ...register('unitId', { required: true }) }}
                onChange={onChangeUnit}
                onDelete={() => {
                  setCourseSelect([])
                  setSelecteds({ ...selecteds, unitId: '', courseId: '' })
                }}
                placeholder={'Escolha local/unidade:'}
                setFormDataExtra={setFormDataExtra}
                options={unitSelect ?? []}
                optionKeyLabel={'name'}
                optionKeyValue={'id'}
                variant={'single'}
                error={(state?.errors?.unitId && state.errors?.unitId[0]) ?? ''}
                light={true}
                iconDeleteName="X"
                classNameItem="bg-zinc-400 text-white"
                formDataExtra={formDataExtra}
              />
            )}
            {selecteds.unitId && (
              <SelectFormWithSearch<Lead | Course>
                classNameInput="rounded-xl py-3 bg-primary-100"
                props={{ ...register('courseId', { required: true }) }}
                onChange={(value) =>
                  setSelecteds({ ...selecteds, unitId: value })
                }
                onDelete={() => setSelecteds({ ...selecteds, courseId: '' })}
                placeholder={'Escolha o curso:'}
                setFormDataExtra={setFormDataExtra}
                options={courseSelect ?? []}
                optionKeyLabel={'name'}
                optionKeyValue={'id'}
                variant={'single'}
                error={
                  (state?.errors?.courseId && state.errors?.courseId[0]) ?? ''
                }
                light={true}
                iconDeleteName="X"
                classNameItem="bg-zinc-400 text-white"
                formDataExtra={formDataExtra}
              />
            )}
            <div className="w-full">
              <input
                className={twMerge(
                  'block w-full bg-primary-100',
                  'rounded-xl border-0',
                  'ring-gray-300 placeholder:text-gray-400  text-white focus:ring-secondary-100',
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
                  'block w-full bg-primary-100',
                  'rounded-xl border-0',
                  'ring-gray-300 placeholder:text-gray-400  text-white focus:ring-secondary-100',
                  'py-3 pl-8 shadow-sm ring-1 ring-inset  focus:ring-inset focus:ring-2 sm:text-sm sm:leading-6',
                )}
                {...register('document', { required: true })}
                type={'text'}
                placeholder={'Seu CPF'}
              />
              {state?.errors?.document && (
                <Text
                  title={state?.errors?.document}
                  role="alert"
                  className="text-red-400 font-semibold whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  {state?.errors?.document}
                </Text>
              )}
            </div>
            <div className="w-full">
              <input
                className={twMerge(
                  'block w-full bg-primary-100',
                  'rounded-xl border-0',
                  'ring-gray-300 placeholder:text-gray-400  text-white focus:ring-secondary-100',
                  'py-3 pl-8 shadow-sm ring-1 ring-inset  focus:ring-inset focus:ring-2 sm:text-sm sm:leading-6',
                )}
                {...register('email', { required: true })}
                type={'email'}
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
                  'block w-full bg-primary-100',
                  'rounded-xl border-0',
                  'ring-gray-300 placeholder:text-gray-400  text-white focus:ring-secondary-100',
                  'py-3 pl-8 shadow-sm ring-1 ring-inset  focus:ring-inset focus:ring-2 sm:text-sm sm:leading-6',
                )}
                {...register('city', { required: true })}
                type={'text'}
                placeholder={'Sua cidade'}
              />
              {state?.errors?.city && (
                <Text
                  title={state?.errors?.city}
                  role="alert"
                  className="text-red-400 font-semibold whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  {state?.errors?.city}
                </Text>
              )}
            </div>
            <div className="w-full">
              <input
                className={twMerge(
                  'block w-full bg-primary-100',
                  'rounded-xl border-0',
                  'ring-gray-300 placeholder:text-gray-400  text-white focus:ring-secondary-100',
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
              <Button
                type="submit"
                className="bg-secondary-100 rounded-xl w-fit"
              >
                <span className="text-white font-semibold">
                  QUERO ME INSCREVER
                </span>
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
        </>
      ) : (
        <div className="flex flex-col gap-4 px-2 lg:px-24">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl lg:text-4xl font-bold text-center text-primary-100">
              CADASTRO FEITO COM SUCESSO!
            </h1>

            <h3 className="text-center text-md lg:text-2xl text-stone-500 font-semibold">
              COMO DESEJA PROSSEGUIR AGORA?
            </h3>
          </div>
          <Button className="bg-primary-100 text-white">
            <Link href="https://wa.me/message/HDPQFMYF6KEZN1">
              Atendimento no Whatsapp
            </Link>
          </Button>
          <Button className="bg-primary-50 text-white">
            <Link
              href="https://www.grupomadretereza.com.br/"
              className="bg-primary-50 text-white"
            >
              Seguir com matricula online
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}
