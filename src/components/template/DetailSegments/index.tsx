import { getSegment, updateSegment } from '@/actions/segments'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import FormDashboard from '@/components/organisms/FormDashboard'
import * as templates from './templates'
import { notFound } from 'next/navigation'
import { listSelectCourses } from '@/actions/course'
import { Course, Segment } from '@/types/general'

export default async function DetailSegments({ id }: { id: string }) {
  const response = await getSegment(id)
  const segment = response.response
  if (!segment) {
    notFound()
  }
  const errorRequest = response.error?.request ?? undefined
  const responseCourses = await listSelectCourses()
  templates.templateForm.sections[1].boxes[0].fields[0].option = {
    ...templates.templateForm.sections[1].boxes[0].fields[0].option,
    list: responseCourses?.response ?? [],
    values: segment?.courses?.map((course) => course.course.id),
  }

  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full flex flex-col justify-start items-center gap-4">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        <FormDashboard<Segment | Course>
          title={templates.templateForm.title}
          templateForm={templates.templateForm}
          defaultValues={segment ?? undefined}
          action={updateSegment}
          pathSuccess="/"
          schemaName={'UpdateIndicator'}
          errorRequest={errorRequest}
        />
      </div>
    </ContainerDashboard>
  )
}
