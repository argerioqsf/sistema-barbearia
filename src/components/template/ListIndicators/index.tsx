import { mockServer } from '@/components/config/mockServer'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import Search from '@/components/molecules/Search'
import Listing from '@/components/organisms/Listing'
import { api } from '@/data/api'
import { InfoList, ReturnLoadList, SearchParams, User } from '@/types/general'
import { getTokenFromCookieServer } from '@/utils/cookieServer'
import React from 'react'

async function loadIndicators(
  q?: string,
  page?: string,
): Promise<ReturnLoadList<User>> {
  try {
    const token = getTokenFromCookieServer()
    const response = await api(
      '/indicators',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { tags: ['indicators'], revalidate: 60 * 4 },
      },
      page,
      q,
    )

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

export default async function ListIndicators({ searchParams }: SearchParams) {
  const infoList: InfoList<User> = {
    itemsHeader: ['N', 'NOME', '', '', ''],
    itemsList: ['name', '', '', '', ''],
  }

  const response = await loadIndicators(
    searchParams?.q ?? '',
    searchParams?.page ?? '',
  )
  const list = response?.response ?? null
  const errorRequest = response.error?.request ?? null

  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full h-full flex flex-col justify-start items-center gap-4">
        <div className="w-full">
          <Breadcrumb />
        </div>
        <div className="w-full mt-6">
          <Search errorRequest={errorRequest} />
        </div>
        <div className="w-full mt-6 lg:mt-8">
          <Listing
            list={list}
            infoList={infoList}
            listActions={mockServer.listActionsIndicators}
            hrefButton="dashboard/indicators/register"
            textButton="Novo indicador"
            title="Indicadores"
          />
        </div>
      </div>
    </ContainerDashboard>
  )
}
