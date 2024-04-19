import { InfoList, User } from '@/types/general'

export const infoList: InfoList<User> = {
  itemsHeader: ['N', 'NOME', '', '', ''],
  itemsList: ['name', '', '', '', ''],
  listActions: [
    {
      id: 1,
      icon: 'Edit',
      href: 'indicators/edit',
      name: 'Editar',
    },
    {
      id: 2,
      icon: 'Eye',
      href: 'dashboard/indicators/detail/',
      name: 'Vizualizar',
    },
    {
      id: 3,
      icon: 'Lock',
      href: 'home',
      name: 'Desativar',
    },
    {
      id: 4,
      icon: 'Link',
      href: 'home',
      name: 'Link',
    },
  ],
}
