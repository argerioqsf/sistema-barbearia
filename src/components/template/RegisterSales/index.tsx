import { registerSale } from '@/actions/sale'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import FormDashboard from '@/components/organisms/FormDashboard'
import type { ZSale } from '@/features/sales/schemas'
import { templateForm } from './templateForm'

export default async function RegisterSales() {
  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full flex flex-col justify-start items-center gap-4">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        <div className="w-full mt-6 lg:mt-8">
          <FormDashboard<ZSale>
            action={registerSale}
            templateForm={templateForm}
            pathSuccess="dashboard/sales"
          />
        </div>
      </div>
    </ContainerDashboard>
  )
}
