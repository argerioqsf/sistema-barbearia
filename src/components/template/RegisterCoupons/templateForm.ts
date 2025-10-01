import { TemplateForm } from '@/types/general'
import type { ZCoupon } from '@/features/coupons/schemas'

export const templateForm: TemplateForm<ZCoupon> = {
  title: 'Cadastrar Cupons',
  textButton: 'Cadastrar',
  sections: [
    {
      id: 1,
      title: 'Informações do Cupon',
      cols: 3,
      boxes: [
        {
          id: 1,
          cols: 3,
          fields: [
            {
              id: 'code',
              required: true,
              type: 'text',
              label: 'Código',
              cols: 3,
            },
            {
              id: 'discountType',
              required: true,
              type: 'select',
              label: 'Tipo de desconto',
              cols: 3,
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
              displayLogic: {
                fieldId: 'discountType',
                expectedValue: 'PERCENTAGE',
              },
              label: 'Valor percentual do desconto',
              cols: 3,
            },
            {
              id: 'discount',
              required: true,
              type: 'number',
              displayLogic: {
                fieldId: 'discountType',
                expectedValue: 'VALUE',
              },
              label: 'Valor do desconto',
              cols: 3,
            },
            {
              id: 'description',
              required: true,
              type: 'text',
              label: 'Descrição',
              cols: 3,
            },
            {
              id: 'quantity',
              required: true,
              type: 'number',
              label: 'Quantidade disponível',
              cols: 3,
            },
          ],
        },
      ],
    },
  ],
}
