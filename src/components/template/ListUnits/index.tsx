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

const ListUnits: React.FC = () => {
  const { listTransform } = useItemListTransform()
  const infoList: InfoList = {
    itemsHeader: ['N', 'NOME', 'QUANT. SEGMENTOS', ' QUANT. CURSOS', ''],
    itemsList: ['name', '', 'segments.length', 'courses.length', ''],
  }
  const list = listTransform(mockServer.unidades, infoList.itemsList)

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
            listActions={mockServer.listActionsUnits}
            hrefButton="dashboard/units/register"
            textButton="Nova Unidade"
            title="Unidades"
          />
        </div>
      </div>
    </ContainerDashboard>
  )
}

export default ListUnits
