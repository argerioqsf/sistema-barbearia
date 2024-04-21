import { getLead, updateLead } from '@/actions/lead'
import { registerTimeLine } from '@/actions/timeLine'
import { listIndicators } from '@/actions/user'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import FormDashboard from '@/components/organisms/FormDashboard'
import TimeLineComponent from '@/components/organisms/TimeLineComponent'
import { Lead, User } from '@/types/general'
import * as templates from './templates'
import { notFound } from 'next/navigation'

export default async function DetailLeads({ id }: { id: string }) {
  const response = await getLead(id)
  const responseIndicators = await listIndicators()
  const lead = response.response
  if (!lead) {
    notFound()
  }
  const errorRequest = response.error?.request ?? undefined

  templates.templateForm.sections[1].boxes[0].fields[0].option = {
    ...templates.templateForm.sections[1].boxes[0].fields[0].option,
    list: [...(responseIndicators?.response ?? [])],
    values: [lead?.indicatorId ?? ''],
  }

  templates.templateForm.sections[2].boxes[0].fields[0].option = {
    ...templates.templateForm.sections[2].boxes[0].fields[0].option,
    list: [
      {
        label: 'consultor 1',
        value: '91003aab-bbc6-4d09-999c-fcae31d3c6e6',
      },
      {
        label: 'consultor 2',
        value: '91003aab-bbc6-4d09-999c-fcae31d3c6e6',
      },
      {
        label: 'consultor 3',
        value: '91003aab-bbc6-4d09-999c-fcae31d3c6e6',
      },
    ],
    values: [lead?.consultantId ?? ''],
  }

  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full flex flex-col justify-start items-center gap-4">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        <FormDashboard<Lead | User>
          title={templates.templateForm.title}
          templateForm={templates.templateForm}
          defaultValues={lead ?? undefined}
          action={updateLead}
          pathSuccess="/"
          schemaName={'UpdateUnit'}
          errorRequest={errorRequest}
          id={id}
        />
        <FormDashboard
          title={templates.templateFormTimeLine.title}
          templateForm={templates.templateFormTimeLine}
          action={registerTimeLine}
          pathSuccess="/"
          schemaName={'UpdateUnit'}
          errorRequest={errorRequest}
        />

        {lead?.timeline && <TimeLineComponent timeLine={lead?.timeline} />}
      </div>
    </ContainerDashboard>
  )
}
