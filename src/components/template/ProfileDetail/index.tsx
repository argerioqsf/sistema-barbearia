import { updateOrganization } from '@/actions/organization'
import { getProfile, updateProfileUser } from '@/actions/profile'
import { Text } from '@/components/atoms'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import { ButtonCycle } from '@/components/molecules/ButtonCycle'
import CycleComponent from '@/components/organisms/CycleComponent'
import FormDashboard from '@/components/organisms/FormDashboard'
import { Organization, Profile, User } from '@/types/general'
import { checkUserPermissions } from '@/utils/checkUserPermissions'
import { notFound } from 'next/navigation'
import { Fragment } from 'react'
import { templateForm, templateFormOrganization } from './templateForm'
import ColorPalette from '@/components/molecules/ColorPalette'

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
        <div className="w-full mt-4">
          <Text className="text-black font-normal text-sm text-left uppercase mb-2 whitespace-nowrap overflow-hidden text-ellipsis">
            Escolha o seu tema:
          </Text>
          <ColorPalette />
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
            roleUser={profile.role}
          />
          {checkUserPermissions('organization.update', profile.role) && (
            <>
              {organizations?.map((organization, idx) => {
                templateFormOrganization.title = `Organização ${organization.name}`
                const activeCycle = organization.cycles.find(
                  (cycle) => cycle.end_cycle === null,
                )
                return (
                  <Fragment key={idx}>
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
                    <div className="w-full">
                      <div className="w-[90vw] md:w-full flex flex-row justify-between items-center">
                        <Text className="uppercase font-bold text-2xl lg:text-4xl text-black whitespace-nowrap overflow-hidden text-ellipsis">
                          Ciclos de pagamentos
                        </Text>
                        <ButtonCycle
                          idOrganization={organization.id}
                          activeCycle={activeCycle}
                        />
                      </div>

                      <div className="w-[90vw] md:w-full mt-10 lg:mt-8">
                        <div className="w-[90vw] grid-cols-12 min-h-40 md:w-full border-2 flex flex-col gap-4 bg-gray-200 p-6 rounded-xl lg:shadow-md shadow-slate-400">
                          {organization.cycles.length > 0 && (
                            <CycleComponent cycles={organization.cycles} />
                          )}
                        </div>
                      </div>
                    </div>
                  </Fragment>
                )
              })}
            </>
          )}
        </div>
      </div>
    </ContainerDashboard>
  )
}
