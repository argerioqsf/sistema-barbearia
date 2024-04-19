import { InfoList, Lead } from '@/types/general'

export const infoList: InfoList<Lead> = {
  itemsHeader: ['N', 'NOME / WHATSAPP', 'CURSO', 'INDICADOR'],
  itemsList: ['name', 'phone', '', 'name', ''],
  listActions: [
    {
      id: 1,
      icon: 'Eye',
      href: 'dashboard/leads/',
      name: 'Visualizar',
    },
  ],
}
