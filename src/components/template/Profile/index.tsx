'use client'

import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import FormDashboard from '@/components/organisms/FormDashboard'
import React, { useState } from 'react'
import { templateForm } from './templateForm'
import Cookies from 'js-cookie'
import { editProfile } from '@/actions/profile'

const Profile: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string>()

  async function loadProfile() {
    setLoading(true)
    try {
      const value = Cookies.get('token_SIM')
      const response = await fetch('/api/profile', {
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
      const { profile } = await response.json()
      console.log('profile: ', profile)
      setLoading(false)
      return profile
    } catch (error) {
      setLoading(false)
      setErrorMessage('Erro ao carregar informações do usuário!')
      return {
        errors: { request: 'Error unknown' },
      }
    }
  }

  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full h-full flex flex-col justify-start items-center gap-4">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        <div className="w-full mt-6 lg:mt-8">
          <FormDashboard
            loading={loading}
            schemaName="EditProfile"
            action={editProfile}
            templateForm={templateForm}
            pathSuccess="profile"
            getDefaultValues={loadProfile}
            errorMessage={errorMessage}
          />
        </div>
      </div>
    </ContainerDashboard>
  )
}

export default Profile
