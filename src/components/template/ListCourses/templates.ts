import { Course, InfoList } from '@/types/general'

export const infoList: InfoList<Course> = {
  itemsHeader: ['N', 'NOME', 'ATIVO', '', ''],
  itemsList: ['name', '', 'active', '', ''],
  listActions: [
    {
      id: 2,
      icon: 'Eye',
      href: 'dashboard/courses/detail/',
      name: 'Vizualizar',
    },
  ],
}
