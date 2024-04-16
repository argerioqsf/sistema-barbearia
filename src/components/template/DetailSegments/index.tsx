import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import { Errors, User } from '@/types/general'
import React from 'react'
import * as templates from './templates'
import FormDashboard from '@/components/organisms/FormDashboard'
import { getTokenFromCookieServer } from '@/utils/cookieServer'
import { api } from '@/data/api'
import { updateSegment } from '@/actions/segments'

async function getSegmentForId(id: string): Promise<{
  response?: User
  error?: Errors<User>
}> {
  try {
    const token = getTokenFromCookieServer()
    const response = await api(`/segment/${id}`, {
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

export default async function DetailSegments({ id }: { id: string }) {
  const response = await getSegmentForId(id)
  const segment = response.response
  const errorRequest = response.error?.request ?? undefined

  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full flex flex-col justify-start items-center gap-4">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        <FormDashboard
          title={templates.templateForm.title}
          templateForm={templates.templateForm}
          defaultValues={segment ?? undefined}
          action={updateSegment}
          pathSuccess="/"
          schemaName={'UpdateIndicator'}
          errorRequest={errorRequest}
        />
      </div>
    </ContainerDashboard>
  )
}
