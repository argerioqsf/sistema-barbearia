import { InfoList, Segment } from '@/types/general'

export const infoList: InfoList<Segment> = {
  itemsHeader: ['N', 'Nome', ''],
  itemsList: ['name', '', '', '', ''],
  listActions: [
    {
      id: 1,
      icon: 'Edit',
      href: 'dashboard/segments/edit',
      name: 'Editar',
    },
    {
      id: 2,
      icon: 'Eye',
      href: 'dashboard/segments/detail/',
      name: 'Vizualizar',
    },
  ],
}
