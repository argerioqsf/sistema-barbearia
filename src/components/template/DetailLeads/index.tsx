import { listSelectConsultants } from '@/actions/consultant'
import { getLead, updateLead } from '@/actions/lead'
import { getProfile } from '@/actions/profile'
import { registerTimeLine } from '@/actions/timeLine'
import { listSelectUnits } from '@/actions/unit'
import { listIndicators } from '@/actions/user'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import FormDashboard from '@/components/organisms/FormDashboard'
import TimeLineComponent from '@/components/organisms/TimeLineComponent'
import { Lead, Unit, User } from '@/types/general'
import { checkUserPermissions } from '@/utils/checkUserPermissions'
import { notFound } from 'next/navigation'
import * as templatesRaw from './templates'
import { listSelectCourses } from '@/actions/course'
import { listSelectSegments } from '@/actions/segments'

export default async function DetailLeads({ id }: { id: string }) {
  const responseProfile = await getProfile()
  const profile = responseProfile?.response
  let ownerIndicator = false
  const response = await getLead(id)
  const responseIndicators = await listIndicators()
  const responseConsultants = await listSelectConsultants()
  const lead = response.response
  if (!lead) {
    notFound()
  }
  if (profile) {
    if (checkUserPermissions('lead.detail', profile.role)) {
      if (profile?.role === 'indicator') {
        ownerIndicator = profile?.id === lead.indicatorId
      }
    } else {
      notFound()
    }
  } else {
    notFound()
  }

  const errorRequest = response.error?.request ?? undefined

  const templates = templatesRaw as typeof templatesRaw

  templates.templateForm.sections[1].boxes[0].fields[0].option = {
    ...templates.templateForm.sections[1].boxes[0].fields[0].option,
    list: [...(responseIndicators?.response ?? [])],
    values: [lead?.indicatorId ?? ''],
  }
  const consultants = responseConsultants?.response ?? []
  const values = lead?.consultantId ? [lead?.consultantId] : []
  templates.templateForm.sections[2].boxes[0].fields[0].option = {
    ...templates.templateForm.sections[2].boxes[0].fields[0].option,
    list: [...consultants],
    values: [...values],
  }

  const responseUnits = await listSelectUnits()
  const units = responseUnits?.response ?? []
  const valuesUnitId = lead.unitId ? [lead.unitId] : []
  templates.templateForm.sections[3].boxes[0].fields[0].option = {
    ...templates.templateForm.sections[3].boxes[0].fields[0].option,
    list: [...units],
    values: [...valuesUnitId],
  }

  const responseCourses = await listSelectCourses()
  const courses = responseCourses?.response ?? []
  const valuesCourseId = lead.courseId ? [lead.courseId] : []
  templates.templateForm.sections[4].boxes[0].fields[0].option = {
    ...templates.templateForm.sections[4].boxes[0].fields[0].option,
    list: [...courses],
    values: [...valuesCourseId],
  }

  const responseSegments = await listSelectSegments()
  const segments = responseSegments?.response ?? []
  const valuesSegmentId = lead.segmentId ? [lead.segmentId] : []
  templates.templateForm.sections[5].boxes[0].fields[0].option = {
    ...templates.templateForm.sections[5].boxes[0].fields[0].option,
    list: [...segments],
    values: [...valuesSegmentId],
  }

  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full flex flex-col justify-start items-center gap-4">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        <FormDashboard<Lead | User | Unit>
          title={templates.templateForm.title}
          templateForm={templates.templateForm}
          defaultValues={lead ?? undefined}
          actionWithId={updateLead}
          pathSuccess={
            ownerIndicator ? '/dashboard/indicators/leads' : undefined
          }
          roleUser={profile.role}
          errorRequest={errorRequest}
          id={id}
        />
        {checkUserPermissions('lead.form.timeline', profile.role) && (
          <FormDashboard
            title={templates.templateFormTimeLine.title}
            templateForm={templates.templateFormTimeLine}
            actionWithId={registerTimeLine}
            pathSuccess={`/dashboard/leads/detail/${id}`}
            errorRequest={errorRequest}
            id={lead.id}
          />
        )}

        {lead?.timeline && <TimeLineComponent timeLine={lead?.timeline} />}
      </div>
    </ContainerDashboard>
  )
}
