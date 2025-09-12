import { registerService } from '@/actions/service'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import FormDashboard from '@/components/organisms/FormDashboard'
import type { ZService } from '@/features/services/schemas'
import { templateForm } from './templateForm'

export default async function RegisterServices() {
  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full flex flex-col justify-start items-center gap-4">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        <div className="w-full mt-6 lg:mt-8">
          <FormDashboard<ZService>
            action={registerService}
            templateForm={templateForm}
            pathSuccess="dashboard/services"
          />
        </div>
      </div>
    </ContainerDashboard>
  )
}
