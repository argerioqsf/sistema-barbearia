import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import { Errors, User } from '@/types/general'
import React from 'react'
import { templates } from './templates'
import FormDashboard from '@/components/organisms/FormDashboard'
import { api } from '@/data/api'
import { getTokenFromCookieServer } from '@/utils/cookieServer'
import { updateUserProfile } from '@/actions/user'

async function getIndicatorForId(id: string): Promise<{
  response?: User
  error?: Errors<User>
}> {
  try {
    const token = getTokenFromCookieServer()
    const response = await api(`/indicator/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        revalidate: 15,
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

export default async function DetailIndicator({ id }: { id: string }) {
  const response = await getIndicatorForId(id)
  const indicator = response.response
  const errorRequest = response.error?.request ?? undefined

  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full flex flex-col justify-start items-center gap-4">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        <FormDashboard<User>
          title={templates.templateForm.title}
          templateForm={templates.templateForm}
          defaultValues={indicator ?? undefined}
          action={updateUserProfile}
          pathSuccess="/"
          schemaName={'UpdateIndicator'}
          errorRequest={errorRequest}
        />
      </div>
    </ContainerDashboard>
  )
}
