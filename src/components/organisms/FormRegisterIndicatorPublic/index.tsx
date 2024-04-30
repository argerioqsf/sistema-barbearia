'use client'
import { registerIndicatorProfile } from '@/actions/user'
import { Button, Text } from '@/components/atoms'
import { InitialState, User } from '@/types/general'
import { useFormState } from 'react-dom'
import { FieldValues, useForm } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

export function FormRegisterIndicatorPublic() {
  const initialStateForm: InitialState<User> = {
    errors: undefined,
    ok: false,
  }
  const { register } = useForm<User & FieldValues>()
  const [state, formAction] = useFormState<InitialState<User>, FormData>(
    registerIndicatorProfile,
    initialStateForm,
  )

  return (
    <form
      className="flex flex-col justify-center items-center gap-3 px-8 w-full lg:w-[100%]"
      action={formAction}
    >
      <h1 className="text-2xl font-bold text-white">Quero ser um indicador</h1>
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
          {...register('profile.cpf', { required: true })}
          type={'text'}
          placeholder={'Seu CPF'}
        />
        {state?.errors?.profile?.cpf && (
          <Text
            title={state?.errors?.profile?.cpf}
            role="alert"
            className="text-red-400 font-semibold whitespace-nowrap overflow-hidden text-ellipsis"
          >
            {state?.errors?.profile?.cpf}
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
          {...register('profile.pix', { required: true })}
          type={'text'}
          placeholder={'Sua chave pix'}
        />
        {state?.errors?.profile?.pix && (
          <Text
            title={state?.errors?.profile?.pix}
            role="alert"
            className="text-red-400 font-semibold whitespace-nowrap overflow-hidden text-ellipsis"
          >
            {state?.errors?.profile?.pix}
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
          {...register('profile.phone', { required: true })}
          type={'text'}
          placeholder={'Seu Whatsapp'}
        />
        {state?.errors?.profile?.phone && (
          <Text
            title={state?.errors?.profile?.phone}
            role="alert"
            className="text-red-400 font-semibold whitespace-nowrap overflow-hidden text-ellipsis"
          >
            {state?.errors?.profile?.phone}
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
      <div className="flex flex-col justify-center items-center ">
        <Button type="submit" className="bg-primary-100 rounded-xl w-fit">
          <span className="text-white font-semibold">CRIAR MINHA CONTA</span>
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
    </form>
  )
}
