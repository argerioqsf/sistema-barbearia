'use client'

import { Form, Text } from '@/components/atoms'
import Button from '@/components/atoms/Button'
import LinkDefault from '@/components/atoms/LinkDefault'
import FormFieldText from '@/components/molecules/FormFieldText'
import { formSchemaSignIn } from '@/components/template/SingIn/schema'
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
  const [requestError, setRequestError] = useState<string | undefined>()

  async function onSubmit(values: LoginSchemaType) {
    setRequestError(undefined)
    const result = await signIn('credentials', {
      email: values.email,
      password: values.password,
    })
    if (result?.error) {
      setRequestError('Falha no login')
    }
  }

  return (
    <div className="w-full p-6 space-y-4 md:space-y-6 sm:p-8">
      <Form action={undefined} onSubmit={handleSubmit(onSubmit)}>
        <FormFieldText
          classLabel="pl-6 text-slate-300"
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
          classLabel="pl-6 text-slate-300"
          classInput={`bg-transparent py-3 pl-6 text-white ${
            errors.password && 'ring-red-500 focus:ring-red-500'
          }`}
          placeholder={at('password') ?? ''}
          type="password"
          props={{ ...register('password') }}
          label="Senha"
          error={errors.password?.message}
        />

        <div className="flex items-center mt-4 md:mt-6 justify-between">
          <LinkDefault
            href="#"
            className="text-sm font-medium text-slate-300 hover:underline"
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
          variant="secondary"
          className="w-full bg-secondary-100 text-secondary-foreground py-3 font-bold"
          type="submit"
        >
          {at('login')}
        </Button>
      </Form>
    </div>
  )
}

export default FormLogin
