'use client'

import { Text } from '@/components/atoms'
import { mockServer } from '@/components/config/mockServer'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import Search from '@/components/molecules/Search'
import Listing from '@/components/organisms/Listing'
import { useItemListTransform } from '@/hooks/use-item-list-transform'
import { ItemListType, InfoList } from '@/types/general'
import React, { useEffect, useState } from 'react'
import { getTokenFromCookieClient } from '@/utils/cookieClient'
import { searchUsers } from '@/actions/user'

const ListCourses: React.FC = () => {
  const { listTransform } = useItemListTransform()
  const infoList: InfoList = {
    itemsHeader: ['N', 'NOME', 'ATIVO', '', ''],
    itemsList: ['name', '', 'active', '', ''],
  }
  const [list, setList] = useState([])

  useEffect(() => {
    const value = getTokenFromCookieClient()
    async function loadCourses() {
      try {
        const response = await fetch('/api/courses', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${value}`,
          },
        })

        if (!response.ok) {
          const errorMessage = await response.text()
          return {
            errors: { request: [JSON.parse(errorMessage).message] },
          }
        }
        let list = await response.json()
        list = listTransform(list.courses.courses, infoList.itemsList)
        setList(list)
      } catch (error) {}
    }
    loadCourses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderAvatar = (item: ItemListType, index: number) => {
    return <Text className="text-black">{index + 1}</Text>
  }

  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full flex flex-col justify-start items-center gap-4 mb-6">
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
            listActions={mockServer.listActionsCourses}
            hrefButton="dashboard/courses/register"
            textButton="Novo Curso"
            title="Cursos"
          />
        </div>
      </div>
    </ContainerDashboard>
  )
}

export default ListCourses
