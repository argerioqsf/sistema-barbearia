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
              id: 'description',
              required: true,
              type: 'text',
              label: 'Descrição',
            },
            {
              id: 'discountType',
              required: true,
              type: 'select',
              label: 'Tipo de desconto',
              option: {
                keyLabel: 'label',
                keyValue: 'value',
                list: [
                  { value: 'PERCENTAGE', label: 'Percentual' },
                  { value: 'VALUE', label: 'Valor' },
                ],
              },
            },
            {
              id: 'discount',
              required: true,
              type: 'number',
              label: 'Valor do desconto',
            },
            {
              id: 'quantity',
              required: true,
              type: 'number',
              label: 'Quantidade disponível',
            },
          ],
        },
      ],
    },
  ],
}
