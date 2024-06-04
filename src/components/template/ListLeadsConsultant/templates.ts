import { InfoList, Lead } from '@/types/general'

export const infoList: InfoList<Lead> = {
  itemsHeader: ['N', 'NOME / WHATSAPP', 'matriculado', 'Docs. entregues'],
  itemsList: ['name', 'phone', 'matriculation', 'documents', ''],
  listActions: [
    {
      id: 2,
      icon: 'Eye',
      href: 'dashboard/leads/detail/',
      name: 'Vizualizar',
    },
  ],
}
