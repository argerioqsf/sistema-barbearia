import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import FormDashboard from '@/components/organisms/FormDashboard'
import React from 'react'
import { templateForm } from './templateForm'
import { registerCourse } from '@/actions/course'
import { Course, Segment } from '@/types/general'
import { listSelectSegments } from '@/actions/segments'

export default async function RegisterCourses() {
  const responseSegments = await listSelectSegments()
  templateForm.sections[1].boxes[0].fields[0].option = {
    ...templateForm.sections[1].boxes[0].fields[0].option,
    list: responseSegments?.response ?? [],
  }
  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full flex flex-col justify-start items-center gap-4">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        <div className="w-full mt-6 lg:mt-8">
          <FormDashboard<Course | Segment>
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
