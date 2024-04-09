'use client'

import { Text } from '@/components/atoms'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import { useHandlerMockServer } from '@/hooks/use-handler-mock-server'
import { useItemListTransform } from '@/hooks/use-item-list-transform'
import { Form, InfoList, ItemListType, User } from '@/types/general'
import React, { useState } from 'react'
import DetailDefault from '@/components/organisms/DetailDefault'
import { templates } from './templates'
import { loginUser } from '@/actions/auth'
import { formSchemaSignIn } from '../SingIn/schema'

const DetailIndicator = ({ id }: { id: string }) => {
  const { listTransform } = useItemListTransform()
  const { getIndicatorForId } = useHandlerMockServer()
  const [lists, setLists] = useState<InfoList[]>([templates.infoList])
  const [loading, setLoading] = useState(false)

  function getIndicator(): Promise<User> {
    setLoading(true)
    return new Promise((resolve) => {
      setTimeout(() => {
        const response = getIndicatorForId(id)[0]
        const list: ItemListType[] = listTransform(
          response?.profile?.leadsIndicator ?? [],
          templates?.infoList?.itemsList,
        )
        lists[0].list = list
        setLists([...lists])
        setLoading(false)
        resolve(response)
      }, 2000)
    })
  }

  const renderAvatar = (item: ItemListType, index: number) => {
    return <Text className="text-black">{index + 1}</Text>
  }

  function handleRegister(data: User) {
    console.log('data FormDashboard: ', data)
  }

  const forms: Form[] = [
    {
      template: templates.templateForm,
      handlerForm: handleRegister,
      getDefaultValues: getIndicator,
      loading,
      action: loginUser,
      schema: formSchemaSignIn,
      pathSuccess: '/',
    },
  ]

  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full flex flex-col justify-start items-center gap-4">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        <DetailDefault
          renderAvatar={renderAvatar}
          lists={lists}
          forms={forms}
        />
      </div>
    </ContainerDashboard>
  )
}

export default DetailIndicator
