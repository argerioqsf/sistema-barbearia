import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import React from 'react'
import * as templates from './templates'
import FormDashboard from '@/components/organisms/FormDashboard'
import { updateLead } from '@/actions/lead'
import { registerTimeLine } from '@/actions/timeLine'
import { getTokenFromCookieServer } from '@/utils/cookieServer'
import { api } from '@/data/api'
import { Errors, Lead } from '@/types/general'
import TimeLineComponent from '@/components/organisms/TimeLineComponent'

async function getLeadForId(id: string): Promise<{
  response?: Lead
  error?: Errors
}> {
  try {
    const token = getTokenFromCookieServer()
    const response = await api(`/lead/${id}`, {
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
    const lead = await response.json()
    return { response: lead }
  } catch (error) {
    return { error: { request: 'Error unknown' } }
  }
}

export default async function DetailLeads({ id }: { id: string }) {
  const response = await getLeadForId(id)
  const lead = response.response
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
          defaultValues={lead ?? undefined}
          action={updateLead}
          pathSuccess="/"
          schemaName={'UpdateUnit'}
          errorRequest={errorRequest}
        />
        <FormDashboard
          title={templates.templateFormTimeLine.title}
          templateForm={templates.templateFormTimeLine}
          action={registerTimeLine}
          pathSuccess="/"
          schemaName={'UpdateUnit'}
          errorRequest={errorRequest}
        />

        {lead?.timeline && <TimeLineComponent timeLine={lead?.timeline} />}
      </div>
    </ContainerDashboard>
  )
}
