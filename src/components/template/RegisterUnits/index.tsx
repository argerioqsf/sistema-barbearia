import { listSelectCourses } from '@/actions/course'
import { listSelectSegments } from '@/actions/segments'
import { registerUnit } from '@/actions/unit'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import FormDashboard from '@/components/organisms/FormDashboard'
import { Course, Segment, Unit } from '@/types/general'
import { templateForm } from './templateForm'

export default async function RegisterUnits() {
  const responseSegments = await listSelectSegments()
  templateForm.sections[1].boxes[0].fields[0].option = {
    ...templateForm.sections[1].boxes[0].fields[0].option,
    list: responseSegments?.response ?? [],
  }
  const responseCourses = await listSelectCourses()
  templateForm.sections[2].boxes[0].fields[0].option = {
    ...templateForm.sections[2].boxes[0].fields[0].option,
    list: responseCourses?.response ?? [],
  }

  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full h-full flex flex-col justify-start items-center gap-4">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        <div className="w-full mt-6 lg:mt-8">
          <FormDashboard<Unit | Course | Segment>
            templateForm={templateForm}
            action={registerUnit}
            schemaName="EditProfile"
            pathSuccess="dashboard/units"
          />
        </div>
      </div>
    </ContainerDashboard>
  )
}
