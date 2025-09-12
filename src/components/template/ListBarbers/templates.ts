import { InfoList, type InitialState } from '@/types/general'
import type { ZBarber as Barber } from '@/features/barbers/schemas'
import { removeBarber } from '@/actions/barber'

export const infoList: InfoList<Barber> = {
  itemsHeader: ['N', 'NOME', 'E-MAIL', 'ATIVO', 'AÇÕES'],
  itemsList: ['name', '', 'email', 'active', ''],
  listActions: [
    {
      id: 1,
      icon: 'Eye',
      href: 'dashboard/barbers/detail/',
      name: 'Visualizar',
    },
    {
      id: 2,
      icon: 'Trash2',
      name: 'Remover',
      onclick: (id?: string) =>
        id
          ? removeBarber(id)
          : Promise.resolve<InitialState<Barber>>({
              errors: { request: 'Id undefined' },
            }),
      alert: { title: 'Deseja remover este barbeiro?' },
      toast: { title: 'Barbeiro removido com sucesso!' },
    },
  ],
}
