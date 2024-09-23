'use client'

import { Form, Text } from '@/components/atoms'
import Button from '@/components/atoms/Button'
import LinkDefault from '@/components/atoms/LinkDefault'
import FormFieldText from '@/components/molecules/FormFieldText'
import { formSchemaSignIn } from '@/components/template/SingIn/schema'
import { useHandlerRouter } from '@/hooks/use-handler-router'
import { usePathTranslations } from '@/hooks/use-path-translations'
import { InitialState, ServerAction, User } from '@/types/general'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { useFormState } from 'react-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type FormLoginProps = {
  action: ServerAction<User>
}

type LoginSchemaType = z.infer<typeof formSchemaSignIn>

const FormLogin = ({ action }: FormLoginProps) => {
  const {
    register,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(formSchemaSignIn),
  })
  const { at, sc } = usePathTranslations('')
  const { pushRouter } = useHandlerRouter()

  const initialState: InitialState<User> = {
    errors: undefined,
    ok: false,
  }

  const [state, formAction] = useFormState(action, initialState)

  useEffect(() => {
    if (state.ok) {
      const user = state.resp as User
      let path = 'dashboard/home'
      switch (user.profile.role) {
        case 'indicator':
          path = 'dashboard/indicators/monitoring'
          break
        case 'consultant':
          path = 'dashboard/consultants/monitoring'
          break
        case 'auxiliary':
          path = 'dashboard/leads'
          break
        default:
          path = 'dashboard/home'
          break
      }
      pushRouter(path)
    }
  }, [pushRouter, state.ok])

  return (
    <div className="w-full p-6 space-y-4 md:space-y-6 sm:p-8">
      <Form action={formAction}>
        <FormFieldText
          classInput={`bg-transparent py-3 pl-6 text-white ${
            errors.email && 'ring-red-500 focus:ring-red-500'
          }`}
          placeholder={at('email')}
          type="email"
          props={{ ...register('email') }}
          label="Email"
          error={state?.errors?.email ? state?.errors?.email[0] : ''}
        />

        <FormFieldText
          classInput={`bg-transparent py-3 pl-6 text-white ${
            errors.password && 'ring-red-500 focus:ring-red-500'
          }`}
          placeholder={at('password')}
          type="password"
          props={{ ...register('password') }}
          label="Senha"
          error={state?.errors?.password ? state?.errors?.password[0] : ''}
        />

        <div className="flex items-center py-4 justify-between">
          {/* <FormFieldCheckBox
            className="text-white"
            label={at("remember_me")}
            id="remember_me"
          /> */}
          <LinkDefault
            href="#"
            className="text-sm font-medium text-primary-600 hover:underline text-white"
          >
            {sc('form_login.forgot_password')}
          </LinkDefault>
        </div>

        {state?.errors?.request && (
          <Text
            title={state?.errors?.request}
            role="alert"
            className="text-red-400 font-semibold whitespace-nowrap overflow-hidden text-ellipsis pb-4"
          >
            {state?.errors?.request}
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
