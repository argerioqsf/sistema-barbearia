import { InfoList, Profile, User } from '@/types/general'

export const infoList: InfoList<User | Profile> = {
  itemsHeader: ['N', 'NOME', 'E-MAIL', ''],
  itemsList: ['name', '', '', 'email', ''],
  listActions: [
    {
      id: 2,
      icon: 'Eye',
      href: 'dashboard/indicators/detail/',
      name: 'Vizualizar',
    },
  ],
}
