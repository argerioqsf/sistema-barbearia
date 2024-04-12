'use client'

import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import FormDashboard from '@/components/organisms/FormDashboard'
import React, { useEffect } from 'react'
import { templateForm } from './templateForm'
import { registerUserProfile } from '@/actions/user'
import { getRolesFromCookie } from '@/utils/cookieClient'
import { OptionsTemplateForm } from '@/types/general'

const RegisterUser: React.FC = () => {
  useEffect(() => {
    let options: OptionsTemplateForm[] = [
      {
        label: 'Selecione',
        value: '',
      },
    ]
    const roles = getRolesFromCookie()
    for (const key in roles) {
      options = [
        ...options,
        {
          label: roles[key] as string,
          value: roles[key] as string,
        },
      ]
    }
    templateForm.sections[1].boxes[0].fields[0].options = options
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateForm.sections])

  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full h-full flex flex-col justify-start items-center gap-4">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        <div className="w-full mt-6 lg:mt-8">
          <FormDashboard
            schemaName="EditProfile"
            action={registerUserProfile}
            templateForm={templateForm}
            pathSuccess="dashboard/users"
          />
        </div>
      </div>
    </ContainerDashboard>
  )
}

export default RegisterUser
