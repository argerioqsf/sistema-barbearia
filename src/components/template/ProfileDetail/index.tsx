import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import FormDashboard from '@/components/organisms/FormDashboard'
import React from 'react'
import { templateForm } from './templateForm'
import { editProfile } from '@/actions/profile'
import { api } from '@/data/api'
import { getTokenFromCookieServer } from '@/utils/cookieServer'
import { Errors, Profile } from '@/types/general'

interface ReturnLoadList {
  response?: Profile
  error?: Errors
}

async function loadProfile(): Promise<ReturnLoadList> {
  try {
    const token = getTokenFromCookieServer()
    const response = await api('/profile', {
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
    const { profile } = await response.json()
    return { response: profile }
  } catch (error) {
    return { error: { request: 'Error unknown' } }
  }
}

export default async function ProfileDetail() {
  const response = await loadProfile()
  const profile = response?.response
  const errorRequest = response.error?.request

  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full h-full flex flex-col justify-start items-center gap-4">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        <div className="w-full mt-6 lg:mt-8">
          <FormDashboard
            schemaName="EditProfile"
            action={editProfile}
            templateForm={templateForm}
            defaultValues={profile}
            pathSuccess="/"
            errorRequest={errorRequest}
          />
        </div>
      </div>
    </ContainerDashboard>
  )
}
