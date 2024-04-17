import { mockServer } from '@/components/config/mockServer'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import Search from '@/components/molecules/Search'
import Listing from '@/components/organisms/Listing'
import { api } from '@/data/api'
import { InfoList, ReturnLoadList, User } from '@/types/general'
import { getTokenFromCookieServer } from '@/utils/cookieServer'
import React from 'react'

async function loadUsers(): Promise<ReturnLoadList<User>> {
  try {
    const token = getTokenFromCookieServer()
    const response = await api('/users', {
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
    const list = await response.json()
    return { response: list.users }
  } catch (error) {
    return { error: { request: 'Error unknown' } }
  }
}

export default async function ListUsers() {
  const infoList: InfoList<User> = {
    itemsHeader: ['', 'NOME', 'E-MAIL', 'PERMISSÃO'],
    itemsList: ['name', '', 'email', '', 'profile.role'],
  }

  const response = await loadUsers()
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
            infoList={infoList}
            list={list}
            listActions={mockServer.listActionsUsers}
            hrefButton="dashboard/users/register"
            textButton="Novo usuário"
            title="Usuários"
          />
        </div>
      </div>
    </ContainerDashboard>
  )
}
