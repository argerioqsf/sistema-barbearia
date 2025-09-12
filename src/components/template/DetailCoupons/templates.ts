import type { TemplateForm } from '@/types/general'
import type { ZCoupon as Coupon } from '@/features/coupons/schemas'

export const templateForm: TemplateForm<Coupon> = {
  title: 'Cupom',
  textButton: 'Salvar',
  sections: [
    {
      id: 1,
      title: 'Informações do cupom',
      boxes: [
        {
          id: 1,
          fields: [
            { id: 'code', required: true, type: 'text', label: 'Código' },
            {
              id: 'discountType',
              required: true,
              type: 'select',
              label: 'Tipo de desconto',
              option: {
                keyLabel: 'label',
                keyValue: 'value',
                list: [
                  { value: 'percent', label: 'Percentual' },
                  { value: 'value', label: 'Valor' },
                ],
              },
            },
            {
              id: 'discountValue',
              required: true,
              type: 'number',
              label: 'Valor do desconto',
            },
            {
              id: 'active',
              required: true,
              type: 'select',
              label: 'Ativo',
              option: {
                keyLabel: 'label',
                keyValue: 'value',
                list: [
                  { value: 'true', label: 'Sim' },
                  { value: 'false', label: 'Não' },
                ],
              },
            },
          ],
        },
      ],
    },
  ],
}
