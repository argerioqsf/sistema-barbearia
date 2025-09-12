import { InfoList, type InitialState } from '@/types/general'
import type { ZCategory as Category } from '@/features/categories/schemas'
import { deleteCategory } from '@/actions/category'

export const infoList: InfoList<Category> = {
  itemsHeader: ['N', 'NOME', 'ATIVO', 'AÇÕES'],
  itemsList: ['name', '', 'active', '', ''],
  listActions: [
    {
      id: 1,
      icon: 'Eye',
      href: 'dashboard/categories/detail/',
      name: 'Visualizar',
    },
    {
      id: 2,
      icon: 'Trash2',
      name: 'Remover',
      onclick: (id?: string) =>
        id ? deleteCategory(id) : Promise.resolve({} as InitialState<Category>),
      alert: { title: 'Deseja remover esta categoria?' },
      toast: { title: 'Categoria removida com sucesso!' },
    },
  ],
}
