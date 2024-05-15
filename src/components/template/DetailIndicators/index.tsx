import { getIndicator, updateUserProfileIndicator } from '@/actions/user'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import FormDashboard from '@/components/organisms/FormDashboard'
import { Profile, User } from '@/types/general'
import { notFound } from 'next/navigation'
import { templates } from './templates'

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
        <FormDashboard<User | Profile>
          title={templates.templateForm.title}
          templateForm={templates.templateForm}
          defaultValues={indicator ?? undefined}
          actionWithId={updateUserProfileIndicator}
          pathSuccess="/dashboard/indicators"
          errorRequest={errorRequest}
          id={id}
        />
      </div>
    </ContainerDashboard>
  )
}
