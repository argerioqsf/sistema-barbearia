import { getSegment, updateSegment } from '@/actions/segments'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import FormDashboard from '@/components/organisms/FormDashboard'
import * as templates from './templates'

export default async function DetailSegments({ id }: { id: string }) {
  const response = await getSegment(id)
  const segment = response.response
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
