import { getIndicator, updateUserProfile } from '@/actions/user'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import FormDashboard from '@/components/organisms/FormDashboard'
import { User } from '@/types/general'
import { templates } from './templates'
import { notFound } from 'next/navigation'

export default async function DetailIndicator({ id }: { id: string }) {
  const response = await getIndicator(id)
  const indicator = response.response
  if (!indicator) {
    notFound()
  }
  const errorRequest = response.error?.request ?? undefined

  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full flex flex-col justify-start items-center gap-4">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        <FormDashboard<User>
          title={templates.templateForm.title}
          templateForm={templates.templateForm}
          defaultValues={indicator ?? undefined}
          action={updateUserProfile}
          pathSuccess="/"
          errorRequest={errorRequest}
        />
      </div>
    </ContainerDashboard>
  )
}
