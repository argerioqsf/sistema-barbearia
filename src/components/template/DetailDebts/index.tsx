import { patchDebt, patchDebtPay } from '@/actions/debt'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import FormDashboard from '@/components/organisms/FormDashboard'
import * as templates from './templates'

export default async function DetailDebts({ id }: { id: string }) {
  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full flex flex-col justify-start items-center gap-8">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        <FormDashboard
          title={templates.templateUpdate.title}
          templateForm={templates.templateUpdate}
          actionWithId={patchDebt}
          pathSuccess="/dashboard/debts"
          id={id}
        />
        <FormDashboard
          title={templates.templatePay.title}
          templateForm={templates.templatePay}
          actionWithId={patchDebtPay}
          pathSuccess="/dashboard/debts"
          id={id}
        />
      </div>
    </ContainerDashboard>
  )
}
