'use client'

import { Text } from '@/components/atoms'
import { mockServer } from '@/components/config/mockServer'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import Search from '@/components/molecules/Search'
import Listing from '@/components/organisms/Listing'
import { useItemListTransform } from '@/hooks/use-item-list-transform'
import { ItemListType, InfoList, Models, Errors } from '@/types/general'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

interface ResponseLoad {
  errors?: Errors
  response?: Models[]
}

const ListSegments: React.FC = () => {
  const { listTransform } = useItemListTransform()
  const [list, setList] = useState<ItemListType[]>([])

  const infoList: InfoList = {
    itemsHeader: ['N', 'Nome', ''],
    itemsList: ['name', '', '', '', ''],
  }
  // let list = listTransform(mockServer.segments, infoList.itemsList);

  async function loadSegments(): Promise<ResponseLoad> {
    try {
      const value = Cookies.get('token_SIM')
      const response = await fetch('/api/segments', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${value}`,
        },
      })

      if (!response.ok) {
        const errorMessage = await response.text()
        return {
          errors: { request: JSON.parse(errorMessage).message },
        }
      }
      const list = await response.json()
      const listTransformResp = listTransform(list.segments, infoList.itemsList)
      setList(listTransformResp)
      return { response: list.segments }
    } catch (error) {
      return { errors: { request: 'Error unknown' } }
    }
  }

  useEffect(() => {
    loadSegments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderAvatar = (item: ItemListType, index: number) => {
    return <Text className="text-black">{index + 1}</Text>
  }

  const handlerFormSearch = async () => {
    const segments = await loadSegments()
    const listTransformResp = listTransform(
      segments.response ?? [],
      infoList.itemsList,
    )
    setList(listTransformResp)
  }

  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full flex flex-col justify-start items-center gap-4">
        <div className="w-full">
          <Breadcrumb />
        </div>
        <div className="w-full mt-6">
          <Search handleForm={handlerFormSearch} />
        </div>
        <div className="w-full mt-6 lg:mt-8">
          <Listing
            itemsHeader={infoList.itemsHeader}
            avatar={renderAvatar}
            list={list}
            listActions={mockServer.listActionsSegments}
            hrefButton="dashboard/segments/register"
            textButton="Novo Segmento"
            title="Segmentos"
          />
        </div>
      </div>
    </ContainerDashboard>
  )
}

export default ListSegments
