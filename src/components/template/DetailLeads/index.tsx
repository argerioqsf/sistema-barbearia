'use client'

import { Text } from '@/components/atoms'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import { useHandlerMockServer } from '@/hooks/use-handler-mock-server'
import { Form, ItemListType, Lead, TimeLine } from '@/types/general'
import React, { useState } from 'react'
import * as templates from './templates'
import DetailDefault from '@/components/organisms/DetailDefault'
import { loginUser } from '@/actions/auth'
import { formSchemaSignIn } from '../SingIn/schema'

const DetailLeads = ({ id }: { id: string }) => {
  const { getLeadForId } = useHandlerMockServer()
  const [lead, setLead] = useState<Lead | null>()
  const [loading, setLoading] = useState(false)

  function handleRegisterTimeLine(data: TimeLine) {
    console.log('data handleRegisterTimeLine: ', data)
  }

  function getLead(): Promise<Lead> {
    setLoading(true)
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = getLeadForId(id)
        setLead({ ...data[0] })
        setLoading(false)
        resolve(data[0])
      }, 2000)
    })
  }

  const renderAvatar = (item: ItemListType, index: number) => {
    return <Text className="text-black">{index + 1}</Text>
  }

  function handleRegister(data: Lead) {
    console.log('data FormDashboard: ', data)
  }

  const forms: Form[] = [
    {
      template: templates.templateForm,
      handlerForm: handleRegister,
      getDefaultValues: getLead,
      loading,
      action: loginUser,
      schema: formSchemaSignIn,
      pathSuccess: '/',
    },
    {
      template: templates.templateFormTimeLine,
      handlerForm: handleRegisterTimeLine,
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
          timeLine={lead?.timeline}
          forms={forms}
        />
      </div>
    </ContainerDashboard>
  )
}

export default DetailLeads
