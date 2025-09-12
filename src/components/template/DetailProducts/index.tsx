import { getProduct, updateProduct } from '@/actions/product'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import FormDashboard from '@/components/organisms/FormDashboard'
import * as templates from './templates'
import { notFound } from 'next/navigation'
import ErrorState from '@/components/molecules/ErrorState'

export default async function DetailProducts({ id }: { id: string }) {
  const response = await getProduct(id)
  const product = response.response
  const errorRequest = response.error?.request ?? undefined
  if (errorRequest) {
    return (
      <ErrorState title="Erro ao carregar produto" message={String(errorRequest)} />
    )
  }
  if (!product) {
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
          defaultValues={product ?? undefined}
          actionWithId={updateProduct}
          pathSuccess="/dashboard/products"
          errorRequest={errorRequest}
          id={id}
        />
      </div>
    </ContainerDashboard>
  )
}
