import { InfoList } from '@/types/general'
import type { ZProduct as Product } from '@/features/products/schemas'
import { deleteProduct } from '@/actions/product'

export const infoList: InfoList<Product> = {
  itemsHeader: ['N', 'NOME', 'PREÇO', 'ATIVO'],
  itemsList: ['name', '', 'price', 'active', ''],
  listActions: [
    {
      id: 1,
      icon: 'Eye',
      href: 'dashboard/products/detail/',
      name: 'Visualizar',
    },
    {
      id: 2,
      icon: 'Trash2',
      name: 'Remover',
      onclick: deleteProduct,
      alert: { title: 'Deseja remover este produto?' },
      toast: { title: 'Produto removido com sucesso!' },
    },
  ],
}
