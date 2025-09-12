import { patchSale } from '@/actions/sale'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import FormDashboard from '@/components/organisms/FormDashboard'
import * as templates from './templates'

export default async function DetailSales({ id }: { id: string }) {
  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full flex flex-col justify-start items-center gap-4">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        <FormDashboard
          title={templates.templateForm.title}
          templateForm={templates.templateForm}
          actionWithId={patchSale}
          pathSuccess="/dashboard/sales"
          id={id}
        />
      </div>
    </ContainerDashboard>
  )
}
