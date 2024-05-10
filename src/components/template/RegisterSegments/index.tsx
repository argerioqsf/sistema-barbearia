import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import FormDashboard from '@/components/organisms/FormDashboard'
import React from 'react'
import { templateForm } from './templateForm'
import { registerSegment } from '@/actions/segments'
import { listSelectCourses } from '@/actions/course'
import { Course, Segment } from '@/types/general'

export default async function RegisterSegments() {
  const responseCourses = await listSelectCourses()
  templateForm.sections[1].boxes[0].fields[0].option = {
    ...templateForm.sections[1].boxes[0].fields[0].option,
    list: responseCourses?.response ?? [],
  }
  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full h-full flex flex-col justify-start items-center gap-4">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        <div className="w-full mt-6 lg:mt-8">
          <FormDashboard<Segment | Course>
            action={registerSegment}
            templateForm={templateForm}
            pathSuccess="dashboard/segments"
          />
        </div>
      </div>
    </ContainerDashboard>
  )
}
