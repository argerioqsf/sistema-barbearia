import { InfoList, User } from '@/types/general'

export const infoList: InfoList<User> = {
  itemsHeader: ['N', 'NOME', '', '', ''],
  itemsList: ['name', '', '', '', ''],
  listActions: [
    {
      id: 2,
      icon: 'Eye',
      href: 'dashboard/indicators/detail/',
      name: 'Vizualizar',
    },
  ],
}
