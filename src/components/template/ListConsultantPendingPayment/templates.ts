import { InfoList, Profile, User } from '@/types/general'

export const infoList: InfoList<User | Profile> = {
  itemsHeader: ['N', 'NOME', 'Valor a receber', 'PIX', ''],
  itemsList: ['name', '', 'profile.amountToReceive', 'profile.pix', ''],
  listActions: [
    {
      id: 2,
      icon: 'Eye',
      href: 'dashboard/indicators/detail/',
      name: 'Vizualizar',
    },
  ],
}
