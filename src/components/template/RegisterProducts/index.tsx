import { registerProduct } from '@/actions/product'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import FormDashboard from '@/components/organisms/FormDashboard'
import type { ZProduct } from '@/features/products/schemas'
import { templateForm } from './templateForm'

export default async function RegisterProducts() {
  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full flex flex-col justify-start items-center gap-4">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        <div className="w-full mt-6 lg:mt-8">
          <FormDashboard<ZProduct | { image: string }>
            action={registerProduct}
            templateForm={templateForm}
            pathSuccess="dashboard/products"
          />
        </div>
      </div>
    </ContainerDashboard>
  )
}
