'use client'

import { registerIndicatorProfilePublic } from '@/actions/user'
import { Button, Form, Text } from '@/components/atoms'
import FormFieldSelect from '@/components/molecules/FormFieldSelect'
import { useHandlerRouter } from '@/hooks/use-handler-router'
import { InitialState, OptionGeneric, Profile, User } from '@/types/general'
import { useFormState } from 'react-dom'
import { FieldValues, useForm } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

export default function FormRegisterIndicatorPublic() {
  const initialStateForm: InitialState<User> = {
    errors: undefined,
    ok: false,
  }
  const { register } = useForm<User & FieldValues>()
  const [state, formAction] = useFormState<InitialState<User>, FormData>(
    registerIndicatorProfilePublic,
    initialStateForm,
  )
  const { pushRouter } = useHandlerRouter()

  const genres: OptionGeneric<Profile>[] = [
    {
      label: 'Selecioinar',
      value: '',
    },
    {
      label: 'Masculino',
      value: 'man',
    },
    {
      label: 'Feminino',
      value: 'woman',
    },
    {
      label: 'Outro',
      value: 'other',
    },
  ]

  return !state.ok ? (
    <Form
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
        <FormFieldSelect
          options={genres}
          optionKeyLabel="label"
          optionKeyValue="value"
          error={state?.errors?.profile?.genre}
          props={{ ...register('profile.genre', { required: true }) }}
        />
        {state?.errors?.profile?.genre && (
          <Text
            title={state?.errors?.profile?.genre}
            role="alert"
            className="text-red-400 font-semibold whitespace-nowrap overflow-hidden text-ellipsis"
          >
            {state?.errors?.profile?.genre}
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
          {...register('profile.birthday', { required: true })}
          type={'date'}
          placeholder={'Seu aniversário'}
        />
        {state?.errors?.profile?.birthday && (
          <Text
            title={state?.errors?.profile?.birthday}
            role="alert"
            className="text-red-400 font-semibold whitespace-nowrap overflow-hidden text-ellipsis"
          >
            {state?.errors?.profile?.birthday}
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
          {...register('password', { required: true })}
          type={'password'}
          placeholder={'Sua senha'}
        />
        {state?.errors?.password && (
          <Text
            title={state?.errors?.password}
            role="alert"
            className="text-red-400 font-semibold whitespace-nowrap overflow-hidden text-ellipsis"
          >
            {state?.errors?.password}
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
            className="text-red-600 font-semibold whitespace-nowrap overflow-hidden text-ellipsis"
          >
            {state?.errors?.request}
          </Text>
        )}
      </div>
    </Form>
  ) : (
    <div className=" flex  w-full flex-col justify-center items-center gap-6 p-2">
      <h2 className="text-white text-center text-2xl font-mono">
        Cadastro feito com sucesso!
      </h2>
      <h3 className="text-zinc-200 text-base text-center font-mono">
        Assim que seu cadastro for aprovado, você será avisado(a) no E-mail
        cadastrado
      </h3>
      <Button
        className="rounded-lg text-white font-bold p-2 px-4 bg-primary-100"
        onClick={() => pushRouter(`auth/signin`)}
      >
        Ir para o login
      </Button>
    </div>
  )
}
