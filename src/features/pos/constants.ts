import { ZSale } from '@/features/sales/schemas'
import { InfoList } from '@/types/general'

export const infoListSales: InfoList<ZSale> = {
  itemsHeader: ['N', 'Abertura', 'Cliente', 'Status'],
  itemsList: ['createdAt', '', 'client.name', 'paymentStatus', ''],
  listActions: [
    {
      id: 2,
      icon: 'Eye',
      href: '/dashboard/sales/point-of-sale/',
      name: 'Continuar',
    },
  ],
}
