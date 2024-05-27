import { updateOrganization } from '@/actions/organization'
import { getProfile, updateProfileUser } from '@/actions/profile'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import FormDashboard from '@/components/organisms/FormDashboard'
import { Organization, Profile, User } from '@/types/general'
import { checkUserPermissions } from '@/utils/checkUserPermissions'
import { notFound } from 'next/navigation'
import { templateForm, templateFormOrganization } from './templateForm'

export default async function ProfileDetail() {
  const response = await getProfile()
  const profile = response?.response
  const errorRequest = response.error?.request
  if (!profile) {
    notFound()
  }
  const organizations = profile.user?.organizations.map(
    (organization) => organization.organization,
  )
  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full h-full flex flex-col justify-start items-center gap-4">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        <div className="w-full mt-6 lg:mt-8">
          <FormDashboard<Profile | User>
            action={updateProfileUser}
            templateForm={templateForm}
            defaultValues={profile}
            pathSuccess="/dashboard/profile"
            errorRequest={errorRequest}
            toastInfo={{
              title: 'Perfil atualizado com sucesso!',
            }}
          />
          {checkUserPermissions('organization.update', profile.role) &&
            organizations?.map((organization) => {
              templateFormOrganization.title = `Organização ${organization.name}`
              return (
                <FormDashboard<Organization>
                  key={organization.id}
                  actionWithId={updateOrganization}
                  templateForm={templateFormOrganization}
                  defaultValues={organization}
                  pathSuccess="/dashboard/profile"
                  errorRequest={errorRequest}
                  toastInfo={{
                    title: 'Organização atualizada com sucesso!',
                  }}
                  id={organization.id}
                />
              )
            })}
        </div>
      </div>
    </ContainerDashboard>
  )
}
