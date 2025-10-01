import { getService, updateService } from '@/actions/service'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import FormDashboard from '@/components/organisms/FormDashboard'
import * as templates from './templates'
import { notFound } from 'next/navigation'
import ErrorState from '@/components/molecules/ErrorState'

export default async function DetailServices({ id }: { id: string }) {
  const response = await getService(id)
  const service = response.response
  const errorRequest = response.error?.message ?? undefined
  if (errorRequest) {
    return (
      <ErrorState
        title="Erro ao carregar serviço"
        message={String(errorRequest)}
      />
    )
  }
  if (!service) {
    notFound()
  }

  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full flex flex-col justify-start items-center gap-4">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        <FormDashboard
          title={templates.templateForm.title}
          templateForm={templates.templateForm}
          defaultValues={service ?? undefined}
          actionWithId={updateService}
          pathSuccess="/dashboard/services"
          errorRequest={errorRequest}
          id={id}
        />
      </div>
    </ContainerDashboard>
  )
}
