import { InfoList, Lead } from '@/types/general'

export const infoList: InfoList<Lead> = {
  itemsHeader: ['N', 'NOME / WHATSAPP', 'Doc. confirmados'],
  itemsList: ['name', 'phone', '', '', 'documents'],
  listActions: [
    {
      id: 1,
      icon: 'Eye',
      href: 'dashboard/leads/detail/',
      name: 'Visualizar',
    },
  ],
}
