import { updateOrganization } from '@/actions/organization'
import { getProfile, updateProfileUser } from '@/actions/profile'
import { Text } from '@/components/atoms'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import CycleComponent from '@/components/organisms/CycleComponent'
import FormDashboard from '@/components/organisms/FormDashboard'
import { Button } from '@/components/ui/button'
import { Cyclo, Organization, Profile, User } from '@/types/general'
import { checkUserPermissions } from '@/utils/checkUserPermissions'
import { notFound } from 'next/navigation'
import { templateForm, templateFormOrganization } from './templateForm'
import { twMerge } from 'tailwind-merge'

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

  const statement: Cyclo[] = [
    {
      id: '1',
      status: 'Indicadores: R$300,00 | Cosultores: R$300,00',
      start_cycle: '05/02/2024 17:40',
      end_cycle: undefined,
      description: '50 leads confirmados',
      leads: [],
    },
    {
      id: '2',
      status: 'Indicadores: R$700,00 | Cosultores: R$200,00',
      start_cycle: '05/02/2024 17:40',
      end_cycle: '05/02/2024 17:40',
      description: '50 leads confirmados',
      leads: [],
    },
    {
      id: '3',
      status: 'Indicadores: R$400,00 | Cosultores: R$500,00',
      start_cycle: '05/02/2024 17:40',
      end_cycle: '05/02/2024 17:40',
      description: '50 leads confirmados',
      leads: [],
    },
  ]

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
          {checkUserPermissions('organization.update', profile.role) && (
            <>
              {organizations?.map((organization) => {
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

              <div className="w-full">
                <div className="w-[90vw] md:w-full flex flex-row justify-between items-center">
                  <Text className="uppercase font-bold text-2xl lg:text-4xl text-black whitespace-nowrap overflow-hidden text-ellipsis">
                    Ciclos de pagamentos
                  </Text>
                  <Button
                    className={twMerge(
                      false ? 'bg-secondary-50' : 'bg-red-700',
                      'rounded-xl h-10 flex justify-center items-center px-2 sm:px-5 md:px-10 text-white',
                    )}
                    type="submit"
                  >
                    {false ? 'Iniciar ciclo' : 'Finalizar ciclo'}
                  </Button>
                </div>

                <div className="w-[90vw] md:w-full mt-10 lg:mt-8">
                  <div className="w-[90vw] grid-cols-12 md:w-full border-2 flex flex-col gap-4 bg-gray-200 p-6 rounded-xl lg:shadow-md shadow-slate-400">
                    {statement && <CycleComponent cyclos={statement} />}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </ContainerDashboard>
  )
}
