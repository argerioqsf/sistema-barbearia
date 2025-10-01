import { getProfile, registerWorkHour } from '@/actions/profile'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import FormDashboard from '@/components/organisms/FormDashboard'
import { templateForm } from './templateForm'
import { notFound } from 'next/navigation'
import ErrorState from '@/components/molecules/ErrorState'
// TODO: talvez essa pagina nao seja mais necessaria pois ja é feite es gerenciamento no profile
export default async function ProfileWorkHours() {
  const profileResp = await getProfile()
  const profile = profileResp.response
  if (profileResp.error?.message) {
    return (
      <ErrorState
        title="Erro ao carregar perfil"
        message={String(profileResp.error?.message)}
      />
    )
  }
  if (!profile) notFound()
  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full h-full flex flex-col justify-start items-center gap-4">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        <div className="w-full mt-6 lg:mt-8">
          <FormDashboard<{
            weekDay?: number
            startHour?: string
            endHour?: string
          }>
            actionWithId={registerWorkHour}
            templateForm={templateForm}
            pathSuccess="/dashboard/profile"
            id={profile.id}
          />
        </div>
      </div>
    </ContainerDashboard>
  )
}
