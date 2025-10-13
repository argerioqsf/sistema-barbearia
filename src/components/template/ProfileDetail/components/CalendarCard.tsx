import { PageCard, PageCardContent } from '@/components/ui/page-card'
import { SectionHeader } from '@/components/ui/section-header'
import BlockedHoursForm from '../BlockedHoursForm'
import { InitialState } from '@/types/general'
import { UnitOpeningHours } from '@/features/units/schemas'

type Props = {
  profileId: string
  blocked?: Array<{ id?: string; startHour: string; endHour: string }>
  workHours?: Array<{
    id?: string
    weekDay: number
    startHour: string
    endHour: string
  }>
  openingHours?: UnitOpeningHours[]
  onCreate: (
    prev: InitialState<Record<string, unknown>>,
    fd: FormData,
  ) => Promise<InitialState<Record<string, unknown>>>
  onCreateWorkHour: (
    prev: InitialState<Record<string, unknown>>,
    fd: FormData,
  ) => Promise<InitialState<Record<string, unknown>>>
  onDeleteWorkHour: (
    prev: InitialState<Record<string, unknown>>,
    fd: FormData,
  ) => Promise<InitialState<Record<string, unknown>>>
  onDelete: (
    prev: InitialState<Record<string, unknown>>,
    fd: FormData,
  ) => Promise<InitialState<Record<string, unknown>>>
  onUpdate: (
    id: string,
    prev: InitialState<Record<string, unknown>>,
    fd: FormData,
  ) => Promise<InitialState<Record<string, unknown>>>
}

export default function CalendarCard({
  blocked = [],
  workHours = [],
  openingHours = [],
  onCreate,
  onCreateWorkHour,
  onDeleteWorkHour,
  onDelete,
  onUpdate,
}: Props) {
  return (
    <PageCard>
      <PageCardContent>
        <SectionHeader
          label="Agenda"
          title="Calendário e disponibilidade"
          description="Gerencie horários de trabalho e bloqueios para controlar sua agenda."
        />

        <div className="mt-6 min-w-0 overflow-x-auto">
          <div className="min-w-[720px] lg:min-w-0">
            <BlockedHoursForm
              onSubmit={onCreate}
              blocked={blocked}
              workHours={workHours}
              openingHours={openingHours}
              onCreateWorkHour={onCreateWorkHour}
              onDeleteWorkHour={onDeleteWorkHour}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          </div>
        </div>
      </PageCardContent>
    </PageCard>
  )
}
