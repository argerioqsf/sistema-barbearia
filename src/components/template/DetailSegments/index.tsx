'use client'

import { Text } from '@/components/atoms'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import { useHandlerMockServer } from '@/hooks/use-handler-mock-server'
import { Form, ItemListType, Segment } from '@/types/general'
import React, { useState } from 'react'
import * as templates from './templates'
import DetailDefault from '@/components/organisms/DetailDefault'
import { loginUser } from '@/actions/auth'
import { formSchemaSignIn } from '../SingIn/schema'

const DetailSegments = ({ id }: { id: string }) => {
  const { getSegmentForId } = useHandlerMockServer()
  const [loading, setLoading] = useState(false)

  function getUser(): Promise<Segment> {
    setLoading(true)
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = getSegmentForId(id)
        setLoading(false)
        resolve(data[0])
      }, 2000)
    })
  }

  const renderAvatar = (item: ItemListType, index: number) => {
    return <Text className="text-black">{index + 1}</Text>
  }

  function handleRegister(data: Segment) {
    console.log('data FormDashboard: ', data)
  }

  const forms: Form[] = [
    {
      template: templates.templateForm,
      handlerForm: handleRegister,
      getDefaultValues: getUser,
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
        <DetailDefault renderAvatar={renderAvatar} forms={forms} />
      </div>
    </ContainerDashboard>
  )
}

export default DetailSegments
