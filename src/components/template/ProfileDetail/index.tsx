import {
  deleteBlockedHour,
  deleteWorkHour,
  getProfile,
  registerBlockedHour,
  registerWorkHour,
} from '@/actions/profile'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import { ErrorRequestHandler } from '@/components/organisms/ErrorRequestHandler'
import ProfileHeaderCard from './components/ProfileHeaderCard'
import ProfileFormCard from './components/ProfileFormCard'
import ThemeCard from './components/ThemeCard'
import SecurityActionsCard from './components/SecurityActionsCard'
import CalendarCard from './components/CalendarCard'
import SummaryCard from './components/SummaryCard'

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
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-100 via-white to-slate-100 text-foreground">
        <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col gap-6 px-4 pb-12 pt-10 sm:px-6 lg:px-10">
          <div className="w-full">
            <Breadcrumb />
          </div>

          <ProfileHeaderCard profile={profile} />

          <div className="grid min-h-0 flex-1 gap-6 lg:grid-cols-[minmax(0,1.65fr)_minmax(340px,1fr)] xl:grid-cols-[minmax(0,1.8fr)_minmax(360px,1fr)]">
            <div className="grid min-w-0 gap-6">
              <ProfileFormCard profile={profile} />
              <CalendarCard
                profileId={profile.id}
                blocked={blockedHours}
                workHours={workHours}
                openingHours={openingHours}
                onCreate={async (_prev, formData) => {
                  'use server'
                  return registerBlockedHour(profile.id, {}, formData)
                }}
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
            <aside className="grid min-w-0 gap-6 h-fit lg:sticky lg:top-[calc(var(--navbar-height)+3rem)]">
              <ThemeCard />
              <SecurityActionsCard />
              <SummaryCard profile={profile} />
            </aside>
          </div>
        </div>
      </div>
    </ContainerDashboard>
  )
}
