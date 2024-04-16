import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import { Errors, Option, Profile, User } from '@/types/general'
import React from 'react'
import * as templates from './templates'
import {
  getRolesFromCookieServer,
  getTokenFromCookieServer,
} from '@/utils/cookieServer'
import { api } from '@/data/api'
import FormDashboard from '@/components/organisms/FormDashboard'
import { updateUserProfile } from '@/actions/user'

async function getUserForId(id: string): Promise<{
  response?: User
  error?: Errors<User>
}> {
  try {
    const token = getTokenFromCookieServer()
    const response = await api(`/user/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const errorMessage = await response.text()
      return {
        error: { request: JSON.parse(errorMessage).message },
      }
    }
    const user = await response.json()
    return { response: user }
  } catch (error) {
    return { error: { request: 'Error unknown' } }
  }
}

export default async function DetailUsers({ id }: { id: string }) {
  const response = await getUserForId(id)
  const user = response.response
  const errorRequest = response.error?.request ?? undefined

  let options: Option[] = [
    {
      label: 'Selecione',
      value: '',
    },
  ]

  const roles = getRolesFromCookieServer()
  for (const key in roles) {
    options = [
      ...options,
      {
        label: roles[key] as string,
        value: roles[key] as string,
      },
    ]
  }
  templates.templateForm.sections[1].boxes[0].fields[0].options = options

  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full flex flex-col justify-start items-center gap-4">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        <div className="w-full mt-6 lg:mt-8 grid gap-8">
          <FormDashboard<User | Profile>
            title={templates.templateForm.title}
            templateForm={templates.templateForm}
            defaultValues={user}
            action={updateUserProfile}
            pathSuccess="/"
            schemaName={'formSchemaUpdateUserProfile'}
            errorRequest={errorRequest}
          />
        </div>
      </div>
    </ContainerDashboard>
  )
}
