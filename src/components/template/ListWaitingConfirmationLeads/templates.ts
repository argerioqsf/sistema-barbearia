import { InfoList, Lead } from '@/types/general'

export const infoList: InfoList<Lead> = {
  itemsHeader: ['N', 'NOME / WHATSAPP', 'INDICADOR'],
  itemsList: ['name', 'phone', '', 'name', ''],
  listActions: [
    {
      id: 2,
      icon: 'Eye',
      href: 'dashboard/leads/detail/',
      name: 'Vizualizar',
    },
  ],
}
