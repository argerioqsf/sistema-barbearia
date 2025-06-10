import { InfoList, User } from '@/types/general'

export const infoList: InfoList<User> = {
  itemsHeader: ['N', 'NOME', 'E-MAIL', 'ATIVO', ''],
  itemsList: ['name', '', 'email', 'active', ''],
  listActions: [
    {
      id: 2,
      icon: 'Eye',
      href: 'dashboard/indicators/detail/',
      name: 'Vizualizar',
    },
  ],
}
