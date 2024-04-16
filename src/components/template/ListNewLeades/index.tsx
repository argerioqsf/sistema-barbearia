import { mockServer } from '@/components/config/mockServer'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import Search from '@/components/molecules/Search'
import Listing from '@/components/organisms/Listing'
import { api } from '@/data/api'
import { InfoList, Lead, ReturnLoadList } from '@/types/general'
import { getTokenFromCookieServer } from '@/utils/cookieServer'
import React from 'react'

async function loadLeads(): Promise<ReturnLoadList<Lead>> {
  try {
    const token = getTokenFromCookieServer()
    const response = await api('/leads', {
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
    const { leads } = await response.json()
    return { response: leads }
  } catch (error) {
    return { error: { request: 'Error unknown' } }
  }
}

export default async function ListNewLeads() {
  const infoList: InfoList<Lead> = {
    itemsHeader: ['N', 'NOME / WHATSAPP', 'INDICADOR'],
    itemsList: ['name', 'phone', '', 'name', ''],
  }

  const response = await loadLeads()
  const list = response?.response ?? null
  const errorRequest = response.error?.request ?? null

  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full h-full flex flex-col justify-start items-center gap-4">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        <div className="w-full mt-6">
          <Search errorRequest={errorRequest} />
        </div>
        <div className="w-full mt-6 lg:mt-8">
          <Listing
            infoList={infoList}
            list={list}
            listActions={mockServer.listActionsNewLeads}
            hrefButton="dashboard/leads/register"
            textButton="Novo lead"
            title="Novos Leads"
          />
        </div>
      </div>
    </ContainerDashboard>
  )
}
