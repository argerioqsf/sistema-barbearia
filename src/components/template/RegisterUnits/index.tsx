'use client'

import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import FormDashboard from '@/components/organisms/FormDashboard'
import React from 'react'
import { templateCoursesForm, templateForm, templateSegmentsForm } from './templateForm'
import { registerUnit } from '@/actions/unit'
import SelectFormWithSearch from '@/components/molecules/SelectFormWithSearch'
import { Course, Profile, Unit } from '@/types/general'

const RegisterUnits: React.FC = () => {

  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full h-full flex flex-col justify-start items-center gap-4 ">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        <div className="w-full mt-6 lg:mt-8">
          <FormDashboard<Unit>
            templateForm={templateForm}
            action={registerUnit}
            schemaName="EditProfile"
            pathSuccess="dashboard/units"
          />
          <FormDashboard<Profile>
            templateForm={templateSegmentsForm}
            action={registerUnit}
            schemaName="EditProfile"
            pathSuccess="dashboard/units"
          />
          <FormDashboard<Course>
            templateForm={templateCoursesForm}
            action={registerUnit}
            schemaName="EditProfile"
            pathSuccess="dashboard/units"
          />
        </div>
      </div>
    </ContainerDashboard>
  )
}

export default RegisterUnits
