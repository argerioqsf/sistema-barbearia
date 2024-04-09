'use client'

import { searchUsers } from '@/actions/user'
import { mockServer } from '@/components/config/mockServer'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import Search from '@/components/molecules/Search'
import Listing from '@/components/organisms/Listing'
import { useItemListTransform } from '@/hooks/use-item-list-transform'
import { InfoList } from '@/types/general'
import { getTokenFromCookieClient } from '@/utils/cookieClient'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const ListUsers: React.FC = () => {
  const { listTransform } = useItemListTransform()
  const infoList: InfoList = {
    itemsHeader: ['', 'NOME', 'E-MAIL', 'CPF'],
    itemsList: ['name', '', 'email', '', 'profile.cpf'],
  }
  const [list, setList] = useState()
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>()

  useEffect(() => {
    const value = getTokenFromCookieClient()
    async function loadUsers() {
      setLoading(true)
      try {
        const response = await fetch('/api/users', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${value}`,
          },
        })

        if (!response.ok) {
          const errorMessage = await response.text()
          setErrorMessage(JSON.parse(errorMessage).message)
          return {
            errors: { request: [JSON.parse(errorMessage).message] },
          }
        }
        let list = await response.json()
        list = listTransform(list.users, infoList.itemsList)
        setList(list)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        setErrorMessage('Erro ao carregar lista de usuários!')
      }
    }
    loadUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full flex flex-col justify-start items-center gap-4">
        <div className="w-full">
          <Breadcrumb />
        </div>
        <div className="w-full mt-6">
          <Search action={searchUsers} />
        </div>
        <div className="w-full mt-6 lg:mt-8">
          <Listing
            itemsHeader={infoList.itemsHeader}
            list={list}
            listActions={mockServer.listActionsUsers}
            hrefButton="dashboard/users/register"
            textButton="Novo usuário"
            title="Usuários"
            errorMessage={errorMessage}
            loading={loading}
          />
        </div>
      </div>
    </ContainerDashboard>
  )
}

export default ListUsers
