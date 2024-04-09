'use client'

import { Text } from '@/components/atoms'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import { Form, ItemListType, User } from '@/types/general'
import React, { useState } from 'react'
import * as templates from './templates'
import DetailDefault from '@/components/organisms/DetailDefault'
import { getTokenFromCookieClient } from '@/utils/cookieClient'
import { loginUser } from '@/actions/auth'
import { formSchemaSignIn } from '../SingIn/schema'

const DetailUsers = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(false)
  console.log(id)
  async function loadProfile() {
    setLoading(true)
    try {
      const value = getTokenFromCookieClient()
      const response = await fetch('/api/me', {
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
      const { profile } = await response.json()
      setLoading(false)
      return profile
    } catch (error) {
      setLoading(false)
      return null
    }
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
      getDefaultValues: loadProfile,
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

export default DetailUsers
