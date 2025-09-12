import { patchAppointment } from '@/actions/appointment'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import FormDashboard from '@/components/organisms/FormDashboard'
import * as templates from './templates'

export default async function DetailAppointments({ id }: { id: string }) {
  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full flex flex-col justify-start items-center gap-4">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        <FormDashboard
          title={templates.templateForm.title}
          templateForm={templates.templateForm}
          actionWithId={patchAppointment}
          pathSuccess="/dashboard/appointments"
          id={id}
        />
      </div>
    </ContainerDashboard>
  )
}
