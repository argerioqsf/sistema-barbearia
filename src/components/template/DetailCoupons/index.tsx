import { getCoupon, updateCoupon } from '@/actions/coupon'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import FormDashboard from '@/components/organisms/FormDashboard'
import * as templates from './templates'
import { notFound } from 'next/navigation'
import ErrorState from '@/components/molecules/ErrorState'

export default async function DetailCoupons({ id }: { id: string }) {
  const response = await getCoupon(id)
  const coupon = response.response
  const errorRequest = response.error?.message ?? undefined
  if (errorRequest) {
    return (
      <ErrorState
        title="Erro ao carregar cupom"
        message={String(errorRequest)}
      />
    )
  }
  if (!coupon) {
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
          defaultValues={coupon ?? undefined}
          actionWithId={updateCoupon}
          pathSuccess="/dashboard/coupons"
          errorRequest={errorRequest}
          id={id}
        />
      </div>
    </ContainerDashboard>
  )
}
