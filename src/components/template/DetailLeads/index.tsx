import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import React from 'react'
import * as templates from './templates'
import FormDashboard from '@/components/organisms/FormDashboard'
import { updateLead } from '@/actions/lead'
import { registerTimeLine } from '@/actions/timeLine'
import { getTokenFromCookieServer } from '@/utils/cookieServer'
import { api } from '@/data/api'
import { Errors, Lead, ReturnLoadList, User } from '@/types/general'
import TimeLineComponent from '@/components/organisms/TimeLineComponent'

async function loadIdicators(): Promise<ReturnLoadList<User>> {
  try {
    const token = getTokenFromCookieServer()
    const response = await api('/indicators', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ['indicators'], revalidate: 60 * 4 },
    })

    if (!response.ok) {
      const errorMessage = await response.text()
      return {
        error: { request: JSON.parse(errorMessage).message },
      }
    }
    const { users } = await response.json()
    return { response: users }
  } catch (error) {
    return { error: { request: 'Error unknown' } }
  }
}

async function getLeadForId(id: string): Promise<{
  response?: Lead
  error?: Errors<Lead>
}> {
  try {
    const token = getTokenFromCookieServer()
    const response = await api(`/lead/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ['leads'], revalidate: 60 * 4 },
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
  const responseIndicators = await loadIdicators()
  const lead = response.response
  const errorRequest = response.error?.request ?? undefined

  templates.templateForm.sections[1].boxes[0].fields[0].option = {
    ...templates.templateForm.sections[1].boxes[0].fields[0].option,
    list: [...(responseIndicators?.response ?? [])],
    values: [lead?.indicatorId ?? ''],
  }

  templates.templateForm.sections[2].boxes[0].fields[0].option = {
    ...templates.templateForm.sections[2].boxes[0].fields[0].option,
    list: [
      {
        label: 'consultor 1',
        value: '91003aab-bbc6-4d09-999c-fcae31d3c6e6',
      },
      {
        label: 'consultor 2',
        value: '91003aab-bbc6-4d09-999c-fcae31d3c6e6',
      },
      {
        label: 'consultor 3',
        value: '91003aab-bbc6-4d09-999c-fcae31d3c6e6',
      },
    ],
    values: [lead?.consultantId ?? ''],
  }

  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full flex flex-col justify-start items-center gap-4">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        <FormDashboard<Lead | User>
          title={templates.templateForm.title}
          templateForm={templates.templateForm}
          defaultValues={lead ?? undefined}
          action={updateLead}
          pathSuccess="/"
          schemaName={'UpdateUnit'}
          errorRequest={errorRequest}
          id={id}
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
