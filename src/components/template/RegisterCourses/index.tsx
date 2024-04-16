import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import FormDashboard from '@/components/organisms/FormDashboard'
import React from 'react'
import { templateForm } from './templateForm'
import { registerCourse } from '@/actions/course'
import { Course } from '@/types/general'

export default function RegisterCourses() {
  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full h-full flex flex-col justify-start items-center gap-4">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        <div className="w-full mt-6 lg:mt-8">
          <FormDashboard<Course>
            schemaName="EditProfile"
            action={registerCourse}
            templateForm={templateForm}
            pathSuccess="dashboard/courses"
          />
        </div>
      </div>
    </ContainerDashboard>
  )
}
