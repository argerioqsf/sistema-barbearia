import { InfoList } from '@/types/general'
import type { ZAppointment as Appointment } from '@/features/appointments/schemas'

export const infoList: InfoList<Appointment> = {
  itemsHeader: ['N', 'DATA', 'STATUS', 'OBS', ''],
  itemsList: ['id', 'date', 'status', 'observation', ''],
}
