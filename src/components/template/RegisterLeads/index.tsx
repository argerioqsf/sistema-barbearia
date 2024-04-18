import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import FormDashboard from '@/components/organisms/FormDashboard'
import React from 'react'
import { templateForm } from './templateForm'
import { registerLead } from '@/actions/lead'
import { Lead, ReturnLoadList, User } from '@/types/general'
import { getTokenFromCookieServer } from '@/utils/cookieServer'
import { api } from '@/data/api'

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
    // console.log('users: ', users)
    return { response: users }
  } catch (error) {
    return { error: { request: 'Error unknown' } }
  }
}

export default async function RegisterLeads() {
  const responseIndicators = await loadIdicators()
  templateForm.sections[1].boxes[0].fields[0].option = {
    ...templateForm.sections[1].boxes[0].fields[0].option,
    list: [...(responseIndicators?.response ?? [])],
  }

  templateForm.sections[2].boxes[0].fields[0].option = {
    ...templateForm.sections[2].boxes[0].fields[0].option,
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
  }

  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full h-full flex flex-col justify-start items-center gap-4">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        <div className="w-full mt-6 lg:mt-8">
          <FormDashboard<User | Lead>
            templateForm={templateForm}
            action={registerLead}
            schemaName="EditProfile"
            pathSuccess="/dashboard/leads"
          />
        </div>
      </div>
    </ContainerDashboard>
  )
}
