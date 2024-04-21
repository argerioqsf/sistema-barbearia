import { listSelectCourses } from '@/actions/course'
import { listSelectSegments } from '@/actions/segments'
import { getUnit, updateUnit } from '@/actions/unit'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import FormDashboard from '@/components/organisms/FormDashboard'
import { templates } from './templates'
import { notFound } from 'next/navigation'

export default async function DetailUnits({ id }: { id: string }) {
  const response = await getUnit(id)
  const unit = response?.response ?? null
  if (!unit) {
    notFound()
  }

  const responseSegments = await listSelectSegments()
  templates.templateForm.sections[1].boxes[0].fields[0].option = {
    ...templates.templateForm.sections[1].boxes[0].fields[0].option,
    list: responseSegments?.response ?? [],
    values: unit?.segments?.map((segment) => segment.segment.id),
  }
  const responseCourses = await listSelectCourses()
  templates.templateForm.sections[2].boxes[0].fields[0].option = {
    ...templates.templateForm.sections[2].boxes[0].fields[0].option,
    list: responseCourses?.response ?? [],
    values: unit?.courses?.map((course) => course.course.id),
  }

  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full flex flex-col justify-start items-center gap-4">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        <div className="w-full mt-6 lg:mt-8 grid gap-8">
          <FormDashboard
            title={templates.templateForm.title}
            templateForm={templates.templateForm}
            defaultValues={unit ?? undefined}
            action={updateUnit}
            pathSuccess="/"
            schemaName={'UpdateUnit'}
          />
        </div>
      </div>
    </ContainerDashboard>
  )
}
