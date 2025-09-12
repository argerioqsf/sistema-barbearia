'use client'

import { Form, Text } from '@/components/atoms'
import Button from '@/components/atoms/Button'
import LinkDefault from '@/components/atoms/LinkDefault'
import FormFieldText from '@/components/molecules/FormFieldText'
import { formSchemaSignIn } from '@/components/template/SingIn/schema'
import { useHandlerRouter } from '@/hooks/use-handler-router'
import { usePathTranslations } from '@/hooks/use-path-translations'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type LoginSchemaType = z.infer<typeof formSchemaSignIn>

const FormLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(formSchemaSignIn),
  })
  const { at, sc } = usePathTranslations('')
  const { pushRouter } = useHandlerRouter()
  const [requestError, setRequestError] = useState<string | undefined>()

  async function onSubmit(values: LoginSchemaType) {
    setRequestError(undefined)
    const result = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    })
    if (result?.error) {
      setRequestError('Falha no login')
      return
    }
    // Decide rota por role via middleware pós-redirecionamento
    pushRouter('dashboard/home')
  }

  return (
    <div className="w-full p-6 space-y-4 md:space-y-6 sm:p-8">
      <Form action={undefined} onSubmit={handleSubmit(onSubmit)}>
        <FormFieldText
          classInput={`bg-transparent py-3 pl-6 text-white ${
            errors.email && 'ring-red-500 focus:ring-red-500'
          }`}
          placeholder={at('email') ?? ''}
          type="email"
          props={{ ...register('email') }}
          label="Email"
          error={errors.email?.message}
        />

        <FormFieldText
          classInput={`bg-transparent py-3 pl-6 text-white ${
            errors.password && 'ring-red-500 focus:ring-red-500'
          }`}
          placeholder={at('password') ?? ''}
          type="password"
          props={{ ...register('password') }}
          label="Senha"
          error={errors.password?.message}
        />

        <div className="flex items-center py-4 justify-between">
          <LinkDefault
            href="#"
            className="text-sm font-medium text-primary-600 hover:underline text-white"
          >
            {sc('form_login.forgot_password')}
          </LinkDefault>
        </div>

        {requestError && (
          <Text
            title={requestError}
            role="alert"
            className="text-red-400 font-semibold whitespace-nowrap overflow-hidden text-ellipsis pb-4"
          >
            {requestError}
          </Text>
        )}

        <Button
          className="w-full bg-secondary-100 text-primary-100 py-3 font-bold"
          type="submit"
        >
          {at('login')}
        </Button>
      </Form>
    </div>
  )
}

export default FormLogin
