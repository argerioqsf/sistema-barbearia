import { InfoList } from '@/types/general'
import type { ZCoupon as Coupon } from '@/features/coupons/schemas'
import { deleteCoupon } from '@/actions/coupon'

export const infoList: InfoList<Coupon> = {
  itemsHeader: ['N', 'CÓDIGO', 'VALOR', 'TIPO', 'AÇÕES'],
  itemsList: ['code', '', 'discount', 'discountType', ''],
  listActions: [
    {
      id: 1,
      icon: 'Eye',
      href: 'dashboard/coupons/detail/',
      name: 'Visualizar',
    },
    {
      id: 2,
      icon: 'Trash2',
      name: 'Remover',
      onclick: deleteCoupon,
      alert: { title: 'Deseja remover este cupom?' },
      toast: { title: 'Cupom removido com sucesso!' },
    },
  ],
}
