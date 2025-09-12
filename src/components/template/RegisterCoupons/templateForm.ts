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
                  {
                    value: 'percent',
                    label: 'Percentual',
                  },
                  {
                    value: 'value',
                    label: 'Valor',
                  },
                ],
              },
            },
            {
              id: 'discountValue',
              required: true,
              type: 'number',
              displayLogic: {
                fieldId: 'discountType',
                expectedValue: 'percent',
              },
              label: 'Valor percentual do desconto',
              cols: 3,
            },
            {
              id: 'discountValue',
              required: true,
              type: 'number',
              displayLogic: {
                fieldId: 'discountType',
                expectedValue: 'value',
              },
              label: 'Valor do desconto',
              cols: 3,
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
