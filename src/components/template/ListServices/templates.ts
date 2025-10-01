import { InfoList, type InitialState } from '@/types/general'
import type { ZService as Service } from '@/features/services/schemas'
import { deleteService } from '@/actions/service'

export const infoList: InfoList<Service> = {
  itemsHeader: ['N', 'NOME', 'PREÇO', 'COMISSÃO', 'AÇÕES'],
  itemsList: ['name', '', 'price', 'commissionPercentage', ''],
  listActions: [
    {
      id: 1,
      icon: 'Eye',
      href: 'dashboard/services/detail/',
      name: 'Visualizar',
    },
    {
      id: 2,
      icon: 'Trash2',
      name: 'Remover',
      onclick: (id?: string) =>
        id ? deleteService(id) : Promise.resolve({} as InitialState<Service>),
      alert: { title: 'Deseja remover este serviço?' },
      toast: { title: 'Serviço removido com sucesso!' },
    },
  ],
}
