import { getCourse, updateCourse } from '@/actions/course'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import FormDashboard from '@/components/organisms/FormDashboard'
import * as templates from './templates'
import { notFound } from 'next/navigation'

export default async function DetailCourses({ id }: { id: string }) {
  const response = await getCourse(id)
  const course = response.response
  if (!course) {
    notFound()
  }
  const errorRequest = response.error?.request ?? undefined

  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full flex flex-col justify-start items-center gap-4">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        <FormDashboard
          title={templates.templateForm.title}
          templateForm={templates.templateForm}
          defaultValues={course ?? undefined}
          action={updateCourse}
          pathSuccess="/"
          schemaName={'UpdateUnit'}
          errorRequest={errorRequest}
        />
      </div>
    </ContainerDashboard>
  )
}
