import { Text } from '@/components/atoms'
import { mockServer } from '@/components/config/mockServer'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import Search from '@/components/molecules/Search'
import Listing from '@/components/organisms/Listing'
import { ItemListType, InfoList, Models, Errors } from '@/types/general'
import { getTokenFromCookieServer } from '@/utils/cookieServer'
import React from 'react'

async function loadSegments(): Promise<{
  response?: Models[]
  error?: Errors
}> {
  try {
    const token = getTokenFromCookieServer()
    console.log('token: ', token)
    const response = await fetch('http://localhost:3333/segments', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    console.log('response: ', response)
    if (!response.ok) {
      const errorMessage = await response.text()
      return {
        error: { request: JSON.parse(errorMessage).message },
      }
    }

    const list = await response.json()
    console.log('list: ', list)
    return { response: list.segments }
  } catch (error) {
    console.log('error: ', error)
    return { error: { request: 'Error unknown' } }
  }
}

export default async function ListSegments() {
  const infoList: InfoList = {
    itemsHeader: ['N', 'Nome', ''],
    itemsList: ['name', '', '', '', ''],
  }

  async function renderAvatar(item: ItemListType, index: string) {
    'use server'
    return <Text className="text-black">{index + 1}</Text>
  }

  const response = await loadSegments()
  const list = response?.response ?? null
  const errorRequest = response.error?.request ?? null

  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full flex flex-col justify-start items-center gap-4">
        <div className="w-full">
          <Breadcrumb />
        </div>
        <div className="w-full mt-6">
          <Search errorRequest={errorRequest} />
        </div>
        <div className="w-full mt-6 lg:mt-8">
          <Listing
            itemsHeader={infoList.itemsHeader}
            list={list}
            infoList={infoList}
            listActions={mockServer.listActionsSegments}
            hrefButton="dashboard/segments/register"
            textButton="Novo Seguimento"
            title="Seguimentos"
          />
        </div>
      </div>
    </ContainerDashboard>
  )
}
