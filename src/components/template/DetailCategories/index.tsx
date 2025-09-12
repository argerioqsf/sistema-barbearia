import { getCategory, updateCategory } from '@/actions/category'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import FormDashboard from '@/components/organisms/FormDashboard'
import * as templates from './templates'
import { notFound } from 'next/navigation'
import ErrorState from '@/components/molecules/ErrorState'

export default async function DetailCategories({ id }: { id: string }) {
  const response = await getCategory(id)
  const category = response.response
  const errorRequest = response.error?.request ?? undefined
  if (errorRequest) {
    return (
      <ErrorState
        title="Erro ao carregar categoria"
        message={String(errorRequest)}
      />
    )
  }
  if (!category) {
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
          defaultValues={category ?? undefined}
          actionWithId={updateCategory}
          pathSuccess="/dashboard/categories"
          errorRequest={errorRequest}
          id={id}
        />
      </div>
    </ContainerDashboard>
  )
}
