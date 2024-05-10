import { InfoList, User } from '@/types/general'

export const infoList: InfoList<User> = {
  itemsHeader: ['', 'NOME', 'E-MAIL', 'PERMISSÃO'],
  itemsList: ['name', '', 'email', '', 'profile.role'],
  listActions: [
    {
      id: 2,
      icon: 'Eye',
      href: 'dashboard/users/detail/',
      name: 'Vizualizar',
    },
    {
      id: 3,
      icon: 'Lock',
      href: 'home',
      name: 'Desativar',
    },
  ],
}
