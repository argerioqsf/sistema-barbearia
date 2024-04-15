'use client'

import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import FormDashboard from '@/components/organisms/FormDashboard'
import React, { useEffect, useState } from 'react'
import { templateForm } from './templateForm'
import { registerLead } from '@/actions/lead'

const RegisterLeads: React.FC = () => {
  const [templateFormState, setTemplateFormState] = useState(templateForm)

  useEffect(() => {
    templateFormState.sections[0].boxes[3].fields[0].options = [
      {
        label: '',
        value: '',
      },
      {
        label: 'option1',
        value: '1',
      },
      {
        label: 'option2',
        value: '2',
      },
      {
        label: 'option3',
        value: '3',
      },
    ]
    templateFormState.sections[0].boxes[3].fields[1].options = [
      {
        label: '',
        value: '',
      },
      {
        label: 'option4',
        value: '4',
      },
      {
        label: 'option5',
        value: '5',
      },
      {
        label: 'option6',
        value: '6',
      },
    ]
    setTemplateFormState({ ...templateFormState })
  }, [templateFormState])

  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full h-full flex flex-col justify-start items-center gap-4">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        <div className="w-full mt-6 lg:mt-8">
          <FormDashboard
            templateForm={templateFormState}
            action={registerLead}
            schemaName="EditProfile"
            pathSuccess="/"
          />
        </div>
      </div>
    </ContainerDashboard>
  )
}

export default RegisterLeads
