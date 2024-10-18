import { InfoList, Unit } from '@/types/general'

export const infoList: InfoList<Unit> = {
  itemsHeader: ['N', 'NOME', 'QUANT. SEGMENTOS', ' QUANT. CURSOS', ''],
  itemsList: ['name', '', '_count.segments', '_count.courses', ''],
  listActions: [
    {
      id: 2,
      icon: 'Eye',
      href: 'dashboard/units/detail/',
      name: 'Vizualizar',
    },
  ],
}
