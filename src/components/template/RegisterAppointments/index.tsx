import { registerAppointment } from '@/actions/appointment'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import FormDashboard from '@/components/organisms/FormDashboard'
import type { ZAppointment } from '@/features/appointments/schemas'
import { templateForm } from './templateForm'

export default async function RegisterAppointments() {
  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full flex flex-col justify-start items-center gap-4">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        <div className="w-full mt-6 lg:mt-8">
          <FormDashboard<ZAppointment>
            action={registerAppointment}
            templateForm={templateForm}
            pathSuccess="dashboard/appointments"
          />
        </div>
      </div>
    </ContainerDashboard>
  )
}
