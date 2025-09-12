import {
  deleteBlockedHour,
  deleteWorkHour,
  getProfile,
  registerBlockedHour,
  registerWorkHour,
  updateProfileUser,
} from '@/actions/profile'
import { Text } from '@/components/atoms'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import FormDashboard from '@/components/organisms/FormDashboard'
import { Profile, User } from '@/types/general'
import { notFound } from 'next/navigation'
import { templateForm } from './templateForm'
import ColorPalette from '@/components/molecules/ColorPalette'
import LogoutButton from '@/components/molecules/LogoutButton'
// import WorkHoursForm from './WorkHoursForm'
import BlockedHoursForm from './BlockedHoursForm'

export default async function ProfileDetail() {
  const response = await getProfile()
  const profile = response?.response
  const errorRequest = response.error?.request
  // Show a friendly error UI when the API is unavailable or request fails
  if (errorRequest) {
    return (
      <ContainerDashboard>
        <div className="p-[5vw] lg:p-[2.5vw] w-full h-full flex flex-col justify-start items-center gap-4">
          <div className="w-full ">
            <Breadcrumb />
          </div>
          <div className="w-full mt-6">
            <Text className="uppercase font-bold text-xl lg:text-2xl text-black">
              Erro ao carregar seu perfil
            </Text>
            <Text className="text-red-600 mt-2">
              {String(
                errorRequest ||
                  'Serviço temporariamente indisponível. Tente novamente mais tarde.',
              )}
            </Text>
          </div>
        </div>
      </ContainerDashboard>
    )
  }
  if (!profile) {
    notFound()
  }

  // const organizations = profile.user?.organizations.map(
  //   (organization) => organization.organization,
  // )

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
          <div className="mt-4">
            <LogoutButton />
          </div>
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
          {/* Calendar Management */}
          <div className="w-full mt-10">
            <Text className="uppercase font-bold text-xl lg:text-2xl text-black whitespace-nowrap overflow-hidden text-ellipsis">
              Calendário
            </Text>
            <div className="mt-6">
              <BlockedHoursForm
                onSubmit={async (_prev, formData) => {
                  'use server'
                  return registerBlockedHour(profile.id, {}, formData)
                }}
                blocked={profile.blockedHours || []}
                workHours={profile.workHours || []}
                openingHours={profile.openingHours || []}
                onCreateWorkHour={async (_prev, formData) => {
                  'use server'
                  return registerWorkHour(profile.id, {}, formData)
                }}
                onDeleteWorkHour={async (_prev, formData) => {
                  'use server'
                  const id = String(formData.get('id'))
                  if (!id)
                    return {
                      ok: false,
                      errors: { request: 'ID inválido' },
                    }
                  return deleteWorkHour(profile.id, id)
                }}
                onDelete={async (_prev, fd) => {
                  'use server'
                  const id = String(fd.get('id'))
                  return deleteBlockedHour(profile.id, id)
                }}
                onUpdate={async (id, _prev, fd) => {
                  'use server'
                  const { updateBlockedHour } = await import(
                    '@/actions/profile'
                  )
                  return updateBlockedHour(profile.id, id, {}, fd)
                }}
              />
            </div>
          </div>
          {/* {checkUserPermissions('organization.update', profile.role) && (
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
          )} */}
        </div>
      </div>
    </ContainerDashboard>
  )
}
