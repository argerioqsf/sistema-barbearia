'use client'

import { searchUsers } from '@/actions/user'
import { Text } from '@/components/atoms'
import { mockServer } from '@/components/config/mockServer'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import Search from '@/components/molecules/Search'
import Listing from '@/components/organisms/Listing'
import { useItemListTransform } from '@/hooks/use-item-list-transform'
import { ItemListType, InfoList } from '@/types/general'
import React from 'react'

const ListNewLeads: React.FC = () => {
  const { listTransform } = useItemListTransform()

  const infoList: InfoList = {
    itemsHeader: ['N', 'NOME / WHATSAPP', 'INDICADOR', 'STATUS'],
    itemsList: ['name', 'phone', '', 'indicator.name', 'status'],
  }

  const list = listTransform(mockServer.leads, infoList.itemsList)

  const renderAvatar = (item: ItemListType, index: number) => {
    return <Text className="text-black">{index + 1}</Text>
  }

  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full h-full flex flex-col justify-start items-center gap-4">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        <div className="w-full mt-6">
          <Search action={searchUsers} />
        </div>
        <div className="w-full mt-6 lg:mt-8">
          <Listing
            itemsHeader={infoList.itemsHeader}
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

export default ListNewLeads
