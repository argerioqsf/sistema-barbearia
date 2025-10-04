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
import type { User } from '@/types/general'
import { templateForm } from './templateForm'
import ColorPalette from '@/components/molecules/ColorPalette'
import LogoutButton from '@/components/molecules/LogoutButton'
import BlockedHoursForm from './BlockedHoursForm'
import { Profile } from '@/features/profile/schemas'
import { ErrorRequestHandler } from '@/components/organisms/ErrorRequestHandler'

export default async function ProfileDetail() {
  const response = await getProfile()

  if (!response.ok) {
    return <ErrorRequestHandler result={{ ok: false, error: response.error }} />
  }

  const profile = response.data.profile
  const workHours = profile.workHours ?? []

  const blockedHours = profile.blockedHours ?? []
  const openingHours = response.data.openingHours

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
            toastInfo={{
              title: 'Perfil atualizado com sucesso!',
            }}
            roleUser={profile.role?.name}
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
                blocked={blockedHours}
                workHours={workHours}
                openingHours={openingHours}
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
        </div>
      </div>
    </ContainerDashboard>
  )
}
